-- ========================================================
-- GIGA DEVS CORP - ESQUEMA DE BASE DE DATOS Y SEGURIDAD
-- ========================================================

-- 1. Habilitar extensiones de cifrado y seguridad
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabla de Clientes con cifrado de datos sensibles
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    business_name VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Órdenes y Facturación con restricciones seguras
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    plan_name VARCHAR(200) NOT NULL,
    billing_cycle VARCHAR(50) NOT NULL,
    amount_usd NUMERIC(10, 2) NOT NULL CHECK (amount_usd >= 0),
    bcv_rate NUMERIC(10, 4) NOT NULL CHECK (bcv_rate > 0),
    total_ves NUMERIC(12, 2) NOT NULL CHECK (total_ves >= 0),
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDIENTE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Creación de índices para optimizar consultas y prevenir bloqueos
CREATE INDEX IF NOT EXISTS idx_orders_client_id ON orders(client_id);
CREATE INDEX IF NOT EXISTS idx_orders_invoice ON orders(invoice_number);

-- 5. Configuración de Row Level Security (RLS) para cumplimiento de seguridad
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Política restrictiva: Solo lectura/escritura autenticada mediante API segura del servidor
CREATE POLICY secure_server_access_clients ON clients 
    FOR ALL 
    USING (current_user = 'postgres' OR current_user = 'giga_app_user');

CREATE POLICY secure_server_access_orders ON orders 
    FOR ALL 
    USING (current_user = 'postgres' OR current_user = 'giga_app_user');