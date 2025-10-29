/**
 * Example Database Queries using Prisma
 * Elite & Estilo - Beauty Salon Management System
 * 
 * This file contains example queries to test the database connection
 * and demonstrate common operations.
 * 
 * Run with: node prisma/example-queries.js
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// ====================================
// EXAMPLE QUERIES
// ====================================

/**
 * Example 1: Get all plans
 */
async function getAllPlans() {
  console.log('\n📋 Getting all subscription plans...');
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { price: 'asc' },
  });
  console.log(`Found ${plans.length} plans:`, plans);
  return plans;
}

/**
 * Example 2: Create a test user
 */
async function createTestUser() {
  console.log('\n👤 Creating test user...');
  
  try {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'hashed_password_here', // In production, use bcrypt
        name: 'Test User',
        phone: '71999999999',
        role: 'CLIENT',
      },
    });
    console.log('User created:', user);
    return user;
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('User already exists, fetching...');
      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      });
      return user;
    }
    throw error;
  }
}

/**
 * Example 3: Create a test salon owner
 */
async function createTestSalonOwner() {
  console.log('\n🏪 Creating test salon owner...');
  
  try {
    const owner = await prisma.user.create({
      data: {
        email: 'owner@example.com',
        password: 'hashed_password_here',
        name: 'Salon Owner',
        phone: '71988888888',
        role: 'SALON_OWNER',
      },
    });
    console.log('Salon owner created:', owner);
    return owner;
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('Owner already exists, fetching...');
      const owner = await prisma.user.findUnique({
        where: { email: 'owner@example.com' },
      });
      return owner;
    }
    throw error;
  }
}

/**
 * Example 4: Create a test salon
 */
async function createTestSalon(ownerId, planId) {
  console.log('\n💈 Creating test salon...');
  
  try {
    const salon = await prisma.salon.create({
      data: {
        name: 'Barbearia Teste',
        slug: 'barbearia-teste',
        description: 'Uma barbearia de teste para demonstração',
        address: 'Rua Teste, 123',
        city: 'Salvador',
        state: 'BA',
        zipCode: '40000-000',
        phone: '7133334444',
        whatsapp: '71999998888',
        hours: '{"mon-fri": "09:00-18:00", "sat": "09:00-14:00"}',
        services: ['Corte de cabelo', 'Barba', 'Sobrancelha'],
        prices: {
          'Corte de cabelo': 45.00,
          'Barba': 30.00,
          'Sobrancelha': 15.00,
        },
        specialties: ['Cortes modernos', 'Barbas desenhadas'],
        amenities: ['WiFi', 'Estacionamento', 'Ar condicionado'],
        badge: 'Premium',
        color: 'purple',
        ownerId: ownerId,
        planId: planId,
      },
      include: {
        owner: true,
        plan: true,
      },
    });
    console.log('Salon created:', salon);
    return salon;
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('Salon already exists, fetching...');
      const salon = await prisma.salon.findUnique({
        where: { slug: 'barbearia-teste' },
        include: { owner: true, plan: true },
      });
      return salon;
    }
    throw error;
  }
}

/**
 * Example 5: Create an appointment
 */
async function createTestAppointment(salonId, userId) {
  console.log('\n📅 Creating test appointment...');
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const appointment = await prisma.appointment.create({
    data: {
      salonId: salonId,
      userId: userId,
      clientName: 'Test User',
      clientPhone: '71999999999',
      clientEmail: 'test@example.com',
      service: 'Corte de cabelo',
      date: tomorrow,
      time: '10:00',
      duration: 60,
      price: 45.00,
      status: 'PENDING',
    },
    include: {
      salon: true,
      user: true,
    },
  });
  console.log('Appointment created:', appointment);
  return appointment;
}

/**
 * Example 6: Create a review
 */
async function createTestReview(salonId, userId) {
  console.log('\n⭐ Creating test review...');
  
  const review = await prisma.review.create({
    data: {
      salonId: salonId,
      userId: userId,
      rating: 5,
      comment: 'Excelente serviço! Muito profissional e atencioso.',
      service: 'Corte de cabelo',
    },
    include: {
      salon: true,
      user: true,
    },
  });
  console.log('Review created:', review);
  return review;
}

/**
 * Example 7: Create a promotion
 */
async function createTestPromotion(salonId) {
  console.log('\n🎉 Creating test promotion...');
  
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  
  const promotion = await prisma.promotion.create({
    data: {
      salonId: salonId,
      title: 'Desconto de Inauguração',
      description: '20% de desconto em todos os serviços',
      type: 'PERCENTAGE',
      value: 20,
      code: 'INAUGURA20',
      services: ['Corte de cabelo', 'Barba'],
      startDate: startDate,
      endDate: endDate,
      isActive: true,
      maxUses: 100,
    },
    include: {
      salon: true,
    },
  });
  console.log('Promotion created:', promotion);
  return promotion;
}

/**
 * Example 8: Search salons
 */
async function searchSalons(searchTerm) {
  console.log(`\n🔍 Searching salons with term: "${searchTerm}"...`);
  
  const salons = await prisma.salon.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { city: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ],
      isActive: true,
    },
    include: {
      owner: {
        select: {
          name: true,
          phone: true,
        },
      },
    },
  });
  console.log(`Found ${salons.length} salons:`, salons);
  return salons;
}

/**
 * Example 9: Get salon with full details
 */
async function getSalonDetails(salonId) {
  console.log('\n🏪 Getting salon details...');
  
  const salon = await prisma.salon.findUnique({
    where: { id: salonId },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      plan: true,
      appointments: {
        where: {
          date: { gte: new Date() },
        },
        orderBy: { date: 'asc' },
        take: 5,
      },
      reviews: {
        where: { isVisible: true },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      promotions: {
        where: {
          isActive: true,
          startDate: { lte: new Date() },
          endDate: { gte: new Date() },
        },
      },
    },
  });
  console.log('Salon details:', salon);
  return salon;
}

/**
 * Example 10: Get user appointments
 */
async function getUserAppointments(userId) {
  console.log('\n📅 Getting user appointments...');
  
  const appointments = await prisma.appointment.findMany({
    where: { userId },
    include: {
      salon: {
        select: {
          name: true,
          address: true,
          city: true,
          phone: true,
        },
      },
    },
    orderBy: { date: 'desc' },
  });
  console.log(`Found ${appointments.length} appointments:`, appointments);
  return appointments;
}

/**
 * Example 11: Get salon statistics
 */
async function getSalonStats(salonId) {
  console.log('\n📊 Getting salon statistics...');
  
  const [
    totalAppointments,
    pendingAppointments,
    completedAppointments,
    totalReviews,
    averageRating,
  ] = await Promise.all([
    prisma.appointment.count({ where: { salonId } }),
    prisma.appointment.count({ where: { salonId, status: 'PENDING' } }),
    prisma.appointment.count({ where: { salonId, status: 'COMPLETED' } }),
    prisma.review.count({ where: { salonId, isVisible: true } }),
    prisma.review.aggregate({
      where: { salonId, isVisible: true },
      _avg: { rating: true },
    }),
  ]);
  
  const stats = {
    totalAppointments,
    pendingAppointments,
    completedAppointments,
    totalReviews,
    averageRating: averageRating._avg.rating || 0,
  };
  
  console.log('Salon statistics:', stats);
  return stats;
}

// ====================================
// RUN ALL EXAMPLES
// ====================================

async function runExamples() {
  try {
    console.log('🚀 Starting database example queries...\n');
    console.log('=' .repeat(60));
    
    // 1. Get plans
    const plans = await getAllPlans();
    const plan = plans[0]; // Use first plan
    
    // 2. Create test user
    const user = await createTestUser();
    
    // 3. Create test salon owner
    const owner = await createTestSalonOwner();
    
    // 4. Create test salon
    const salon = await createTestSalon(owner.id, plan?.id);
    
    // 5. Create appointment
    const appointment = await createTestAppointment(salon.id, user.id);
    
    // 6. Create review
    const review = await createTestReview(salon.id, user.id);
    
    // 7. Create promotion
    const promotion = await createTestPromotion(salon.id);
    
    // 8. Search salons
    await searchSalons('teste');
    
    // 9. Get salon details
    await getSalonDetails(salon.id);
    
    // 10. Get user appointments
    await getUserAppointments(user.id);
    
    // 11. Get salon stats
    await getSalonStats(salon.id);
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ All example queries completed successfully!');
    
  } catch (error) {
    console.error('❌ Error running examples:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples()
    .then(() => {
      console.log('\n✨ Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Fatal error:', error);
      process.exit(1);
    });
}

export {
  getAllPlans,
  createTestUser,
  createTestSalonOwner,
  createTestSalon,
  createTestAppointment,
  createTestReview,
  createTestPromotion,
  searchSalons,
  getSalonDetails,
  getUserAppointments,
  getSalonStats,
};
