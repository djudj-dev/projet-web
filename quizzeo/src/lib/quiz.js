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
                status: "Draft",
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
                    status
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
                    status: true
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
                    status: true,
                    creator: true,
                    results: true,
                    date: true,
                }
            }
        )
    ),
    getAll: async() => (
        await prisma.quiz.findMany(
            {
                select: {
                    id: true,
                    title: true,
                    enabled: true,
                    creator: true,
                    questions: true,
                }
            }
        )
    ),
}