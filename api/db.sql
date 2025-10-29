-- ====================================
-- LEGACY SCHEMA - For backwards compatibility
-- Script de criação de tabelas para Neon/PostgreSQL
-- 
-- NOTE: This is the original schema. For the new comprehensive schema
-- with users, plans, reviews, promotions, and chat, use:
-- prisma/migrations/init.sql
-- ====================================

CREATE TABLE IF NOT EXISTS salons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  image TEXT,
  address VARCHAR(200),
  city VARCHAR(100),
  rating NUMERIC(2,1),
  reviews INT,
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  hours VARCHAR(100),
  services TEXT[],
  prices JSONB,
  specialties TEXT[],
  badge VARCHAR(50),
  color VARCHAR(50),
  description TEXT,
  amenities TEXT[],
  owner VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salons(id),
  client_name VARCHAR(100),
  service VARCHAR(100),
  date DATE,
  hour TIME
);

-- ====================================
-- For new installations, use the comprehensive schema:
-- See: prisma/migrations/init.sql
-- Or run: npx prisma migrate dev
-- ====================================
