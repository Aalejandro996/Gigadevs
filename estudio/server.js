'use strict';
// Estudio privado de Gigadevs: sin dependencias externas.
// - Login con correo de administrador + contraseña (hash scrypt).
// - La clave de Gemini solo vive en el servidor (variable de entorno).
// - Consulta de enlaces con protección contra SSRF (IPs privadas bloqueadas).

const http = require('node:http');
const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const dns = require('node:dns');
const net = require('node:net');

const SESSION_COOKIE = 'gs_session';
const SESSION_MS = 8 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX = 5;
const MAX_BODY_BYTES = 1024 * 1024;
const GEMINI_TIMEOUT_MS = 30000;
const PAGE_TIMEOUT_MS = 6000;
const PAGE_MAX_BYTES = 1024 * 1024;
const MAX_REDIRECTS = 3;
const ALLOWED_IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'"
].join('; ');

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
class BlockedError extends Error {}

// ---------- utilidades de seguridad ----------

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

function hashPassword(password, salt = crypto.randomBytes(16)) {
  const N = 16384, r = 8, p = 1;
  const key = crypto.scryptSync(String(password), salt, 64, { N, r, p, maxmem: 64 * 1024 * 1024 });
  return `scrypt$${N}$${r}$${p}$${salt.toString('base64')}$${key.toString('base64')}`;
}

function verifyPassword(password, stored) {
  const parts = String(stored || '').split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const [, n, r, p, saltB64, keyB64] = parts;
  const expected = Buffer.from(keyB64, 'base64');
  if (expected.length !== 64) return false;
  const key = crypto.scryptSync(String(password), Buffer.from(saltB64, 'base64'), expected.length,
    { N: Number(n), r: Number(r), p: Number(p), maxmem: 64 * 1024 * 1024 });
  return crypto.timingSafeEqual(key, expected);
}

function sign(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

function makeSessionToken(email, secret, now) {
  const payload = Buffer.from(JSON.stringify({ e: email, x: now + SESSION_MS })).toString('base64url');
  return `${payload}.${sign(payload, secret)}`;
}

function readSession(token, secret, now) {
  if (typeof token !== 'string') return null;
  const dot = token.lastIndexOf('.');
  if (dot < 1) return null;
  const payload = token.slice(0, dot);
  if (!safeEqual(token.slice(dot + 1), sign(payload, secret))) return null;
  let data;
  try { data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')); } catch { return null; }
  if (!data || typeof data.e !== 'string' || typeof data.x !== 'number' || data.x < now) return null;
  return data.e;
}

function parseCookies(header) {
  const out = {};
  for (const part of String(header || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return out;
}

function isPrivateIp(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && (b === 168 || b === 0)) ||
      (a === 198 && (b === 18 || b === 19));
  }
  if (net.isIPv6(ip)) {
    const l = ip.toLowerCase();
    const mapped = l.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPrivateIp(mapped[1]);
    return l === '::1' || l === '::' || /^f[cd]/.test(l) || /^fe[89ab]/.test(l) || l.startsWith('ff');
  }
  return true; // lo que no es IP se trata como no seguro hasta resolverlo
}

function validatePageUrl(raw) {
  let u;
  try { u = new URL(String(raw)); } catch { return null; }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
  if (u.username || u.password) return null;
  if (u.port && u.port !== '80' && u.port !== '443') return null;
  const host = u.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (!host || host === 'localhost' || /\.(localhost|local|internal)$/.test(host)) return null;
  if (net.isIP(host) && isPrivateIp(host)) return null;
  return u;
}

function resolvePublicAddress(hostname) {
  return new Promise((resolve, reject) => {
    if (net.isIP(hostname)) {
      return isPrivateIp(hostname) ? reject(new BlockedError('ip')) : resolve({ address: hostname, family: net.isIPv6(hostname) ? 6 : 4 });
    }
    dns.lookup(hostname, { all: true }, (err, addrs) => {
      if (err || !addrs || addrs.length === 0) return reject(new BlockedError('dns'));
      if (addrs.some(a => isPrivateIp(a.address))) return reject(new BlockedError('private'));
      resolve(addrs[0]);
    });
  });
}

function requestPinned(u, addr) {
  const lib = u.protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    const req = lib.request({
      hostname: u.hostname.replace(/^\[|\]$/g, ''),
      port: u.port || (u.protocol === 'https:' ? 443 : 80),
      path: u.pathname + u.search,
      method: 'GET',
      timeout: PAGE_TIMEOUT_MS,
      servername: net.isIP(u.hostname) ? undefined : u.hostname,
      headers: { 'user-agent': 'GigadevsStudio/1.0', accept: 'text/html,application/xhtml+xml' },
      // Se conecta solo a la IP ya validada (evita re-resolver DNS y DNS rebinding)
      lookup: (host, opts, cb) => cb(null, addr.address, addr.family)
    }, res => {
      const chunks = [];
      let size = 0;
      res.on('data', c => {
        size += c.length;
        if (size > PAGE_MAX_BYTES) { req.destroy(); reject(new BlockedError('size')); return; }
        chunks.push(c);
      });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }));
      res.on('error', reject);
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.end();
  });
}

async function fetchPublicPage(startUrl) {
  let current = startUrl;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const u = validatePageUrl(current);
    if (!u) throw new BlockedError('url');
    const addr = await resolvePublicAddress(u.hostname);
    const res = await requestPinned(u, addr);
    if (res.status >= 300 && res.status < 400 && res.headers.location) {
      current = new URL(res.headers.location, u).toString();
      continue;
    }
    return { url: u.toString(), status: res.status, contentType: String(res.headers['content-type'] || ''), body: res.body };
  }
  throw new BlockedError('redirects');
}

// ---------- extraccion de datos de una pagina ----------

function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function parseMeta(html) {
  const map = {};
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const key = (tag.match(/\b(?:name|property)\s*=\s*["']([^"']+)["']/i) || [])[1];
    const val = (tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i) || [])[1];
    if (key && val !== undefined) map[key.toLowerCase()] = decodeEntities(val).trim();
  }
  const titleTag = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const headings = [...html.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi)]
    .slice(0, 4).map(m => stripTags(m[1])).filter(Boolean);
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const theme = map['theme-color'] || '';
  return {
    title: (map['og:title'] || stripTags(titleTag)).slice(0, 200),
    description: (map['og:description'] || map.description || '').slice(0, 400),
    themeColor: /^#[0-9a-f]{6}$/i.test(theme) ? theme : '',
    headings: headings.join(' | ').slice(0, 300),
    rawSnippet: stripTags(body).slice(0, 600)
  };
}

// ---------- validacion de la peticion a Gemini ----------

function validateGeminiBody(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'cuerpo inválido';
  for (const key of Object.keys(body)) {
    if (key !== 'contents' && key !== 'generationConfig') return 'campo no permitido';
  }
  if (!Array.isArray(body.contents) || body.contents.length < 1 || body.contents.length > 2) return 'contents inválido';
  let total = 0;
  for (const c of body.contents) {
    if (!c || !Array.isArray(c.parts) || c.parts.length < 1 || c.parts.length > 3) return 'parts inválido';
    for (const p of c.parts) {
      if (p && typeof p.text === 'string') {
        if (p.text.length > 8000) return 'texto demasiado largo';
        total += p.text.length;
      } else if (p && p.inlineData) {
        const d = p.inlineData;
        if (!ALLOWED_IMAGE_TYPES.has(d.mimeType) || typeof d.data !== 'string' ||
            d.data.length > 3000000 || !/^[A-Za-z0-9+/=]+$/.test(d.data)) return 'imagen inválida';
      } else {
        return 'parte no permitida';
      }
    }
  }
  if (total > 12000) return 'prompt demasiado largo';
  const gc = body.generationConfig;
  if (gc !== undefined) {
    if (!gc || typeof gc !== 'object' || Array.isArray(gc)) return 'generationConfig inválido';
    for (const k of Object.keys(gc)) {
      if (k !== 'responseMimeType' && k !== 'responseSchema') return 'generationConfig no permitido';
    }
    if (gc.responseMimeType !== undefined && gc.responseMimeType !== 'application/json') return 'mime no permitido';
    if (gc.responseSchema !== undefined && JSON.stringify(gc.responseSchema).length > 8000) return 'schema demasiado grande';
  }
  return null;
}

// ---------- HTTP ----------

function setSecurityHeaders(res) {
  res.setHeader('Content-Security-Policy', CSP);
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
}

function sendJSON(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(obj));
}

function sendHTML(res, status, html, extra = {}) {
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...extra });
  res.end(html);
}

function sendText(res, status, text) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(text);
}

function readBody(req, maxBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', c => {
      size += c.length;
      if (size > maxBytes) { chunks.length = 0; req.resume(); return reject(new HttpError(413, 'solicitud demasiado grande')); }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function clientIp(req) {
  const fwd = String(req.headers['x-forwarded-for'] || '').split(',').map(s => s.trim()).filter(Boolean);
  return fwd.length ? fwd[fwd.length - 1] : req.socket.remoteAddress;
}

function cookieString(value, maxAgeMs, secure) {
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${Math.floor(maxAgeMs / 1000)}${secure ? '; Secure' : ''}`;
}

function loginPage(message = '') {
  const msg = message ? `<p class="err">${message.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]))}</p>` : '';
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>Acceso · Gigadevs Corp, C.A.</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#060b14;color:#f8fafc;font-family:system-ui,sans-serif}
form{width:min(360px,90vw);background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:28px}
h1{font-size:18px;margin:0 0 18px}label{display:block;font-size:13px;color:#94a3b8;margin:12px 0 6px}
input{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid #334155;background:#020617;color:#fff}
button{margin-top:18px;width:100%;padding:11px;border:0;border-radius:10px;background:#22d3ee;color:#020617;font-weight:700;cursor:pointer}
.err{color:#fca5a5;font-size:13px}</style></head><body>
<form method="post" action="/login" autocomplete="on"><h1>Estudio Gigadevs · Acceso</h1>${msg}
<label for="email">Correo</label><input id="email" name="email" type="email" required autocomplete="username">
<label for="password">Contraseña</label><input id="password" name="password" type="password" required autocomplete="current-password">
<button type="submit">Entrar</button></form></body></html>`;
}

async function callGemini(cfg, body) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cfg.geminiModel)}:generateContent`;
  const doFetch = cfg.fetchImpl || fetch;
  return doFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': cfg.geminiKey },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(GEMINI_TIMEOUT_MS)
  });
}

function createApp(cfg) {
  const indexHtml = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));
  const attempts = new Map();

  async function handleLogin(req, res, now) {
    const ip = clientIp(req);
    const rec = attempts.get(ip) || { count: 0, reset: now + LOGIN_WINDOW_MS };
    if (now > rec.reset) { rec.count = 0; rec.reset = now + LOGIN_WINDOW_MS; }
    if (rec.count >= LOGIN_MAX) {
      attempts.set(ip, rec);
      return sendHTML(res, 429, loginPage('Demasiados intentos. Espera 15 minutos.'));
    }
    const form = new URLSearchParams(await readBody(req, 4096));
    const email = (form.get('email') || '').trim().toLowerCase();
    const password = form.get('password') || '';
    const emailOk = safeEqual(email, cfg.adminEmail);
    const passOk = password.length > 0 && verifyPassword(password, cfg.passwordHash);
    if (!emailOk || !passOk) {
      rec.count += 1;
      attempts.set(ip, rec);
      return sendHTML(res, 401, loginPage('Correo o contraseña incorrectos.'));
    }
    attempts.delete(ip);
    const token = makeSessionToken(cfg.adminEmail, cfg.sessionSecret, now);
    res.writeHead(303, { Location: '/', 'Set-Cookie': cookieString(token, SESSION_MS, cfg.cookieSecure) });
    res.end();
  }

  async function handleGemini(req, res) {
    if (req.headers['x-requested-with'] !== 'gigadevs-studio') return sendJSON(res, 403, { error: 'solicitud no válida' });
    const type = String(req.headers['content-type'] || '').split(';')[0].trim();
    if (type !== 'application/json') return sendJSON(res, 415, { error: 'tipo de contenido no soportado' });
    let body;
    try { body = JSON.parse(await readBody(req, MAX_BODY_BYTES)); } catch (e) {
      if (e instanceof HttpError) throw e;
      return sendJSON(res, 400, { error: 'JSON inválido' });
    }
    const problem = validateGeminiBody(body);
    if (problem) return sendJSON(res, 400, { error: problem });
    if (!cfg.geminiKey) return sendJSON(res, 503, { error: 'servicio de IA no configurado' });
    let upstream;
    try { upstream = await callGemini(cfg, body); } catch { return sendJSON(res, 502, { error: 'IA no disponible' }); }
    if (!upstream.ok) return sendJSON(res, 502, { error: 'IA no disponible', upstreamStatus: upstream.status });
    let data;
    try { data = await upstream.json(); } catch { return sendJSON(res, 502, { error: 'respuesta de IA inválida' }); }
    return sendJSON(res, 200, data);
  }

  async function handleLinkMeta(req, res, url) {
    const target = url.searchParams.get('url') || '';
    if (target.length === 0 || target.length > 2048) return sendJSON(res, 400, { error: 'enlace inválido' });
    let page;
    try { page = await fetchPublicPage(target); } catch (e) {
      if (e instanceof BlockedError) return sendJSON(res, 400, { error: 'enlace no permitido' });
      return sendJSON(res, 502, { error: 'no se pudo leer la página' });
    }
    if (page.status >= 400) return sendJSON(res, 502, { error: 'la página respondió con error' });
    if (!/text\/html/i.test(page.contentType)) return sendJSON(res, 400, { error: 'el enlace no es una página HTML' });
    return sendJSON(res, 200, { url: page.url, domain: new URL(page.url).hostname, ...parseMeta(page.body) });
  }

  async function route(req, res) {
    const now = Date.now();
    const url = new URL(req.url, 'http://local');
    const p = url.pathname;

    if (req.method === 'GET' && p === '/healthz') return sendText(res, 200, 'ok');

    if (p === '/login') {
      if (req.method === 'GET') return sendHTML(res, 200, loginPage());
      if (req.method === 'POST') return handleLogin(req, res, now);
      return sendText(res, 405, 'Método no permitido');
    }

    if (p === '/logout' && req.method === 'POST') {
      res.writeHead(303, { Location: '/login', 'Set-Cookie': cookieString('', 0, cfg.cookieSecure) });
      return res.end();
    }

    const email = readSession(parseCookies(req.headers.cookie)[SESSION_COOKIE], cfg.sessionSecret, now);
    if (!email || !safeEqual(email, cfg.adminEmail)) {
      if (p.startsWith('/api/')) return sendJSON(res, 401, { error: 'no autorizado' });
      res.writeHead(302, { Location: '/login' });
      return res.end();
    }

    if (req.method === 'GET' && (p === '/' || p === '/index.html')) {
      return sendHTML(res, 200, indexHtml);
    }
    if (p === '/api/gemini' && req.method === 'POST') return handleGemini(req, res);
    if (p === '/api/link-meta' && req.method === 'GET') return handleLinkMeta(req, res, url);
    if (p.startsWith('/api/')) return sendJSON(res, 404, { error: 'no encontrado' });
    return sendText(res, 404, 'No encontrado');
  }

  return http.createServer((req, res) => {
    setSecurityHeaders(res);
    route(req, res).catch(err => {
      if (res.headersSent) return res.end();
      const status = err instanceof HttpError ? err.status : 500;
      const message = err instanceof HttpError ? err.message : 'error interno';
      if (String(req.url).startsWith('/api/')) return sendJSON(res, status, { error: message });
      return sendText(res, status, message);
    });
  });
}

module.exports = {
  createApp, hashPassword, verifyPassword, validatePageUrl, isPrivateIp,
  validateGeminiBody, parseMeta, makeSessionToken, readSession
};

if (require.main === module) {
  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || '';
  const sessionSecret = process.env.SESSION_SECRET || '';
  if (!adminEmail || !passwordHash || sessionSecret.length < 32) {
    console.error('Faltan variables: ADMIN_EMAIL, ADMIN_PASSWORD_HASH y SESSION_SECRET (32+ caracteres).');
    process.exit(1);
  }
  if (!process.env.GEMINI_API_KEY) console.warn('Aviso: GEMINI_API_KEY no está definida; la IA quedará deshabilitada.');
  const app = createApp({
    adminEmail,
    passwordHash,
    sessionSecret,
    geminiKey: process.env.GEMINI_API_KEY || '',
    geminiModel: process.env.GEMINI_MODEL || 'gemini-3-flash-preview',
    cookieSecure: process.env.COOKIE_SECURE !== 'false'
  });
  const port = Number(process.env.PORT) || 10000;
  app.listen(port);
  console.log(`Estudio Gigadevs escuchando en el puerto ${port}`);
}
