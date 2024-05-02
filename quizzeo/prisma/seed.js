const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const passwordSalt = Number(process.env.PASSWOARD_SALT);

async function main() {
    // Génère un mot de passe crypté
    const hashedPassword = await bcrypt.hash("admin", passwordSalt);

    // Créer un utilisateur avec le rôle GlobalAdmin
    const newUser = await prisma.user.create({
        data: {
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "GlobalAdmin",
            enabled: true,
        },
    });

    const manyUser = await prisma.user.createMany({
        data: [
            {
                email: "quizadmin@gmail.com",
                password: hashedPassword,
                role: "QuizAdmin",
                enabled: true,
            },
            {
                email: "quizcreator@gmail.com",
                password: hashedPassword,
                role: "QuizCreator",
                enabled: true,
            },
            {
                email: "user@gmail.com",
                password: hashedPassword,
                role: "User",
                enabled: false,
            },
            {
                email: "useradmin@gmail.com",
                password: hashedPassword,
                role: "UserAdmin",
                enabled: true,
            },
        ],
    });

    // Créer un quiz
    const quiz = await prisma.quiz.create({
        data: {
            title: "Quiz sur les capitales",
            enabled: true,
            creatorId: newUser.id,
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
            userId: newUser.id,
            score: 8,
        },
    });

    console.log("Données seedées avec succès");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
