// Importation du singleton Prisma et de bcrypt
import { prisma } from './prisma.js';
const {verifyJwt} = require("./crypto-tools.js")


// middlewareRole

exports.Role = async (req, res, next) => {
    try {
    // Récupération du token depuis les paramètres de requête ou les en-têtes de requête
    const token = req.query.token || req.headers.authorization;
    // Vérification de la présence du token
    if (token) {
     
         // Extraction de l'id à partir du token
        const id = verifyJwt(token);

        // On stock dans la variable idbdd l'utilisateur dans la bdd qui a pour id celui du tocken
        const UserBdd= await prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                role: true, // Inclure les informations sur le rôle de l'utilisateur
            },
        });

        if (!UserBdd) {
            throw new Error("Utilisateur non trouvé.");
        }
       
  

        // On extrait le role de l'utilisateur présent dans la BDD
        const roleUserBdd= UserBdd.role;

        req.body.User = roleUserBdd
        next()

    }}

 
catch (error) {
    // Gestion des erreurs
    return false;
}}
