import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyidApi } from "../../../../lib/api";

// if result (userid) ou quiz (créator id) alors afficher le résualtat sinon null


export async function GET (request, { params }) {
    try {
        // Réupération des données 
        const apiKey = headers().get('authorization');
        const { quizId } = params
        console.log(apiKey);
        const userID= verifyidApi(apiKey)
        
        // Vérifier si le quiz a été crée ou répondu par la personne
        const Verify= VerifyCreatororUser(userID)


        if (canAccessGlobalScore == true) {
            const list = listByquizid(quizId)
            // Faire la moyenne du quiz en question
            const finalData = averageScore(userID);
            // Afficher la réponse le quiz en question
            return NextResponse.json({ ...finalData });

        } else {
            console.log("Aucun Résulat disponible")
        }
    
    } catch (error) { 
        throw error ("401: Unauthorized")
    }
    


}
