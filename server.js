const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración segura de la Base de Datos PostgreSQL con SSL obligatorio para producción en Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Requerido para conexiones seguras en Render
  }
});

// Verificación de conexión a la Base de Datos al iniciar
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos segura:', err.stack);
  } else {
    console.log('✅ Base de datos PostgreSQL conectada y protegida correctamente.');
    release();
  }
});

// Aplicación de cabeceras de seguridad HTTP con Helmet
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Limitador de peticiones (Rate Limiting) para prevenir ataques de denegación de servicio (DDoS / Brute Force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por IP
  message: { error: 'Demasiadas solicitudes desde esta IP, intente más tarde.' }
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10kb' })); // Limitar tamaño de payload para evitar ataques de desbordamiento

// Endpoint de estado de salud (Health Check)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date(), service: 'Giga Devs Secure API' });
});

// Endpoint seguro para registrar órdenes de pago
app.post('/api/orders', async (req, res) => {
  const { name, email, businessName, planName, billingCycle, planPriceUSD, bcvRate, totalVES, paymentMethod } = req.body;

  if (!name || !email || !planName) {
    return res.status(400).json({ error: 'Faltan campos obligatorios para procesar la orden.' });
  }

  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[SECURITY AUDIT] Nueva orden solicitada desde IP: ${clientIp} para el correo: ${email}`);

    // Iniciar transacción segura
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Insertar o recuperar cliente
      let clientResult = await client.query('SELECT id FROM clients WHERE email = $1', [email]);
      let clientId;

      if (clientResult.rows.length === 0) {
        const newClient = await client.query(
          'INSERT INTO clients (name, email, business_name) VALUES ($1, $2, $3) RETURNING id',
          [name, email, businessName || 'N/A']
        );
        clientId = newClient.rows[0].id;
      } else {
        clientId = clientResult.rows.id;
      }

      // 2. Generar número de factura único
      const invoiceNum = 'GIGA-' + Math.floor(100000 + Math.random() * 900000);

      // 3. Registrar orden en la base de datos
      const orderResult = await client.query(
        `INSERT INTO orders (invoice_number, client_id, plan_name, billing_cycle, amount_usd, bcv_rate, total_ves, payment_method) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [invoiceNum, clientId, planName, billingCycle, planPriceUSD, bcvRate, totalVES, paymentMethod]
      );

      await client.query('COMMIT');
      res.status(201).json({ success: true, order: orderResult.rows });
    } catch (dbError) {
      await client.query('ROLLBACK');
      throw dbError;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error al registrar orden en BD:', error);
    res.status(500).json({ error: 'Error interno al procesar la solicitud de pago.' });
  }
});

// Servir archivos estáticos del frontend en producción
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor seguro de GIGA DEVS corriendo en el puerto ${PORT}`);
});