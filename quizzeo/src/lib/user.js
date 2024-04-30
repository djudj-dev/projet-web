import { prisma } from "./prisma";
import bcrypt from 'bcrypt';

const prisma = prismaClientSingleton();

// Modifier email quand on est user
async function UsermodifyEmail(userId, NewEmail){

    try {
        const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });
          
          if (user) {
              await prisma.user.update({
                where: {
                  id: userId,
                },
                data: {
                  email: NewEmail,
                },
              });
              console.log("Email modifié avec succès !");
          } else {
            console.log("Modification impossible");
          }
        
    } catch (error) {
        console.error("Erreur lors de la modification de l'email :", error);
        throw error;
    }
}

// Modifier email quand on est admin
async function AdminmodifyEmail(email, NewEmail){

    try {
        const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });
          
          if (user) {
              await prisma.user.update({
                where: {
                  email: userId,
                },
                data: {
                  email: NewEmail,
                },
              });
              console.log("Email modifié avec succès !");
          } else {
            console.log("Modification impossible");
          }
        
    } catch (error) {
        console.error("Erreur lors de la modification de l'email :", error);
        throw error;
    }
}

// Modifier password quand on est user
async function UsermodifyPassword(userId, NewPassword){

    try {
        const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });
          
          if (user) {
              await prisma.user.update({
                where: {
                  id: userId,
                },
                data: {
                  password: NewPassword,
                },
              });
              console.log("Mot de passe modifié avec succès !");
          } else {
            console.log("Modification impossible");
          }
        
    } catch (error) {
        console.error("Erreur lors de la modification du mot de passe :", error);
        throw error;
    }
}

export { UsermodifyEmail, AdminmodifyEmail };
