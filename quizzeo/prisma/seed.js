const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Créer un utilisateur
    const user = await prisma.user.create({
        data: {
            email: "admin@example.com",
            password: "admin",
            role: "GlobalAdmin",
            enabled: true,
        },
    });

    // Créer un quiz
    const quiz = await prisma.quiz.create({
        data: {
            title: "Quiz sur les capitales",
            enabled: true,
            creatorId: user.id,
            questions: {
                create: [
                    {
                        title: "Quelle est la capitale de la France ?",
                        answers: ["Paris", "Marseille", "Lyon", "Bordeaux"],
                        goodAnswer: 0,
                    },
                    {
                        title: "Quelle est la capitale de l'Italie ?",
                        answers: ["Milan", "Rome", "Naples", "Turin"],
                        goodAnswer: 1,
                    },
                ],
            },
        },
    });

    // Créer un résultat
    const result = await prisma.result.create({
        data: {
            quizId: quiz.id,
            userId: user.id,
            score: 80,
        },
    });

    console.log("Données seedées avec succès");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
