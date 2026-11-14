'use strict';
// Uso: echo "TU_CONTRASEÑA" | node scripts/hash-password.js
// Imprime el valor para la variable ADMIN_PASSWORD_HASH. La contraseña no se guarda en ningún lado.
const { hashPassword } = require('../server');
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', d => { input += d; });
process.stdin.on('end', () => {
  const pw = input.replace(/\r?\n$/, '');
  if (pw.length < 12) { console.error('Usa una contraseña de al menos 12 caracteres.'); process.exit(1); }
  console.log(hashPassword(pw));
});
