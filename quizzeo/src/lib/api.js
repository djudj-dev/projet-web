import { prisma } from './prisma';
import { generateApiKey } from "./crypto-tools"


export const api = {
    createApiKey: async (userId) => (
        await prisma.apiKey.create({
            data: {
                apiKey: await generateApiKey(),
                userId
            }
        })
    ),
    checkApiKey: async (apiKey) => (
        await prisma.apiKey.findUnique({
            where: {
                apiKey,
            },
            select: {
                userId: true
            },
        
        })
    )
}
