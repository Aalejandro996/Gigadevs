# Estudio Gigadevs (privado)

Herramienta interna de identidad y redes de Gigadevs Corp, C.A.
Solo entra el correo de administrador. No está enlazada desde el sitio público.

## Seguridad incluida
- Inicio de sesión con correo + contraseña (hash scrypt). Tras 5 fallos, bloqueo de 15 minutos.
- Cookie de sesión firmada (HMAC), `HttpOnly`, `Secure`, `SameSite=Strict`, vence en 8 horas.
- La clave de Gemini solo existe como variable de entorno del servidor. Nunca llega al navegador.
- Protección CSRF: las llamadas a la API exigen la cabecera `X-Requested-With`.
- Consulta de enlaces con protección anti-SSRF: bloquea IPs privadas, localhost, metadatos de nube y redirecciones internas.
- Encabezados: CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`.
- Sin dependencias externas en el servidor (menos superficie de ataque).

## Pruebas
```
npm test
```
Verifican: rutas sin sesión, login, cookies, encabezados, CSRF, límites de tamaño, anti-SSRF,
límite de intentos, clave no expuesta en el HTML y servicio sin clave configurada.

## Variables de entorno (en Render → Environment)
| Variable | Valor |
|---|---|
| `ADMIN_EMAIL` | `gigadevsc@gmail.com` |
| `ADMIN_PASSWORD_HASH` | Resultado de `echo "TU_CONTRASEÑA" \| node scripts/hash-password.js` |
| `SESSION_SECRET` | Texto aleatorio de 32+ caracteres: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"` |
| `GEMINI_API_KEY` | Tu clave de Google AI Studio (márcala como secreta) |
| `GEMINI_MODEL` | Opcional. Por defecto `gemini-3-flash-preview` |
| `COOKIE_SECURE` | Dejar sin definir (vale `true` en Render) |

## Despliegue en Render
1. Sube esta carpeta a un repositorio **privado** en GitHub (nunca con claves dentro).
2. En Render: **New → Web Service** → elige el repositorio.
3. Runtime: **Node**. Build Command: `npm install`. Start Command: `npm start`. Health Check Path: `/healthz`.
4. Agrega las variables de la tabla y despliega.
5. Entra a la URL del servicio: te pedirá correo y contraseña.

No compartas la URL del estudio en el sitio público ni en redes.
