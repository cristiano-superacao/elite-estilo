-- ====================================
-- Elite & Estilo - Beauty Salon Management System
-- PostgreSQL Database Schema
-- Complete database structure with all tables
-- ====================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====================================
-- ENUMS
-- ====================================

CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'SALON_OWNER', 'ADMIN');
CREATE TYPE "PlanType" AS ENUM ('FREE_TRIAL', 'MONTHLY', 'SEMI_ANNUAL', 'ANNUAL');
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW');
CREATE TYPE "PromotionType" AS ENUM ('PERCENTAGE', 'FIXED', 'SPECIAL');

-- ====================================
-- USERS TABLE
-- ====================================

CREATE TABLE "users" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "avatar" TEXT,
    "role" "UserRole" DEFAULT 'CLIENT' NOT NULL,
    "isActive" BOOLEAN DEFAULT true NOT NULL,
    "emailVerified" BOOLEAN DEFAULT false NOT NULL,
    "favoriteIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "users_email_idx" ON "users"("email");
CREATE INDEX "users_role_idx" ON "users"("role");

-- ====================================
-- PLANS TABLE
-- ====================================

CREATE TABLE "plans" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "type" "PlanType" UNIQUE NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION,
    "duration" INTEGER NOT NULL,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "maxAppointments" INTEGER DEFAULT -1 NOT NULL,
    "maxPhotos" INTEGER DEFAULT 10 NOT NULL,
    "hasPriority" BOOLEAN DEFAULT false NOT NULL,
    "hasAnalytics" BOOLEAN DEFAULT false NOT NULL,
    "hasPromotion" BOOLEAN DEFAULT false NOT NULL,
    "isActive" BOOLEAN DEFAULT true NOT NULL,
    "discount" INTEGER DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "plans_type_idx" ON "plans"("type");

-- ====================================
-- SALONS TABLE
-- ====================================

CREATE TABLE "salons" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "zipCode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "email" TEXT,
    "website" TEXT,
    "hours" TEXT NOT NULL,
    "services" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "prices" JSONB,
    "specialties" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "badge" TEXT,
    "color" TEXT,
    "rating" DOUBLE PRECISION DEFAULT 0 NOT NULL,
    "reviewCount" INTEGER DEFAULT 0 NOT NULL,
    "isActive" BOOLEAN DEFAULT true NOT NULL,
    "isFeatured" BOOLEAN DEFAULT false NOT NULL,
    "planId" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "salons_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "salons_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "salons_slug_idx" ON "salons"("slug");
CREATE INDEX "salons_city_idx" ON "salons"("city");
CREATE INDEX "salons_ownerId_idx" ON "salons"("ownerId");
CREATE INDEX "salons_planId_idx" ON "salons"("planId");

-- ====================================
-- APPOINTMENTS TABLE
-- ====================================

CREATE TABLE "appointments" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "salonId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "clientEmail" TEXT,
    "service" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "duration" INTEGER DEFAULT 60 NOT NULL,
    "price" DOUBLE PRECISION,
    "status" "AppointmentStatus" DEFAULT 'PENDING' NOT NULL,
    "notes" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "cancelledBy" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "appointments_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salons"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "appointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "appointments_salonId_idx" ON "appointments"("salonId");
CREATE INDEX "appointments_userId_idx" ON "appointments"("userId");
CREATE INDEX "appointments_date_idx" ON "appointments"("date");
CREATE INDEX "appointments_status_idx" ON "appointments"("status");

-- ====================================
-- PROMOTIONS TABLE
-- ====================================

CREATE TABLE "promotions" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "salonId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "PromotionType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "code" TEXT UNIQUE,
    "services" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN DEFAULT true NOT NULL,
    "maxUses" INTEGER,
    "currentUses" INTEGER DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "promotions_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salons"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "promotions_salonId_idx" ON "promotions"("salonId");
CREATE INDEX "promotions_code_idx" ON "promotions"("code");
CREATE INDEX "promotions_startDate_idx" ON "promotions"("startDate");
CREATE INDEX "promotions_endDate_idx" ON "promotions"("endDate");

-- ====================================
-- REVIEWS TABLE
-- ====================================

CREATE TABLE "reviews" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "salonId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "service" TEXT,
    "isVisible" BOOLEAN DEFAULT true NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "reviews_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salons"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reviews_rating_check" CHECK ("rating" >= 1 AND "rating" <= 5)
);

CREATE INDEX "reviews_salonId_idx" ON "reviews"("salonId");
CREATE INDEX "reviews_userId_idx" ON "reviews"("userId");
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- ====================================
-- CHAT MESSAGES TABLE
-- ====================================

CREATE TABLE "chat_messages" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "senderId" TEXT NOT NULL,
    "salonId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN DEFAULT false NOT NULL,
    "attachment" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "chat_messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "chat_messages_senderId_idx" ON "chat_messages"("senderId");
CREATE INDEX "chat_messages_salonId_idx" ON "chat_messages"("salonId");
CREATE INDEX "chat_messages_createdAt_idx" ON "chat_messages"("createdAt");

-- ====================================
-- SAMPLE DATA - PLANS
-- ====================================

INSERT INTO "plans" ("id", "name", "type", "description", "price", "originalPrice", "duration", "features", "maxAppointments", "maxPhotos", "hasPriority", "hasAnalytics", "hasPromotion", "isActive", "discount", "updatedAt") VALUES
('plan_free_trial', 'Teste Grátis', 'FREE_TRIAL', 'Experimente por 7 dias sem compromisso', 0, 0, 7, ARRAY['Até 10 agendamentos', 'Cadastro de serviços', 'Fotos do salão', 'Avaliações de clientes'], 10, 5, false, false, false, true, 0, CURRENT_TIMESTAMP),
('plan_monthly', 'Plano Mensal', 'MONTHLY', 'Ideal para começar', 49.90, 79.90, 30, ARRAY['Agendamentos ilimitados', 'Cadastro de serviços', 'Até 20 fotos', 'Avaliações', 'Chat com clientes', 'Relatórios básicos'], -1, 20, false, true, false, true, 38, CURRENT_TIMESTAMP),
('plan_semi_annual', 'Plano Semestral', 'SEMI_ANNUAL', 'Melhor economia', 239.90, 479.40, 180, ARRAY['Agendamentos ilimitados', 'Cadastro de serviços', 'Até 50 fotos', 'Avaliações', 'Chat com clientes', 'Relatórios completos', 'Destaque na busca', 'Promoções'], -1, 50, true, true, true, true, 50, CURRENT_TIMESTAMP),
('plan_annual', 'Plano Anual', 'ANNUAL', 'Máximo desconto', 399.90, 958.80, 365, ARRAY['Agendamentos ilimitados', 'Cadastro de serviços', 'Fotos ilimitadas', 'Avaliações', 'Chat com clientes', 'Relatórios avançados', 'Selo Premium', 'Promoções ilimitadas', 'Suporte prioritário'], -1, -1, true, true, true, true, 58, CURRENT_TIMESTAMP);

-- ====================================
-- FUNCTIONS AND TRIGGERS
-- ====================================

-- Function to update salon rating when new review is added
CREATE OR REPLACE FUNCTION update_salon_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "salons"
    SET "rating" = (
        SELECT COALESCE(AVG("rating"), 0)
        FROM "reviews"
        WHERE "salonId" = NEW."salonId" AND "isVisible" = true
    ),
    "reviewCount" = (
        SELECT COUNT(*)
        FROM "reviews"
        WHERE "salonId" = NEW."salonId" AND "isVisible" = true
    ),
    "updatedAt" = CURRENT_TIMESTAMP
    WHERE "id" = NEW."salonId";
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for new reviews
CREATE TRIGGER trigger_update_salon_rating
AFTER INSERT OR UPDATE ON "reviews"
FOR EACH ROW
EXECUTE FUNCTION update_salon_rating();

-- Function to auto-update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for all tables
CREATE TRIGGER trigger_users_updated_at BEFORE UPDATE ON "users" FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_salons_updated_at BEFORE UPDATE ON "salons" FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_appointments_updated_at BEFORE UPDATE ON "appointments" FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_promotions_updated_at BEFORE UPDATE ON "promotions" FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_reviews_updated_at BEFORE UPDATE ON "reviews" FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_chat_messages_updated_at BEFORE UPDATE ON "chat_messages" FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trigger_plans_updated_at BEFORE UPDATE ON "plans" FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ====================================
-- INDEXES FOR PERFORMANCE
-- ====================================

-- Full-text search on salons
CREATE INDEX "salons_name_trgm_idx" ON "salons" USING gin ("name" gin_trgm_ops);
CREATE INDEX "salons_description_trgm_idx" ON "salons" USING gin ("description" gin_trgm_ops);

-- Comments on tables
COMMENT ON TABLE "users" IS 'User accounts including clients, salon owners, and admins';
COMMENT ON TABLE "salons" IS 'Beauty salons and barbershops registered in the platform';
COMMENT ON TABLE "plans" IS 'Subscription plans available for salon owners';
COMMENT ON TABLE "appointments" IS 'Service appointments booked by clients';
COMMENT ON TABLE "promotions" IS 'Special offers and promotions created by salons';
COMMENT ON TABLE "reviews" IS 'Customer reviews and ratings for salons';
COMMENT ON TABLE "chat_messages" IS 'Chat messages between clients and salons';
