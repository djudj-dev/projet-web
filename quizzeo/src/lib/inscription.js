import { prismaClientSingleton } from './prisma';
import bcrypt from 'bcrypt';

const prisma = prismaClientSingleton();


// Fonction d'inscription
async function signup(email, password) {
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            throw new Error('Cet identifiant est déjà utilisé.');
        }

        // Hasher le mot de passe avant de le stocker dans la base de données
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur dans la base de données
        const newUser = await prisma.user.create({
            data: {
                email : email,
                password: hashedPassword,
                role: "user",
            },
        });

        return newUser;
    } catch (error) {
        throw new Error(`Erreur lors de l'inscription : ${error.message}`);
    }
}

export { signup };