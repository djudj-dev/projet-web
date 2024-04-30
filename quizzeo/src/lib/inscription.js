import { prismaClientSingleton } from './prisma';
import bcrypt from 'bcrypt';

const prisma = prismaClientSingleton();


// Fonction d'inscription
async function signup(login, password) {
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.login.findUnique({
            where: {
                login: login,
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
                login : login,
                password: hashedPassword,
                // Autres champs de l'utilisateur...
            },
        });

        return newUser;
    } catch (error) {
        throw new Error(`Erreur lors de l'inscription : ${error.message}`);
    }
}

export { signup };