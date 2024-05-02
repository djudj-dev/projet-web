import { prismaClientSingleton } from './prisma';
import bcrypt from 'bcryptjs';

const prisma = prismaClientSingleton();

//Vérifier le statut et afficher tous les user

async function checkAllUser(){
    try {
        const Alluser = await prisma.findmany ({
            Select: {
                id: true,
                email: true,
                role: true,
                enabled: true,
            }

        })

        return Alluser;
        
   
    } catch (error) {
        throw error ("Erreur");
        
    }
}

// Vérifier le statut du compte

async function checkAccount(email){
    try {
        const account= await prisma.user.findUnique ({
            where: {
                email: email,
            },
            select: {
                enabled:true,
            },

        })
        
        return account ; 
    } catch (error) {
        throw error ('Erreur wuld a kelb');
        
    }
}

// activer le compte

async function activateAccount(email){

    try {
        const user = await prisma.user.findUnique({
            where: {
              email:email,
            },
          });
          
          if (user) {
            if (user.enabled === true) {
              console.log("Ce compte est déjà actif");
            } else {
              await prisma.user.update({
                where: {
                  email: email,
                },
                data: {
                  enabled: true,
                },
              });
              console.log("Compte activé avec succès !");
            }
          } else {
            console.log("Utilisateur introuvable");
          }
        
    } catch (error) {
        throw error (' Non ')
        
    }
}

// Déactiver le compte 

async function DeactivateAccount(email){

    try {
        const user = await prisma.user.findUnique({
            where: {
              email:email,
            },
          });
          
          if (user) {
            if (user.enabled === false) {
              console.log("Ce compte est déjà inactif");
            } else {
              await prisma.user.update({
                where: {
                  email: email,
                },
                data: {
                  enabled: false,
                },
              });
              console.log("Compte désactivé avec succès !");
            }
          } else {
            console.log("Utilisateur introuvable");
          }
        
    } catch (error) {
        throw error (' Non ')
        
    }
}



export{ checkAllUser, checkAccount, activateAccount,DeactivateAccount};
