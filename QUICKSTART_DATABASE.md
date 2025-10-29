# 🚀 Quick Start - Database Setup

Get your Elite & Estilo database up and running in 5 minutes.

## Prerequisites

- Node.js 20+ installed
- A Neon PostgreSQL database account (free tier available)
- Git repository cloned

## Step-by-Step Setup

### 1️⃣ Get Your Database URL

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project (or use existing)
3. Copy your connection string
   - Should look like: `postgresql://username:password@ep-xxx.neon.tech:5432/dbname?sslmode=require`

### 2️⃣ Configure Environment

Create `.env` file in project root:

```bash
# Copy example file
cp .env.example .env

# Edit .env and add your database URL
DATABASE_URL="postgresql://YOUR_CONNECTION_STRING_HERE"
NODE_ENV="development"
```

### 3️⃣ Install Dependencies

```bash
npm install
```

This installs Prisma, Prisma Client, and all other dependencies.

### 4️⃣ Setup Database

**Option A: Automated (Recommended)**

```bash
# Generate Prisma Client and run migrations
npm run db:generate
npm run db:migrate

# Seed with example data (optional)
npm run db:seed
```

**Option B: Manual SQL**

```bash
# Run the SQL file directly in Neon console or via psql
psql $DATABASE_URL < prisma/migrations/init.sql

# Generate Prisma Client
npm run db:generate
```

### 5️⃣ Verify Setup

Test your database connection:

```bash
node prisma/example-queries.js
```

This should:
- ✅ Connect to database
- ✅ Create sample users
- ✅ Create sample salon
- ✅ Create appointments, reviews, promotions
- ✅ Run test queries

### 6️⃣ Start Development

```bash
npm run dev
```

Visit: http://localhost:5173

## 🎯 What You Get

Your database now includes these tables:

| Table | Records | Description |
|-------|---------|-------------|
| **plans** | 4 | Subscription plans (Free, Monthly, Semi-Annual, Annual) |
| **users** | 0 | User accounts (clients, salon owners, admins) |
| **salons** | 0 | Beauty salons and barbershops |
| **appointments** | 0 | Service bookings |
| **reviews** | 0 | Customer ratings and feedback |
| **promotions** | 0 | Special offers and discounts |
| **chat_messages** | 0 | Communication system |

Run `npm run db:seed` to populate with test data.

## 📊 Database Management

### View Database in Browser

```bash
npm run db:studio
```

Opens Prisma Studio at http://localhost:5555

### Common Commands

```bash
# Generate Prisma Client (after schema changes)
npm run db:generate

# Create new migration
npm run db:migrate

# Deploy migrations to production
npm run db:deploy

# Reset database (WARNING: deletes all data)
npm run db:reset

# Seed with example data
npm run db:seed
```

## 🔍 Troubleshooting

### "Cannot find module '@prisma/client'"

```bash
npm run db:generate
```

### "Database connection error"

1. Check your `DATABASE_URL` in `.env`
2. Verify database exists in Neon console
3. Ensure `sslmode=require` is in connection string
4. Test connection: `psql $DATABASE_URL`

### "Migration failed"

```bash
# Check migration status
npx prisma migrate status

# If stuck, reset and start fresh
npm run db:reset
```

### "Prisma Client is not generated"

```bash
rm -rf node_modules/.prisma
npm run db:generate
```

## 📚 Next Steps

1. **Read Full Documentation**: [DATABASE.md](./DATABASE.md)
2. **Learn Prisma**: [prisma/README.md](./prisma/README.md)
3. **Explore Examples**: `prisma/example-queries.js`
4. **API Functions**: `api/database.js`

## 🆘 Need Help?

- Check [DATABASE.md](./DATABASE.md) for detailed documentation
- View [Prisma Docs](https://www.prisma.io/docs)
- See [Neon Docs](https://neon.tech/docs)
- Open an issue on GitHub

---

**Setup Time**: ⏱️ ~5 minutes  
**Difficulty**: 🟢 Easy
