// Singleton do Prisma Client para evitar múltiplas instâncias
import { PrismaClient } from '@prisma/client'

// Variável global para armazenar a instância
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

// Cria a instância se ainda não existir
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

// Guarda a instância em desenvolvimento para reusar entre reloads
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
