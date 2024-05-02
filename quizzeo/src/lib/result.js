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
    ),

    listByquizid: async (quizId) => (
        await prisma.result.findMany({
            where: {
                quizid
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
    ),

    averagescorequiz: async (quizId) => {
        const results = await listByquizid(quizId);
        const scores = [];
        results.forEach(result => {
            scores.push(result.score);
        });
        
        // Calcul de la moyenne des scores
        const averageScore = scores.reduce((total, score) => total + score, 0) / scores.length;
        
        console.log("Scores:", scores);
        console.log("Moyenne globale:", averageScore);
    
        return averageScore; // Retourner la moyenne calculée
    }
       
}