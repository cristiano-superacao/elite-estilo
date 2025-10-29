/**
 * Prisma Client Instance for Elite & Estilo
 * 
 * This file creates and exports a singleton Prisma Client instance
 * to be used across the application for database operations.
 * 
 * Usage:
 * import prisma from './lib/prisma';
 * const users = await prisma.user.findMany();
 */

import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
