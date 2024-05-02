import { prismaClientSingleton } from './prisma';


 
export async function verifyidApi(apiKey) {
        
    const userId= await prisma.User.findUnique({
        where: {
            apiKey: apiKey,
        },
        select: {
            UserID: true
        },
    
    });
    return userId
    

} ; 
