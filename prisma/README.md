# Prisma Setup Guide - Elite & Estilo

This directory contains the Prisma schema and related database files for the Elite & Estilo project.

## 📁 Directory Structure

```
prisma/
├── schema.prisma          # Prisma schema definition
├── migrations/
│   └── init.sql          # Complete SQL migration
├── example-queries.js     # Example database operations
└── README.md             # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs `prisma` and `@prisma/client` as defined in package.json.

### 2. Configure Database Connection

Create a `.env` file in the project root with your Neon database URL:

```env
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech:5432/dbname?sslmode=require"
```

### 3. Run Database Migration

**Option A: Using Prisma Migrate (Recommended)**

```bash
# Create initial migration
npx prisma migrate dev --name init

# This will:
# - Create migration files
# - Apply migrations to database
# - Generate Prisma Client
```

**Option B: Using Raw SQL**

```bash
# Run the SQL file directly on your Neon database
psql $DATABASE_URL < prisma/migrations/init.sql

# Then generate Prisma Client
npx prisma generate
```

### 4. Test Your Setup

```bash
# Run example queries
node prisma/example-queries.js
```

## 📊 Database Schema

The schema includes:

- **Users**: Authentication and user management
- **Salons**: Beauty salon information
- **Plans**: Subscription plans
- **Appointments**: Service bookings
- **Reviews**: Customer ratings and feedback
- **Promotions**: Special offers and discounts
- **Chat Messages**: Communication system

See `DATABASE.md` in the project root for detailed schema documentation.

## 🛠️ Common Commands

### Generate Prisma Client

After any schema changes:

```bash
npx prisma generate
```

### Create a New Migration

```bash
npx prisma migrate dev --name your_migration_name
```

### Apply Migrations in Production

```bash
npx prisma migrate deploy
```

### Open Prisma Studio

Visual database browser:

```bash
npx prisma studio
```

### Reset Database

**Warning: This deletes all data!**

```bash
npx prisma migrate reset
```

### Pull Schema from Database

If database was changed manually:

```bash
npx prisma db pull
```

### Push Schema without Migration

For prototyping (not recommended for production):

```bash
npx prisma db push
```

## 📝 Usage Examples

### In Your API Code

```javascript
import prisma from '../src/lib/prisma.js';

// Get all salons
const salons = await prisma.salon.findMany({
  where: { isActive: true },
  include: { owner: true, reviews: true },
});

// Create appointment
const appointment = await prisma.appointment.create({
  data: {
    salonId: 'salon_123',
    userId: 'user_456',
    clientName: 'John Doe',
    service: 'Haircut',
    date: new Date('2025-11-01'),
    time: '14:00',
  },
});
```

### Using Helper Functions

```javascript
import { getSalons, createAppointment } from '../api/database.js';

// Get salons with filters
const { salons, total } = await getSalons({
  city: 'Salvador',
  search: 'barber',
  skip: 0,
  take: 10,
});

// Create appointment
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

## 🔄 Schema Updates

When you modify `schema.prisma`:

1. **Create Migration**
   ```bash
   npx prisma migrate dev --name describe_your_changes
   ```

2. **Review Migration SQL**
   - Check `prisma/migrations/[timestamp]_describe_your_changes/migration.sql`

3. **Test Locally**
   - Verify the migration works
   - Test your queries

4. **Deploy to Production**
   ```bash
   npx prisma migrate deploy
   ```

## 🎯 Sample Data

The migration includes sample subscription plans:
- Free Trial (7 days)
- Monthly Plan
- Semi-Annual Plan
- Annual Plan

To add more sample data, run:

```bash
node prisma/example-queries.js
```

This creates:
- Test users (client and salon owner)
- Test salon
- Test appointment
- Test review
- Test promotion

## 🔍 Debugging

### View Generated SQL

Enable query logging in your Prisma Client:

```javascript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

### Check Connection

```bash
npx prisma db pull
```

If this fails, check your `DATABASE_URL` in `.env`.

### Clear Generated Client

If you encounter issues:

```bash
rm -rf node_modules/.prisma
npx prisma generate
```

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Neon Documentation](https://neon.tech/docs)

## ⚠️ Important Notes

1. **Never commit `.env` files** - They contain sensitive database credentials
2. **Always backup before migrations** - Especially in production
3. **Test migrations locally first** - Before deploying to production
4. **Use transactions** - For operations that must succeed or fail together
5. **Connection pooling** - Neon handles this automatically

## 🆘 Troubleshooting

### "Cannot find module '@prisma/client'"

```bash
npx prisma generate
```

### "Database connection error"

Check your `DATABASE_URL` in `.env` and ensure:
- Credentials are correct
- Database exists
- Network access is allowed
- SSL mode is set to `require` for Neon

### "Migration failed"

```bash
# See migration status
npx prisma migrate status

# Resolve failed migrations
npx prisma migrate resolve --applied [migration_name]
```

---

**Need help?** Check `DATABASE.md` for comprehensive documentation.
