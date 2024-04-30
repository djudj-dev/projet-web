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
  ),
  changePassword: async ({ userId, password, newPassword }) => {
    try {
      const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        if (!user) {
          throw new Error('Identifiant incorrect');
        }
  
        if (!await bcrypt.compare(password, user.password)) {
          throw new Error('Ancien mot de passe incorrect');
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
          throw new Error('Identifiant incorrect');
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
  }
}