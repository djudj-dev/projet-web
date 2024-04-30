import { prisma } from "./prisma"

const result = {
    create: async({
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

}