import { prisma } from "./prisma"

export const result = {
    create: async ({
        quizId,
        userId,
        score
    }) => (
        await prisma.result.create({
            data: {
                score,
                userId,
                quizId
            }
        })
    ),
    listByUser: async (userId) => (
        await prisma.result.findMany({
            where: {
                userId
            },
            select: {
                id: true,
                score: true,
                quiz: {
                    select: {
                        title: true
                    }
                },
                date: true
            }
        })
    )
}