import { prisma } from "./prisma"

export const logs = {
    create: async({
        ip,
        userId,
        action
    }, 
    additionalInfo= undefined
) => (
        await prisma.logs.create({
            data: {
               ip: ip || 'no provided',
               userId,
               action: ACTION[action],
               additionalInformation: additionalInfo
            }
        })
    ),
    getAll: async () => (
        await prisma.logs.findMany()
    )
}

export const ACTION = {
    loggin: 'loggin',
    startQuiz: 'startQuiz',
    FinishQuiz: 'FinishQuiz',
    signIn: 'signIn',
    logout: 'logout'
}