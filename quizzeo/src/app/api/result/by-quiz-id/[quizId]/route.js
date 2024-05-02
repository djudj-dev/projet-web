import { NextResponse } from "next/server";
import { result } from "../../../../lib/result";
import { headers } from "next/headers";

export async function GET (request, { params }) {
    const apiKey = headers().get('authorization');
    const { quizId } = params

    // ajouter une fonction qui verifie que : 
    // l'api key est associer a un utilisateur,
    // l'utilisateur en question a repondu a ce quiz 
    // si ou retoruner le resultat du quiz 
    // sinon une 401 Unautorized 

    const finalData = await result.listByUser(userId);

    return NextResponse.json({ ...finalData });
}

