import { prisma } from './prisma';


 
export async function verifyidApi(apiKey) {
        
    const userId= await prisma.user.findUnique({
        where: {
            apiKey: apiKey,
        },
        select: {
            UserID: true
        },
    
    });
    return userId
    

} ; 
