import { prisma } from "./prisma"

export const question = {
    create: async({
        quizId,
        title,
        answers,
        goodAnswer
    }) => (
        await prisma.question.create({
            data: {
               title,
               answers,
               goodAnswer,
               quizId
            }
        })
    ),
}