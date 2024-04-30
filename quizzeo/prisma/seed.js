const { PrismaClient, Role, Action } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    // Création d'un nouvel User
    const newUser = await prisma.user.create({
        data: {
            email: "hello@gmail.com",
            role: Role.User,
            enabled: false,
        },
    });

    console.log("Nouvel User:");
    console.log(newUser);

    // Création d'un nouveau Quiz
    const newQuiz = await prisma.quiz.create({
        data: {
            Title: "Question: Quelle est la couleur du cheval blanc d'Henri IV ?",
            enabled: false,
            creatorId: newUser.id,
        },
    });

    console.log("Nouveau Quiz:");
    console.log(newQuiz);

    // Création d'un nouveau Result
    const newResult = await prisma.result.create({
        data: {
            quizId: newQuiz.id,
            userId: newUser.id,
            answers: ["Bleu", "Blanc", "Rouge", "Vert"],
            goodAnswer: 1,
        },
    });

    console.log("Nouveau Result:");
    console.log(newResult);

    // Création d'un nouveau log
    const newLogs = await prisma.logs.create({
        data: {
            userId: newUser.id,
            action: Action.loggin,
            ip: "192.161.1.1",
            additionalInformation: "Connexion OK",
        },
    });
    console.log("Nouveau log:");
    console.log(newLogs);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
