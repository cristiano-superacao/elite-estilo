# 🗄️ Database Documentation - Elite & Estilo

Complete database schema and configuration for the Elite & Estilo beauty salon management system.

## 📋 Table of Contents

- [Overview](#overview)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
- [Prisma Configuration](#prisma-configuration)
- [API Usage](#api-usage)
- [Example Queries](#example-queries)
- [Migration Guide](#migration-guide)

---

## 🎯 Overview

This project uses **PostgreSQL** (via Neon) with **Prisma ORM** for type-safe database access.

### Technology Stack
- **Database**: PostgreSQL 15+
- **ORM**: Prisma 5.x
- **Hosting**: Neon (Serverless PostgreSQL)
- **Client**: @prisma/client

### Key Features
- ✅ Type-safe database operations
- ✅ Automatic migrations
- ✅ Relation management
- ✅ Built-in validation
- ✅ Query optimization
- ✅ Connection pooling

---

## 📊 Database Schema

### Entity Relationship Diagram

```
User (1) -----> (N) Salon (Owner)
User (1) -----> (N) Appointment
User (1) -----> (N) Review
User (1) -----> (N) ChatMessage

Salon (1) -----> (N) Appointment
Salon (1) -----> (N) Review
Salon (1) -----> (N) Promotion
Salon (1) -----> (N) ChatMessage
Salon (N) -----> (1) Plan

Plan (1) -----> (N) Salon
```

### Tables Overview

| Table | Description | Key Relations |
|-------|-------------|---------------|
| **users** | System users (clients, salon owners, admins) | -> salons, appointments, reviews, chat_messages |
| **salons** | Beauty salons and barbershops | -> users, plans, appointments, reviews, promotions |
| **plans** | Subscription plans for salons | -> salons |
| **appointments** | Service bookings | -> users, salons |
| **reviews** | Customer reviews and ratings | -> users, salons |
| **promotions** | Special offers and discounts | -> salons |
| **chat_messages** | Communication between users and salons | -> users |

---

## 🗂️ Detailed Schema

### 1️⃣ Users Table

Stores all system users including clients, salon owners, and administrators.

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String    // Hashed
  name          String
  phone         String?
  avatar        String?
  role          UserRole  @default(CLIENT)
  isActive      Boolean   @default(true)
  emailVerified Boolean   @default(false)
  favoriteIds   String[]  // Salon IDs
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

**Roles**: CLIENT, SALON_OWNER, ADMIN

### 2️⃣ Salons Table

Beauty salons and barbershops with complete information.

```prisma
model Salon {
  id           String   @id @default(cuid())
  name         String
  slug         String   @unique
  description  String?
  image        String?
  address      String
  city         String
  state        String?
  phone        String
  whatsapp     String?
  hours        String   // JSON format
  services     String[] // Array of services
  prices       Json     // Service prices
  specialties  String[]
  amenities    String[]
  rating       Float    @default(0)
  reviewCount  Int      @default(0)
  isActive     Boolean  @default(true)
  isFeatured   Boolean  @default(false)
  planId       String?
  ownerId      String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### 3️⃣ Plans Table

Subscription plans with features and pricing.

```prisma
model Plan {
  id              String   @id @default(cuid())
  name            String
  type            PlanType @unique
  price           Float
  duration        Int      // Days
  features        String[]
  maxAppointments Int      @default(-1) // -1 = unlimited
  maxPhotos       Int      @default(10)
  discount        Int      @default(0)  // Percentage
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

**Plan Types**: FREE_TRIAL, MONTHLY, SEMI_ANNUAL, ANNUAL

### 4️⃣ Appointments Table

Service bookings with status tracking.

```prisma
model Appointment {
  id          String            @id @default(cuid())
  salonId     String
  userId      String
  clientName  String
  clientPhone String
  service     String
  date        DateTime
  time        String
  duration    Int               @default(60) // Minutes
  price       Float?
  status      AppointmentStatus @default(PENDING)
  notes       String?
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
}
```

**Status**: PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW

### 5️⃣ Reviews Table

Customer reviews with ratings.

```prisma
model Review {
  id        String   @id @default(cuid())
  salonId   String
  userId    String
  rating    Int      // 1-5 stars
  comment   String?
  service   String?
  isVisible Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 6️⃣ Promotions Table

Special offers and discounts.

```prisma
model Promotion {
  id          String        @id @default(cuid())
  salonId     String
  title       String
  description String
  type        PromotionType
  value       Float
  code        String?       @unique
  services    String[]
  startDate   DateTime
  endDate     DateTime
  isActive    Boolean       @default(true)
  maxUses     Int?
  currentUses Int           @default(0)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}
```

**Promotion Types**: PERCENTAGE, FIXED, SPECIAL

### 7️⃣ Chat Messages Table

Communication system between users and salons.

```prisma
model ChatMessage {
  id         String   @id @default(cuid())
  senderId   String
  salonId    String
  message    String
  isRead     Boolean  @default(false)
  attachment String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install prisma @prisma/client
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Neon PostgreSQL Connection
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech:5432/dbname?sslmode=require"

# Environment
NODE_ENV="development"
```

### 3. Initialize Prisma (Already Done)

```bash
npx prisma init
```

### 4. Run Migrations

**Option A: Using Prisma Migrate (Recommended)**

```bash
# Create and apply migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

**Option B: Using Raw SQL**

```bash
# Connect to your Neon database and run:
psql $DATABASE_URL < prisma/migrations/init.sql
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Test Connection

```bash
node prisma/example-queries.js
```

---

## ⚙️ Prisma Configuration

### Location
- **Schema**: `prisma/schema.prisma`
- **Client**: `src/lib/prisma.js`
- **API**: `api/database.js`
- **Examples**: `prisma/example-queries.js`

### Key Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio (GUI)
npx prisma studio

# Reset database
npx prisma migrate reset

# Pull database schema
npx prisma db pull

# Push schema to database
npx prisma db push
```

---

## 💻 API Usage

### Import Prisma Client

```javascript
import prisma from './src/lib/prisma.js';
// or
import { prisma } from './api/database.js';
```

### Basic Operations

#### Create
```javascript
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    password: 'hashed_password',
    name: 'John Doe',
    role: 'CLIENT',
  },
});
```

#### Read
```javascript
// Find one
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
});

// Find many
const salons = await prisma.salon.findMany({
  where: { city: 'Salvador', isActive: true },
  include: { owner: true, reviews: true },
});
```

#### Update
```javascript
const salon = await prisma.salon.update({
  where: { id: salonId },
  data: { rating: 4.5, reviewCount: 10 },
});
```

#### Delete
```javascript
await prisma.appointment.delete({
  where: { id: appointmentId },
});
```

### Advanced Queries

#### Search with Filters
```javascript
const salons = await prisma.salon.findMany({
  where: {
    OR: [
      { name: { contains: searchTerm, mode: 'insensitive' } },
      { city: { contains: searchTerm, mode: 'insensitive' } },
    ],
    isActive: true,
  },
  include: {
    owner: { select: { name: true } },
    plan: true,
  },
  orderBy: { rating: 'desc' },
  take: 10,
  skip: 0,
});
```

#### Aggregations
```javascript
const stats = await prisma.review.aggregate({
  where: { salonId },
  _avg: { rating: true },
  _count: { id: true },
});
```

#### Transactions
```javascript
const result = await prisma.$transaction([
  prisma.appointment.create({ data: appointmentData }),
  prisma.salon.update({
    where: { id: salonId },
    data: { reviewCount: { increment: 1 } },
  }),
]);
```

---

## 📝 Example Queries

### Get Salons with Filters
```javascript
import { getSalons } from './api/database.js';

const { salons, total } = await getSalons({
  city: 'Salvador',
  search: 'barbershop',
  skip: 0,
  take: 10,
});
```

### Create Appointment
```javascript
import { createAppointment } from './api/database.js';

const appointment = await createAppointment({
  salonId: 'salon_123',
  userId: 'user_456',
  clientName: 'John Doe',
  clientPhone: '71999999999',
  service: 'Haircut',
  date: '2025-11-01',
  time: '14:00',
  price: 45.00,
});
```

### Get Salon Details
```javascript
import { getSalonById } from './api/database.js';

const salon = await getSalonById('salon_123');
console.log(salon.reviews); // Includes related reviews
console.log(salon.promotions); // Includes active promotions
```

### Create Review
```javascript
import { createReview } from './api/database.js';

const review = await createReview({
  salonId: 'salon_123',
  userId: 'user_456',
  rating: 5,
  comment: 'Excellent service!',
  service: 'Haircut',
});
```

---

## 🔄 Migration Guide

### From Old Schema to New Schema

If you have the old `salons` and `appointments` tables:

1. **Backup existing data**
```bash
pg_dump $DATABASE_URL > backup.sql
```

2. **Run migration**
```bash
npx prisma migrate dev --name add_new_tables
```

3. **Migrate data** (if needed)
```sql
-- Example: Migrate old appointments to new structure
INSERT INTO "appointments" (
  "salonId", "userId", "clientName", "clientPhone", 
  "service", "date", "time", "updatedAt"
)
SELECT 
  salon_id::text, 
  gen_random_uuid()::text, -- Generate user IDs
  client_name,
  '00000000000',
  service,
  date,
  hour,
  CURRENT_TIMESTAMP
FROM old_appointments;
```

### Seeding Database

Run example queries to populate database:
```bash
node prisma/example-queries.js
```

---

## 🔒 Security Best Practices

1. **Password Hashing**
   - Always hash passwords before storing
   - Use bcrypt or argon2

2. **Environment Variables**
   - Never commit `.env` files
   - Use different databases for dev/prod

3. **SQL Injection**
   - Prisma protects against SQL injection
   - Always use Prisma methods, not raw SQL

4. **Validation**
   - Validate all inputs before database operations
   - Use Prisma schema constraints

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Neon Documentation](https://neon.tech/docs)
- [Database Best Practices](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate)

---

## 🆘 Troubleshooting

### Connection Issues
```bash
# Test database connection
npx prisma db pull
```

### Client Generation Errors
```bash
# Clear cache and regenerate
rm -rf node_modules/.prisma
npx prisma generate
```

### Migration Conflicts
```bash
# Reset database (CAUTION: Deletes all data)
npx prisma migrate reset
```

---

**Last Updated**: 2025-10-29  
**Version**: 1.0.0
