// Importation du singleton Prisma et de bcrypt
import { prismaClientSingleton } from './prisma';
import bcrypt from 'bcrypt';

// Initialisation de l'instance Prisma
const prisma = prismaClientSingleton();

// Fonction de connexion
async function connexion(email, password) {
    try {
        // Recherche de l'utilisateur dans la base de données
        const user = await prisma.User.findUnique({
            where: {
                email: email,
            },
        });

        // Vérification de l'existence de l'utilisateur
        if (!user) {
            throw new Error('Identifiant incorrect.');
        }

        // Comparaison du mot de passe fourni avec le mot de passe haché de l'utilisateur
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Vérification de la correspondance des mots de passe
        if (!passwordMatch) {
            throw new Error('Mot de passe incorrect.');
        }

        if (!user.enabled) {
            throw new Error("L'utilisateur n'est pas activé");
        }


    return user

    } catch (error) {
        // Gestion des erreurs
        return false;
    }
}


export { connexion};