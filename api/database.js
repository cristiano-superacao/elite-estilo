/**
 * Database API with Prisma ORM Integration
 * Elite & Estilo - Beauty Salon Management System
 * 
 * This file provides database operations using Prisma Client
 * Can be used in Netlify Functions or Express routes
 */

import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// ====================================
// USER OPERATIONS
// ====================================

/**
 * Create a new user
 */
export async function createUser(data) {
  return await prisma.user.create({
    data: {
      email: data.email,
      password: data.password, // Should be hashed before storing
      name: data.name,
      phone: data.phone,
      role: data.role || 'CLIENT',
    },
  });
}

/**
 * Get user by email
 */
export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Get user by ID with relations
 */
export async function getUserById(id, includeRelations = false) {
  return await prisma.user.findUnique({
    where: { id },
    include: includeRelations ? {
      ownedSalons: true,
      appointments: true,
      reviews: true,
    } : undefined,
  });
}

// ====================================
// SALON OPERATIONS
// ====================================

/**
 * Get all salons with filters
 */
export async function getSalons(filters = {}) {
  const {
    city,
    isActive = true,
    isFeatured,
    search,
    skip = 0,
    take = 10,
  } = filters;

  const where = {
    isActive,
    ...(isFeatured !== undefined && { isFeatured }),
    ...(city && { city }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { services: { has: search } },
      ],
    }),
  };

  const [salons, total] = await Promise.all([
    prisma.salon.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        plan: true,
      },
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' },
      ],
      skip,
      take,
    }),
    prisma.salon.count({ where }),
  ]);

  return { salons, total };
}

/**
 * Get salon by ID with full details
 */
export async function getSalonById(id) {
  return await prisma.salon.findUnique({
    where: { id },
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
      reviews: {
        where: { isVisible: true },
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
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
}

/**
 * Create a new salon
 */
export async function createSalon(data) {
  return await prisma.salon.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image,
      address: data.address,
      city: data.city,
      state: data.state,
      phone: data.phone,
      whatsapp: data.whatsapp,
      hours: data.hours,
      services: data.services || [],
      prices: data.prices || {},
      specialties: data.specialties || [],
      amenities: data.amenities || [],
      ownerId: data.ownerId,
      planId: data.planId,
    },
  });
}

/**
 * Update salon
 */
export async function updateSalon(id, data) {
  return await prisma.salon.update({
    where: { id },
    data,
  });
}

// ====================================
// APPOINTMENT OPERATIONS
// ====================================

/**
 * Create appointment
 */
export async function createAppointment(data) {
  return await prisma.appointment.create({
    data: {
      salonId: data.salonId,
      userId: data.userId,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      clientEmail: data.clientEmail,
      service: data.service,
      date: new Date(data.date),
      time: data.time,
      duration: data.duration || 60,
      price: data.price,
      notes: data.notes,
    },
  });
}

/**
 * Get appointments for a salon
 */
export async function getSalonAppointments(salonId, filters = {}) {
  const { status, date, skip = 0, take = 20 } = filters;

  return await prisma.appointment.findMany({
    where: {
      salonId,
      ...(status && { status }),
      ...(date && { date: new Date(date) }),
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: [
      { date: 'desc' },
      { time: 'desc' },
    ],
    skip,
    take,
  });
}

/**
 * Get appointments for a user
 */
export async function getUserAppointments(userId, filters = {}) {
  const { status, skip = 0, take = 20 } = filters;

  return await prisma.appointment.findMany({
    where: {
      userId,
      ...(status && { status }),
    },
    include: {
      salon: {
        select: {
          id: true,
          name: true,
          address: true,
          city: true,
          phone: true,
          whatsapp: true,
        },
      },
    },
    orderBy: { date: 'desc' },
    skip,
    take,
  });
}

/**
 * Update appointment status
 */
export async function updateAppointmentStatus(id, status, cancelledBy = null) {
  return await prisma.appointment.update({
    where: { id },
    data: {
      status,
      ...(status === 'CANCELLED' && {
        cancelledAt: new Date(),
        cancelledBy,
      }),
    },
  });
}

// ====================================
// REVIEW OPERATIONS
// ====================================

/**
 * Create review
 */
export async function createReview(data) {
  return await prisma.review.create({
    data: {
      salonId: data.salonId,
      userId: data.userId,
      rating: data.rating,
      comment: data.comment,
      service: data.service,
    },
  });
}

/**
 * Get reviews for a salon
 */
export async function getSalonReviews(salonId, filters = {}) {
  const { skip = 0, take = 10 } = filters;

  return await prisma.review.findMany({
    where: {
      salonId,
      isVisible: true,
    },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    skip,
    take,
  });
}

// ====================================
// PROMOTION OPERATIONS
// ====================================

/**
 * Create promotion
 */
export async function createPromotion(data) {
  return await prisma.promotion.create({
    data: {
      salonId: data.salonId,
      title: data.title,
      description: data.description,
      type: data.type,
      value: data.value,
      code: data.code,
      services: data.services || [],
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      maxUses: data.maxUses,
    },
  });
}

/**
 * Get active promotions
 */
export async function getActivePromotions(salonId = null) {
  const now = new Date();

  return await prisma.promotion.findMany({
    where: {
      ...(salonId && { salonId }),
      isActive: true,
      startDate: { lte: now },
      endDate: { gte: now },
    },
    include: {
      salon: {
        select: {
          id: true,
          name: true,
          city: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

// ====================================
// CHAT OPERATIONS
// ====================================

/**
 * Send chat message
 */
export async function sendChatMessage(data) {
  return await prisma.chatMessage.create({
    data: {
      senderId: data.senderId,
      salonId: data.salonId,
      message: data.message,
      attachment: data.attachment,
    },
  });
}

/**
 * Get chat messages between user and salon
 */
export async function getChatMessages(salonId, userId, limit = 50) {
  return await prisma.chatMessage.findMany({
    where: {
      salonId,
      OR: [
        { senderId: userId },
        // Messages from salon owner would need salon owner check
      ],
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
    take: limit,
  });
}

/**
 * Mark messages as read
 */
export async function markMessagesAsRead(salonId, userId) {
  return await prisma.chatMessage.updateMany({
    where: {
      salonId,
      senderId: { not: userId },
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
}

// ====================================
// PLAN OPERATIONS
// ====================================

/**
 * Get all plans
 */
export async function getPlans() {
  return await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { price: 'asc' },
  });
}

/**
 * Get plan by type
 */
export async function getPlanByType(type) {
  return await prisma.plan.findUnique({
    where: { type },
  });
}

// ====================================
// STATISTICS & ANALYTICS
// ====================================

/**
 * Get salon statistics
 */
export async function getSalonStats(salonId) {
  const [
    totalAppointments,
    pendingAppointments,
    completedAppointments,
    averageRating,
    totalReviews,
  ] = await Promise.all([
    prisma.appointment.count({ where: { salonId } }),
    prisma.appointment.count({ where: { salonId, status: 'PENDING' } }),
    prisma.appointment.count({ where: { salonId, status: 'COMPLETED' } }),
    prisma.review.aggregate({
      where: { salonId, isVisible: true },
      _avg: { rating: true },
    }),
    prisma.review.count({ where: { salonId, isVisible: true } }),
  ]);

  return {
    totalAppointments,
    pendingAppointments,
    completedAppointments,
    averageRating: averageRating._avg.rating || 0,
    totalReviews,
  };
}

// Export prisma instance for direct usage if needed
export { prisma };

// Disconnect on app shutdown
export async function disconnectDatabase() {
  await prisma.$disconnect();
}
