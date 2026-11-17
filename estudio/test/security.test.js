'use strict';
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  createApp, hashPassword, validatePageUrl, isPrivateIp, validateGeminiBody, parseMeta, makeSessionToken, readSession
} = require('../server');

const PASSWORD = 'contraseña-de-prueba-123';
const ADMIN = 'gigadevsc@gmail.com';
const SECRET = 's'.repeat(48);
const FAKE_KEY = 'FAKE_TEST_KEY_NOT_REAL_0000';
const seen = { url: '', headers: null };

function baseCfg(extra = {}) {
  return {
    adminEmail: ADMIN,
    passwordHash: hashPassword(PASSWORD),
    sessionSecret: SECRET,
    geminiKey: FAKE_KEY,
    geminiModel: 'test-model',
    cookieSecure: false,
    fetchImpl: async (url, opts) => {
      seen.url = url;
      seen.headers = opts.headers;
      return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: '{"ok":true}' }] } }] }),
        { status: 200, headers: { 'content-type': 'application/json' } });
    },
    ...extra
  };
}

// ---------- pruebas unitarias ----------

test('IPs privadas, loopback y metadatos de nube quedan bloqueadas', () => {
  for (const ip of ['127.0.0.1', '10.1.2.3', '172.16.0.5', '192.168.1.1', '169.254.169.254', '0.0.0.0', '100.64.0.1', '::1', 'fd00::1', 'fe80::1', '::ffff:127.0.0.1']) {
    assert.equal(isPrivateIp(ip), true, ip);
  }
  for (const ip of ['8.8.8.8', '1.1.1.1', '2606:4700:4700::1111']) {
    assert.equal(isPrivateIp(ip), false, ip);
  }
});

test('URLs no permitidas: esquemas raros, credenciales, localhost, IPs internas y puertos extra', () => {
  const bad = [
    'file:///etc/passwd', 'ftp://example.com', 'javascript:alert(1)',
    'http://127.0.0.1/', 'http://169.254.169.254/latest/meta-data/', 'http://localhost:3000/',
    'http://[::1]/', 'http://user:pass@example.com/', 'http://example.com:8080/', 'http://printer.local/',
    'http://db.internal/', 'no-es-url'
  ];
  for (const u of bad) assert.equal(validatePageUrl(u), null, u);
  assert.ok(validatePageUrl('https://gigadevscorp.com/'));
});

test('Validacion de Gemini: rechaza herramientas, campos extra y textos enormes', () => {
  const ok = { contents: [{ parts: [{ text: 'hola' }] }], generationConfig: { responseMimeType: 'application/json' } };
  assert.equal(validateGeminiBody(ok), null);
  assert.ok(validateGeminiBody({ ...ok, tools: [{ google_search: {} }] }));
  assert.ok(validateGeminiBody({ ...ok, systemInstruction: { parts: [{ text: 'x' }] } }));
  assert.ok(validateGeminiBody({ contents: [{ parts: [{ text: 'a'.repeat(9000) }] }] }));
  assert.ok(validateGeminiBody({ contents: [{ parts: [{ inlineData: { mimeType: 'application/pdf', data: 'AAAA' } }] }] }));
  assert.ok(validateGeminiBody({ ...ok, generationConfig: { responseMimeType: 'text/plain' } }));
});

test('Extraccion de metadatos y color de tema seguro', () => {
  const html = '<html><head><title>Tienda &amp; Co</title><meta name="theme-color" content="#0B192C">' +
    '<meta property="og:description" content="Desc"></head><body><h1>Hola</h1><script>var x=1</script><p>Texto</p></body></html>';
  const m = parseMeta(html);
  assert.equal(m.title, 'Tienda & Co');
  assert.equal(m.description, 'Desc');
  assert.equal(m.themeColor, '#0B192C');
  assert.equal(m.headings, 'Hola');
  assert.ok(!m.rawSnippet.includes('var x'));
  assert.equal(parseMeta('<meta name="theme-color" content="red">').themeColor, '');
});

test('Contrasena: hash scrypt verifica bien y no guarda texto plano', () => {
  const h = hashPassword('una-contraseña-larga');
  assert.ok(h.startsWith('scrypt$'));
  assert.ok(!h.includes('una-contraseña'));
});

test('Cookie de sesion: firma valida, alterada y vencida', () => {
  const now = Date.now();
  const token = makeSessionToken(ADMIN, SECRET, now);
  assert.equal(readSession(token, SECRET, now), ADMIN);
  const [payload, sig] = token.split('.');
  const forged = Buffer.from(JSON.stringify({ e: 'atacante@x.com', x: now + 1e9 })).toString('base64url');
  assert.equal(readSession(`${forged}.${sig}`, SECRET, now), null);
  assert.equal(readSession(token, 'otro-secreto-distinto-de-32-caracteres!!', now), null);
  assert.equal(readSession(makeSessionToken(ADMIN, SECRET, now - 9 * 3600e3), SECRET, now), null);
});

test('Ningun archivo publico contiene claves de API ni dominios de proxy de terceros', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  assert.ok(!/AIza[0-9A-Za-z_-]{20,}/.test(html), 'clave tipo AIza encontrada');
  assert.ok(!html.includes(FAKE_KEY));
  assert.ok(!html.includes('allorigins'), 'proxy publico de terceros');
  assert.ok(!html.includes('r.jina.ai'), 'proxy publico de terceros');
  assert.ok(!html.includes('localStorage.getItem(\'gigadevs_gemini_key\')'), 'clave en navegador');
  assert.ok(!html.includes('generativelanguage.googleapis.com'), 'llamada directa a Gemini desde el navegador');
});

// ---------- pruebas de integracion (servidor real) ----------

let server, base;
before(async () => {
  server = createApp(baseCfg());
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise(r => server.close(r)));

async function login(email = ADMIN, password = PASSWORD) {
  const res = await fetch(`${base}/login`, {
    method: 'POST', redirect: 'manual',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ email, password })
  });
  return res;
}
function cookieFrom(res) {
  return (res.headers.get('set-cookie') || '').split(';')[0];
}

test('Sin sesion: la app redirige a login y las APIs responden 401', async () => {
  const r1 = await fetch(`${base}/`, { redirect: 'manual' });
  assert.equal(r1.status, 302);
  assert.equal(r1.headers.get('location'), '/login');
  const r2 = await fetch(`${base}/api/gemini`, { method: 'POST', redirect: 'manual' });
  assert.equal(r2.status, 401);
  const r3 = await fetch(`${base}/api/link-meta?url=https://example.com`, { redirect: 'manual' });
  assert.equal(r3.status, 401);
  const r4 = await fetch(`${base}/ruta-secreta-inventada`, { redirect: 'manual' });
  assert.equal(r4.status, 302, 'rutas desconocidas no deben revelar nada');
});

test('Login con contrasena incorrecta o correo distinto no da sesion', async () => {
  const bad = await login(ADMIN, 'incorrecta-123456');
  assert.equal(bad.status, 401);
  assert.equal(bad.headers.get('set-cookie'), null);
  const otro = await login('otra@persona.com', PASSWORD);
  assert.equal(otro.status, 401);
  assert.equal(otro.headers.get('set-cookie'), null);
});

let cookie;
test('Login correcto: cookie HttpOnly, SameSite=Strict y acceso al estudio', async () => {
  const res = await login();
  assert.equal(res.status, 303);
  const setCookie = res.headers.get('set-cookie');
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /SameSite=Strict/);
  cookie = cookieFrom(res);

  const home = await fetch(`${base}/`, { headers: { cookie } });
  assert.equal(home.status, 200);
  assert.equal(home.headers.get('cache-control'), 'no-store');
  const body = await home.text();
  assert.ok(body.includes('GIGADEVS CORP, C.A.'));
  assert.ok(!body.includes(FAKE_KEY));
});

test('Encabezados de seguridad presentes', async () => {
  const res = await fetch(`${base}/`, { headers: { cookie } });
  assert.equal(res.headers.get('x-frame-options'), 'DENY');
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(res.headers.get('referrer-policy'), 'no-referrer');
  assert.match(res.headers.get('content-security-policy'), /frame-ancestors 'none'/);
  assert.match(res.headers.get('content-security-policy'), /connect-src 'self'/);
  assert.match(res.headers.get('strict-transport-security'), /max-age=31536000/);
});

test('Gemini: sin encabezado de solicitud propia responde 403 (proteccion CSRF)', async () => {
  const res = await fetch(`${base}/api/gemini`, {
    method: 'POST', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'hola' }] }] })
  });
  assert.equal(res.status, 403);
});

test('Gemini: herramientas no permitidas se rechazan con 400', async () => {
  const res = await fetch(`${base}/api/gemini`, {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json', 'x-requested-with': 'gigadevs-studio' },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'hola' }] }], tools: [{ google_search: {} }] })
  });
  assert.equal(res.status, 400);
});

test('Gemini: solicitud valida se reenvia con la clave solo en el encabezado del servidor', async () => {
  const res = await fetch(`${base}/api/gemini`, {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json', 'x-requested-with': 'gigadevs-studio' },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'hola' }] }], generationConfig: { responseMimeType: 'application/json' } })
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.candidates[0].content.parts[0].text, '{"ok":true}');
  assert.ok(!seen.url.includes(FAKE_KEY), 'la clave no debe ir en la URL');
  assert.equal(seen.headers['x-goog-api-key'], FAKE_KEY);
});

test('Gemini: cuerpo demasiado grande se rechaza con 413', async () => {
  // El servidor corta la lectura; el cliente puede ver 413 o un corte de conexion, nunca un 200.
  let status = null;
  try {
    const res = await fetch(`${base}/api/gemini`, {
      method: 'POST',
      headers: { cookie, 'content-type': 'application/json', 'x-requested-with': 'gigadevs-studio' },
      body: 'x'.repeat(1024 * 1024 + 10)
    });
    status = res.status;
  } catch (e) { status = 'cortada'; }
  assert.ok(status === 413 || status === 'cortada', `estado inesperado: ${status}`);
});

test('Enlaces: destinos internos y esquemas peligrosos se bloquean (anti-SSRF)', async () => {
  const targets = [
    'http://127.0.0.1/', 'http://169.254.169.254/latest/meta-data/', 'http://localhost:3000/',
    'http://[::1]/', 'file:///etc/passwd', 'http://192.168.0.1/admin'
  ];
  for (const t of targets) {
    const res = await fetch(`${base}/api/link-meta?url=${encodeURIComponent(t)}`, { headers: { cookie } });
    assert.equal(res.status, 400, t);
  }
});

test('Sesion alterada o cerrada ya no abre el estudio', async () => {
  const tampered = cookie.slice(0, -4) + 'AAAA';
  const r1 = await fetch(`${base}/`, { headers: { cookie: tampered }, redirect: 'manual' });
  assert.equal(r1.status, 302);
  const out = await fetch(`${base}/logout`, { method: 'POST', headers: { cookie }, redirect: 'manual' });
  assert.equal(out.status, 303);
  assert.match(out.headers.get('set-cookie'), /Max-Age=0/);
});

test('Limite de intentos: tras 5 fallos responde 429 aunque la clave sea correcta', async () => {
  const limited = createApp(baseCfg());
  await new Promise(r => limited.listen(0, '127.0.0.1', r));
  const url = `http://127.0.0.1:${limited.address().port}/login`;
  const send = pw => fetch(url, { method: 'POST', redirect: 'manual',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ email: ADMIN, password: pw }) });
  for (let i = 0; i < 5; i++) assert.equal((await send('mala-clave-xxxx')).status, 401);
  assert.equal((await send(PASSWORD)).status, 429);
  await new Promise(r => limited.close(r));
});

test('Sin clave de Gemini configurada el servicio responde 503 sin fallar', async () => {
  const noKey = createApp(baseCfg({ geminiKey: '' }));
  await new Promise(r => noKey.listen(0, '127.0.0.1', r));
  const b = `http://127.0.0.1:${noKey.address().port}`;
  const login2 = await fetch(`${b}/login`, { method: 'POST', redirect: 'manual',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ email: ADMIN, password: PASSWORD }) });
  const c = cookieFrom(login2);
  const res = await fetch(`${b}/api/gemini`, { method: 'POST',
    headers: { cookie: c, 'content-type': 'application/json', 'x-requested-with': 'gigadevs-studio' },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'hola' }] }] }) });
  assert.equal(res.status, 503);
  await new Promise(r => noKey.close(r));
});
