# 📊 Database Schema Reference - Elite & Estilo

Visual reference for the complete database structure.

## 🏗️ Entity Relationship Overview

```
┌─────────────────┐
│     USERS       │
│  (Authentication)│
└────────┬────────┘
         │
         │ owns (1:N)
         │
         ▼
┌─────────────────┐      ┌─────────────────┐
│     SALONS      │◄─────┤     PLANS       │
│   (Businesses)  │ (N:1)│ (Subscriptions) │
└────────┬────────┘      └─────────────────┘
         │
         │ has many (1:N)
         ├─────────────┬──────────────┬──────────────┐
         ▼             ▼              ▼              ▼
┌─────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│APPOINTMENTS │  │ REVIEWS  │  │PROMOTIONS│  │   CHAT   │
│  (Bookings) │  │ (Ratings)│  │ (Offers) │  │(Messages)│
└─────────────┘  └──────────┘  └──────────┘  └──────────┘
      ▲               ▲                             ▲
      │               │                             │
      └───────────────┴─────────────────────────────┘
                      │
                    (N:1) created by
                      │
              ┌───────┴────────┐
              │     USERS      │
              └────────────────┘
```

## 📋 Table Details

### 1. USERS

**Purpose:** User accounts for clients, salon owners, and admins

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | TEXT | Unique identifier | PRIMARY KEY, CUID |
| email | TEXT | Email address | UNIQUE, NOT NULL |
| password | TEXT | Hashed password | NOT NULL |
| name | TEXT | Full name | NOT NULL |
| phone | TEXT | Phone number | OPTIONAL |
| avatar | TEXT | Profile picture URL | OPTIONAL |
| role | ENUM | User role | DEFAULT 'CLIENT' |
| isActive | BOOLEAN | Account status | DEFAULT true |
| emailVerified | BOOLEAN | Email verification | DEFAULT false |
| favoriteIds | TEXT[] | Favorite salon IDs | DEFAULT [] |
| createdAt | TIMESTAMP | Creation date | AUTO |
| updatedAt | TIMESTAMP | Last update | AUTO |

**Indexes:** email, role  
**Roles:** CLIENT, SALON_OWNER, ADMIN

---

### 2. SALONS

**Purpose:** Beauty salons and barbershops

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | TEXT | Unique identifier | PRIMARY KEY, CUID |
| name | TEXT | Salon name | NOT NULL |
| slug | TEXT | URL-friendly name | UNIQUE, NOT NULL |
| description | TEXT | About the salon | OPTIONAL |
| image | TEXT | Main photo URL | OPTIONAL |
| address | TEXT | Street address | NOT NULL |
| city | TEXT | City | NOT NULL |
| state | TEXT | State/Province | OPTIONAL |
| zipCode | TEXT | Postal code | OPTIONAL |
| latitude | FLOAT | GPS latitude | OPTIONAL |
| longitude | FLOAT | GPS longitude | OPTIONAL |
| phone | TEXT | Phone number | NOT NULL |
| whatsapp | TEXT | WhatsApp number | OPTIONAL |
| email | TEXT | Contact email | OPTIONAL |
| website | TEXT | Website URL | OPTIONAL |
| hours | TEXT | Opening hours JSON | NOT NULL |
| services | TEXT[] | Service list | DEFAULT [] |
| prices | JSON | Service prices | OPTIONAL |
| specialties | TEXT[] | Specializations | DEFAULT [] |
| amenities | TEXT[] | Facilities | DEFAULT [] |
| badge | TEXT | Featured badge | OPTIONAL |
| color | TEXT | Brand color | OPTIONAL |
| rating | FLOAT | Average rating | DEFAULT 0 |
| reviewCount | INT | Number of reviews | DEFAULT 0 |
| isActive | BOOLEAN | Active status | DEFAULT true |
| isFeatured | BOOLEAN | Featured status | DEFAULT false |
| planId | TEXT | Subscription plan | FK → plans.id |
| ownerId | TEXT | Salon owner | FK → users.id |
| createdAt | TIMESTAMP | Creation date | AUTO |
| updatedAt | TIMESTAMP | Last update | AUTO |

**Indexes:** slug, city, ownerId, planId, name (full-text), description (full-text)

---

### 3. PLANS

**Purpose:** Subscription plans for salons

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | TEXT | Unique identifier | PRIMARY KEY, CUID |
| name | TEXT | Plan name | NOT NULL |
| type | ENUM | Plan type | UNIQUE, NOT NULL |
| description | TEXT | Plan details | OPTIONAL |
| price | FLOAT | Monthly price | NOT NULL |
| originalPrice | FLOAT | Before discount | OPTIONAL |
| duration | INT | Days duration | NOT NULL |
| features | TEXT[] | Feature list | DEFAULT [] |
| maxAppointments | INT | Booking limit | DEFAULT -1 (unlimited) |
| maxPhotos | INT | Photo limit | DEFAULT 10 |
| hasPriority | BOOLEAN | Priority support | DEFAULT false |
| hasAnalytics | BOOLEAN | Analytics access | DEFAULT false |
| hasPromotion | BOOLEAN | Can create promos | DEFAULT false |
| isActive | BOOLEAN | Active status | DEFAULT true |
| discount | INT | Discount % | DEFAULT 0 |
| createdAt | TIMESTAMP | Creation date | AUTO |
| updatedAt | TIMESTAMP | Last update | AUTO |

**Indexes:** type  
**Types:** FREE_TRIAL, MONTHLY, SEMI_ANNUAL, ANNUAL

**Pre-seeded Plans:**
- 🆓 Free Trial - 7 days, R$ 0
- 📅 Monthly - 30 days, R$ 49.90
- 📆 Semi-Annual - 180 days, R$ 239.90 (50% off)
- 📅 Annual - 365 days, R$ 399.90 (58% off)

---

### 4. APPOINTMENTS

**Purpose:** Service bookings

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | TEXT | Unique identifier | PRIMARY KEY, CUID |
| salonId | TEXT | Related salon | FK → salons.id |
| userId | TEXT | Client | FK → users.id |
| clientName | TEXT | Client name | NOT NULL |
| clientPhone | TEXT | Contact phone | NOT NULL |
| clientEmail | TEXT | Contact email | OPTIONAL |
| service | TEXT | Service name | NOT NULL |
| date | TIMESTAMP | Appointment date | NOT NULL |
| time | TEXT | Time slot | NOT NULL |
| duration | INT | Minutes | DEFAULT 60 |
| price | FLOAT | Service price | OPTIONAL |
| status | ENUM | Current status | DEFAULT 'PENDING' |
| notes | TEXT | Additional notes | OPTIONAL |
| cancelledAt | TIMESTAMP | Cancellation date | OPTIONAL |
| cancelledBy | TEXT | Who cancelled | OPTIONAL |
| createdAt | TIMESTAMP | Creation date | AUTO |
| updatedAt | TIMESTAMP | Last update | AUTO |

**Indexes:** salonId, userId, date, status  
**Status:** PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW

---

### 5. REVIEWS

**Purpose:** Customer ratings and feedback

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | TEXT | Unique identifier | PRIMARY KEY, CUID |
| salonId | TEXT | Reviewed salon | FK → salons.id |
| userId | TEXT | Reviewer | FK → users.id |
| rating | INT | Star rating | 1-5, NOT NULL |
| comment | TEXT | Review text | OPTIONAL |
| service | TEXT | Service reviewed | OPTIONAL |
| isVisible | BOOLEAN | Public visibility | DEFAULT true |
| createdAt | TIMESTAMP | Creation date | AUTO |
| updatedAt | TIMESTAMP | Last update | AUTO |

**Indexes:** salonId, userId, rating  
**Trigger:** Auto-updates salon.rating and salon.reviewCount

---

### 6. PROMOTIONS

**Purpose:** Special offers and discounts

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | TEXT | Unique identifier | PRIMARY KEY, CUID |
| salonId | TEXT | Related salon | FK → salons.id |
| title | TEXT | Promotion title | NOT NULL |
| description | TEXT | Details | NOT NULL |
| type | ENUM | Discount type | NOT NULL |
| value | FLOAT | Discount amount/% | NOT NULL |
| code | TEXT | Promo code | UNIQUE, OPTIONAL |
| services | TEXT[] | Applicable services | DEFAULT [] |
| startDate | TIMESTAMP | Start date | NOT NULL |
| endDate | TIMESTAMP | End date | NOT NULL |
| isActive | BOOLEAN | Active status | DEFAULT true |
| maxUses | INT | Usage limit | OPTIONAL |
| currentUses | INT | Times used | DEFAULT 0 |
| createdAt | TIMESTAMP | Creation date | AUTO |
| updatedAt | TIMESTAMP | Last update | AUTO |

**Indexes:** salonId, code, startDate, endDate  
**Types:** PERCENTAGE, FIXED, SPECIAL

---

### 7. CHAT_MESSAGES

**Purpose:** User-salon communication

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| id | TEXT | Unique identifier | PRIMARY KEY, CUID |
| senderId | TEXT | Message sender | FK → users.id |
| salonId | TEXT | Target salon | NOT NULL |
| message | TEXT | Message content | NOT NULL |
| isRead | BOOLEAN | Read status | DEFAULT false |
| attachment | TEXT | File URL | OPTIONAL |
| createdAt | TIMESTAMP | Creation date | AUTO |
| updatedAt | TIMESTAMP | Last update | AUTO |

**Indexes:** senderId, salonId, createdAt

---

## 🔗 Relationships

```
users.id ──────────────► salons.ownerId (1:N)
plans.id ──────────────► salons.planId (1:N)
salons.id ─────────────► appointments.salonId (1:N)
users.id ──────────────► appointments.userId (1:N)
salons.id ─────────────► reviews.salonId (1:N)
users.id ──────────────► reviews.userId (1:N)
salons.id ─────────────► promotions.salonId (1:N)
users.id ──────────────► chat_messages.senderId (1:N)
```

## 🎨 Data Types

### ENUMs
```sql
UserRole: CLIENT | SALON_OWNER | ADMIN
PlanType: FREE_TRIAL | MONTHLY | SEMI_ANNUAL | ANNUAL
AppointmentStatus: PENDING | CONFIRMED | CANCELLED | COMPLETED | NO_SHOW
PromotionType: PERCENTAGE | FIXED | SPECIAL
```

### Special Types
- **CUID**: Collision-resistant unique identifier
- **JSONB**: Binary JSON (PostgreSQL)
- **TEXT[]**: Array of text strings
- **TIMESTAMP(3)**: Timestamp with millisecond precision

## ⚡ Performance Features

### Indexes (25+)
- Primary keys on all tables
- Unique constraints on emails, slugs, promo codes
- Foreign key indexes
- Search indexes on name and description (GIN)
- Date indexes for appointments and promotions

### Triggers
1. **update_salon_rating()**: Auto-calculates rating when reviews change
2. **update_updated_at()**: Auto-updates timestamp on record changes

### Cascading
- ON DELETE CASCADE: Deleting salon removes its appointments, reviews, promotions
- ON DELETE CASCADE: Deleting user removes their appointments, reviews, messages
- ON DELETE SET NULL: Deleting plan sets salon.planId to null

## 📦 Storage Estimates

| Table | Avg Row Size | 1K Records | 10K Records | 100K Records |
|-------|-------------|-----------|------------|--------------|
| users | ~500 bytes | 500 KB | 5 MB | 50 MB |
| salons | ~2 KB | 2 MB | 20 MB | 200 MB |
| plans | ~500 bytes | 500 KB | 5 MB | 50 MB |
| appointments | ~400 bytes | 400 KB | 4 MB | 40 MB |
| reviews | ~300 bytes | 300 KB | 3 MB | 30 MB |
| promotions | ~400 bytes | 400 KB | 4 MB | 40 MB |
| chat_messages | ~300 bytes | 300 KB | 3 MB | 30 MB |

## 🔐 Security Constraints

- ✅ All passwords must be hashed (bcrypt/argon2)
- ✅ Unique email addresses enforced
- ✅ Unique salon slugs enforced
- ✅ Rating between 1-5 enforced
- ✅ Timestamps auto-managed
- ✅ Foreign key integrity enforced
- ✅ Cascade deletes configured

## 📚 Additional Resources

- Complete documentation: [DATABASE.md](./DATABASE.md)
- Prisma guide: [prisma/README.md](./prisma/README.md)
- Quick start: [QUICKSTART_DATABASE.md](./QUICKSTART_DATABASE.md)
- Implementation details: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

**Schema Version:** 1.0.0  
**Last Updated:** 2025-10-29  
**Status:** ✅ Production Ready
