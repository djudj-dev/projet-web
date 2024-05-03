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
    getByCreator: async (userId) => {
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
    getAll: async () => (
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
    getByApiKey: async ({ userId, quizId }) => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
                enabled: true,
            }
        })

        if(!user) {
            return false
        }

        const quiz = await prisma.quiz.findUnique({
            where: {
                id: quizId,
            },
            select: {
                creatorId: true,
                title: true,
                enabled: true,
                date: true,
                results: true,
            }
        })

        if(!quiz) {
            return false
        }

        if(quiz.creatorId === userId) {
            const { creatorId, ...quizData } = quiz 
            return {
                ...quizData,
                results: quizData.results.map(({
                    userId,
                    score,
                    date,
                }) => {
                    return {
                        userId,
                        score,
                        date
                    }
                }),
                average: `${Math.round((quizData.results.reduce((previous, current) => {
                    return previous + current.score;
                }, 0) / quizData.results.length) * 100)} %`
            }
        } 

        const returnData = await prisma.result.findUnique({
            where: {
                userId_quizId: {
                    userId,
                    quizId
                }
            },
            select: {
                quiz: true,
                user: true,
                score: true,
                date: true,
            }
        })

        return { 
            ...returnData, 
            quiz: returnData.quiz.title, 
            user: returnData.user.email
        }
    }
}