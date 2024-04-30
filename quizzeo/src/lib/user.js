import { prisma } from "./prisma";
import bcrypt from 'bcrypt';

const passwordSalt = Number(process.env.PASSWOARD_SALT);

export const user = {
  login: async ({ email, password }) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
          enabled: true
        },
      });

      if (!user) {
        throw new Error('Identifiant incorrect ou compte non activé');
      }

      if (!await bcrypt.compare(password, user.password)) {
        throw new Error('Mot de passe incorrect');
      }

      return user;
    } catch (error) {
      console.log(error)
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
        throw new Error('Cet identifiant est déjà utilisé.');
      }

      const hashedPassword = await bcrypt.hash(password, passwordSalt);

      const newUser = await prisma.user.create({
          data: {
            email : email,
            password: hashedPassword,
            role,
          },
      });

      return newUser;
    } catch (error) {
      console.log(error)
      return false;
    }
  },
  findById: async (userId) => (
    prisma.user.findUnique({
      where: {
        id: userId
      }
    })
  )
}
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
async function UserModifyPassword(userId, NewPassword){

    try {
        const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });
          
          
          if (user) {
              const hashedPassword = await bcrypt.hash(NewPassword, 10);
              await prisma.user.update({
                where: {
                  id: userId,
                },
                data: {
                  password: hashedPassword,
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

export { UsermodifyEmail, AdminmodifyEmail, UserModifyPassword };
