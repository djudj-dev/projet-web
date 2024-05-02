import { prisma } from "./prisma";
import bcrypt from "bcrypt";

const passwordSalt = Number(process.env.PASSWOARD_SALT);

export const user = {
    login: async ({ email, password }) => {
        try {
            console.log(email, password)
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                    enabled: true,
                },
            });

            if (!user) {
                console.log(user)
                throw new Error("Identifiant incorrect ou compte non activé");
            }

            if (!(await bcrypt.compare(password, user.password))) {
                throw new Error("Mot de passe incorrect");
            }

            return user;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    signup: async ({ email, password, role }) => {
        try {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (existingUser) {
                throw new Error("Cet identifiant est déjà utilisé.");
            }

            const hashedPassword = await bcrypt.hash(password, passwordSalt);

            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                    role,
                },
            });

            return newUser;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    adminCreate: async ({ email, password, role, enabled, adminId }) => {
        try {
            const adminUser = await prisma.user.findUnique({
                where: {
                    id: adminId,
                },
            });

            if (!adminUser) {
                throw new Error("Identifiant incorrect");
            }

            if (!(adminUser.role === "GlobalAdmin")) {
                return false;
            }

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (existingUser) {
                throw new Error("Cet identifiant est déjà utilisé.");
            }

            const hashedPassword = await bcrypt.hash(password, passwordSalt);

            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                    role,
                    enabled
                },
            });

            return newUser;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    findById: async (userId) =>
        prisma.user.findUnique({
            where: {
                id: userId,
            },
        }),
    // Pour obtenir la liste de tous les utilisateurs
    getAllUsers: async (userId) => {
        try {
            const currentUser = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            if (!currentUser) {
                throw new Error("Identifiant incorrect");
            }

            if (!(currentUser.role === "GlobalAdmin" || currentUser.role === 'UserAdmin')) {
                return false;
            }

            const users = await prisma.user.findMany({
                where: {
                    NOT: { id: userId } 
                }
            });

            return users;

        } catch (error) {
            console.error(
                "Erreur lors de la récupération des utilisateurs :",
                error
            );
           
            return false;
        }
    },
    changeRole: async ({ userId, userToChange, newRole }) => {
        try {
            const currentUser = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            if (!currentUser) {
                throw new Error("Identifiant incorrect");
            }

            if (!(currentUser.role === "GlobalAdmin" || currentUser.role === 'UserAdmin')) {
                return false;
            }

            const user = await prisma.user.update({
                where: {
                    id: userToChange.id
                },
                data: {
                    role: newRole
                }
            });

            return user;
        } catch (error) {
            console.log(error);
           
            return false;
        }
    },
    changeStatus: async ({ userId, userToChange, newStatus }) => {
        try {
            const currentUser = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            if (!currentUser) {
                throw new Error("Identifiant incorrect");
            }

            if (!(currentUser.role === "GlobalAdmin" || currentUser.role === 'UserAdmin')) {
                return false;
            }

            const user = await prisma.user.update({
                where: {
                    id: userToChange.id
                },
                data: {
                    enabled: newStatus
                }
            });

            return user;
        } catch (error) {
            console.log(error);
           
            return false;
        }
    },
    changePassword: async ({ userId, password, newPassword }) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            if (!user) {
                throw new Error("Identifiant incorrect");
            }

            if (!(await bcrypt.compare(password, user.password))) {
                throw new Error("Ancien mot de passe incorrect");
            }

            const hashedPassword = await bcrypt.hash(newPassword, passwordSalt);

            return await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    password: hashedPassword,
                },
            });
        } catch (error) {
            console.log(error);

            return false;
        }
    },
    changeEmail: async ({ userId, newEmail }) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            if (!user) {
                throw new Error("Identifiant incorrect");
            }

            return await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    email: newEmail,
                },
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    VerifyCreatorOrUser: async (userId) => {
        return await prisma.result.findMany({
            where: {
                OR: [
                    { userId },
                    { quiz: { creatorId: userId } }
                    ]
            }
        });
    }
        
};
