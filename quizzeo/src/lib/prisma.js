import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    let prisma;

    if (!prisma) {
        prisma = new PrismaClient()
    }
  return prisma
}

export const prisma = prismaClientSingleton()