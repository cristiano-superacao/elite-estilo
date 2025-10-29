-- Script de criação de tabelas para Neon/PostgreSQL

-- Tabela de usuários para autenticação
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

CREATE TABLE salons (
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

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salons(id),
  client_name VARCHAR(100),
  service VARCHAR(100),
  date DATE,
  hour TIME
);
