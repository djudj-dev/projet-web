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
            }
        })
    ),
    changeQuizStatus: async({ quizId, status, userId }) => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            return false
        }

        if (user.role === "User" || user.role === "UserAdmin") {
            return false;
        }

        if (user.role === "QuizAdmin" && status) {
            return false
        }

        return await prisma.quiz.update(
            {
                where: {
                    id: quizId
                },
                data: {
                    enabled: status
                }
            }
        )
    },
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
    getByCreator: async(userId) => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            return false
        }

        if(user.role == "QuizAdmin" || user.role == "GlobalAdmin") {
            return await prisma.quiz.findMany(
                {
                    select: {
                        id: true,
                        title: true,
                        enabled: true,
                        creator: true,
                        results: true,
                        date: true,
                    }
                }
            )
        }

        return await prisma.quiz.findMany(
            {
                where: {
                    creatorId: userId
                },
                select: {
                    id: true,
                    title: true,
                    enabled: true,
                    creator: true,
                    results: true,
                    date: true,
                }
            }
        )
    },
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