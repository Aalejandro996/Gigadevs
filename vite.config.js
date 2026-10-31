import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Política de seguridad del navegador (CSP) y Referrer-Policy: solo en la compilación de producción,
// porque el modo desarrollo de Vite inyecta scripts en línea que la política bloquearía.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://ve.dolarapi.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ')

const seguridad = {
  name: 'gigadevs-seguridad',
  apply: 'build',
  transformIndexHtml(html) {
    return html.replace(
      '<meta charset="UTF-8" />',
      `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />\n    <meta name="referrer" content="strict-origin-when-cross-origin" />`,
    )
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seguridad],
})
