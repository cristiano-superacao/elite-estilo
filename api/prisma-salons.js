/**
 * Netlify Function with Prisma ORM Integration
 * Elite & Estilo - Salons API Endpoint
 * 
 * This serverless function provides salon-related operations using Prisma
 * Endpoint: /.netlify/functions/prisma-salons
 */

import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});

/**
 * Netlify Function Handler
 */
export async function handler(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/prisma-salons', '');
    const method = event.httpMethod;

    // Parse query parameters
    const params = event.queryStringParameters || {};

    // Route handling
    switch (method) {
      case 'GET':
        if (path === '' || path === '/') {
          return await listSalons(params, headers);
        } else if (path.match(/^\/[a-zA-Z0-9_-]+$/)) {
          const id = path.substring(1);
          return await getSalonById(id, headers);
        }
        break;

      case 'POST':
        if (path === '' || path === '/') {
          const body = JSON.parse(event.body || '{}');
          return await createSalon(body, headers);
        }
        break;

      case 'PUT':
        if (path.match(/^\/[a-zA-Z0-9_-]+$/)) {
          const id = path.substring(1);
          const body = JSON.parse(event.body || '{}');
          return await updateSalon(id, body, headers);
        }
        break;

      case 'DELETE':
        if (path.match(/^\/[a-zA-Z0-9_-]+$/)) {
          const id = path.substring(1);
          return await deleteSalon(id, headers);
        }
        break;
    }

    // Route not found
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Route not found' }),
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
      }),
    };
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * List salons with filters and pagination
 */
async function listSalons(params, headers) {
  const {
    city,
    search,
    featured,
    skip = 0,
    take = 10,
  } = params;

  const where = {
    isActive: true,
    ...(city && { city }),
    ...(featured === 'true' && { isFeatured: true }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
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
        _count: {
          select: {
            reviews: true,
            appointments: true,
          },
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' },
      ],
      skip: parseInt(skip),
      take: parseInt(take),
    }),
    prisma.salon.count({ where }),
  ]);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      salons,
      total,
      page: Math.floor(skip / take) + 1,
      totalPages: Math.ceil(total / take),
    }),
  };
}

/**
 * Get salon by ID with full details
 */
async function getSalonById(id, headers) {
  const salon = await prisma.salon.findUnique({
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
      appointments: {
        where: {
          date: { gte: new Date() },
          status: 'CONFIRMED',
        },
        select: {
          date: true,
          time: true,
        },
        orderBy: { date: 'asc' },
        take: 20,
      },
    },
  });

  if (!salon) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Salon not found' }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(salon),
  };
}

/**
 * Create new salon
 */
async function createSalon(data, headers) {
  const salon = await prisma.salon.create({
    data: {
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
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
    include: {
      owner: true,
      plan: true,
    },
  });

  return {
    statusCode: 201,
    headers,
    body: JSON.stringify(salon),
  };
}

/**
 * Update salon
 */
async function updateSalon(id, data, headers) {
  const salon = await prisma.salon.update({
    where: { id },
    data,
    include: {
      owner: true,
      plan: true,
    },
  });

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(salon),
  };
}

/**
 * Delete salon (soft delete by setting isActive to false)
 */
async function deleteSalon(id, headers) {
  const salon = await prisma.salon.update({
    where: { id },
    data: { isActive: false },
  });

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: 'Salon deleted successfully', salon }),
  };
}
