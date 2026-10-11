import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'

const globalForPrisma = globalThis as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL ?? 'postgresql://moon:moon@localhost:5432/moon?schema=public',
  }),
})

// Reuse the connection pool when Vite reloads server modules.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
