import { prisma } from "./prisma"

export const quiz = {
    create: async({
        title,
        creatorId
    }) => (
        await prisma.quiz.create({
            data: {
                title,
                creatorId,
                enabled: false,
            }
        })
    ),
    changeQuizStatus: async(quizId, status) => (
        await prisma.quiz.update(
            {
                where: {
                    id: quizId
                },
                data: {
                    enabled: status
                }
            }
        )
    ),
    getWithQuestion: async(quizId) => (
        await prisma.quiz.findUnique(
            {
                where: {
                    id: quizId
                },
                select: {
                    questions: true,
                    title: true,
                    id: true,
                    creator: true,
                    enabled: true
                }
            }
        )
    ),
    getByCreator: async(userId) => (
        await prisma.quiz.findMany(
            {
                where: {
                    creatorId: userId
                },
                select: {
                    id: true,
                    title: true,
                    enabled: true,
                    creator: true,
                    questions: true,
                }
            }
        )
    )
}