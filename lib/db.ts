// lib/db.ts
import { PrismaClient } from '@/lib/generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const dbConn =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // Optional for debugging
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = dbConn;
