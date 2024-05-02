const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const passwordSalt = Number(process.env.PASSWOARD_SALT);

async function main() {
    // Génère un mot de passe crypté
    const hashedPassword = await bcrypt.hash("admin", passwordSalt);

    const adminAlreadyCreate = await prisma.user.findUnique({
        where: {
            email: "admin@gmail.com"
        }
    })

    if (adminAlreadyCreate) {
        console.log('seed deja effectuer');
        return 
    }
    // Créer un utilisateur avec le rôle GlobalAdmin
    const newUser = await prisma.user.create({
        data: {
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "GlobalAdmin",
            enabled: true,
        },
    });

    // Vient créer 4 nouveaux utilisateurs avec des rôles différents
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

    // Créer des quiz
    const quiz1 = await prisma.quiz.create({
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

    const quiz2 = await prisma.quiz.create({
        data: {
            title: "Quiz sur l'histoire de France",
            enabled: true,
            creatorId: newUser.id,
            questions: {
                create: [
                    {
                        title: "Quelle est la date de la Révolution française ?",
                        answers: ["1789", "1848", "1871", "1917"],
                        goodAnswer: 0,
                    },
                    {
                        title: "Quel roi a régné le plus longtemps en France ?",
                        answers: [
                            "Louis XIV",
                            "Napoléon Ier",
                            "François Ier",
                            "Henri IV",
                        ],
                        goodAnswer: 0,
                    },
                    {
                        title: "Quelle bataille a marqué la fin de la Seconde Guerre mondiale en Europe ?",
                        answers: [
                            "Stalingrad",
                            "Normandie",
                            "Verdun",
                            "Berlin",
                        ],
                        goodAnswer: 3,
                    },
                    {
                        title: "Quel événement a conduit à la chute de la monarchie en France ?",
                        answers: [
                            "La Révolution de 1848",
                            "L'Affaire Dreyfus",
                            "La Commune de Paris",
                            "La Révolution française",
                        ],
                        goodAnswer: 3,
                    },
                    {
                        title: "Qui a été le premier président de la Cinquième République française ?",
                        answers: [
                            "Charles de Gaulle",
                            "François Mitterrand",
                            "Jacques Chirac",
                            "Valéry Giscard d'Estaing",
                        ],
                        goodAnswer: 0,
                    },
                ],
            },
        },
    });

    const quiz3 = await prisma.quiz.create({
        data: {
            title: "Quiz sur la cuisine française",
            enabled: true,
            creatorId: newUser.id,
            questions: {
                create: [
                    {
                        title: "Quel est le plat national français ?",
                        answers: [
                            "Coq au vin",
                            "Bœuf bourguignon",
                            "Ratatouille",
                            "Crêpes",
                        ],
                        goodAnswer: 0,
                    },
                    {
                        title: "Quel est le fromage français le plus connu ?",
                        answers: ["Camembert", "Roquefort", "Brie", "Comté"],
                        goodAnswer: 2,
                    },
                    {
                        title: "Quelle est la boisson alcoolisée française la plus célèbre ?",
                        answers: ["Vin rouge", "Cognac", "Champagne", "Pastis"],
                        goodAnswer: 2,
                    },
                    {
                        title: "Quel est le dessert français le plus populaire ?",
                        answers: [
                            "Crème brûlée",
                            "Tarte tatin",
                            "Macaron",
                            "Soufflé",
                        ],
                        goodAnswer: 1,
                    },
                    {
                        title: "Quelle est la région française connue pour sa gastronomie ?",
                        answers: [
                            "Bretagne",
                            "Normandie",
                            "Provence",
                            "Bourgogne",
                        ],
                        goodAnswer: 3,
                    },
                ],
            },
        },
    });

    const quiz4 = await prisma.quiz.create({
        data: {
            title: "Quiz sur l'orthographe française",
            enabled: true,
            creatorId: newUser.id,
            questions: {
                create: [
                    {
                        title: "Quel est le pluriel correct de 'cheval' ?",
                        answers: ["chevaux", "chevals", "chevaulx", "chevales"],
                        goodAnswer: 0,
                    },
                    {
                        title: "Quelle est l'orthographe correcte de 'oignon' ?",
                        answers: ["ognon", "oignons", "oignons", "ognons"],
                        goodAnswer: 2,
                    },
                    {
                        title: "Quel est le participe passé correct de 'voir' ?",
                        answers: ["vu", "vus", "vus", "vus"],
                        goodAnswer: 0,
                    },
                    {
                        title: "Quelle est la bonne orthographe de 's'asseoir' ?",
                        answers: [
                            "s'assoir",
                            "s'assoir",
                            "s'asseoir",
                            "s'assoir",
                        ],
                        goodAnswer: 2,
                    },
                    {
                        title: "Quel est le pluriel correct de 'œil' ?",
                        answers: ["oeil", "yeux", "oeux", "yeux"],
                        goodAnswer: 3,
                    },
                ],
            },
        },
    });

    // Créer des résultats
    const result = await prisma.result.createMany({
        data: [
            {
                quizId: quiz1.id,
                userId: newUser.id,
                score: 0,
            },
            {
                quizId: quiz2.id,
                userId: newUser.id,
                score: 0.25,
            },
            {
                quizId: quiz3.id,
                userId: newUser.id,
                score: 1,
            },
            {
                quizId: quiz4.id,
                userId: newUser.id,
                score: 0,
            },
        ],
    });

    console.log("Données seedées avec succès");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
