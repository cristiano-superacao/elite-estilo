-- Script de criação de tabelas para Neon/PostgreSQL
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
  owner VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  duration VARCHAR(50),
  description TEXT,
  features JSONB,
  highlight BOOLEAN DEFAULT FALSE,
  button_text VARCHAR(100),
  badge VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  salon_id INT REFERENCES salons(id),
  client_name VARCHAR(100),
  client_email VARCHAR(100),
  client_phone VARCHAR(20),
  service VARCHAR(100),
  date DATE,
  hour TIME,
  status VARCHAR(20) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
