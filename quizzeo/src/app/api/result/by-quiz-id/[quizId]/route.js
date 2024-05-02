import { NextResponse } from "next/server";
import { result } from "../../../../lib/result";
import { headers } from "next/headers";
import { verifyidApi } from "../../../../../lib/api";


export async function GET (request, { params }) {
    try {
        const apiKey = headers().get('authorization');
        const { quizId } = params
        console.log(apiKey);
        verifyidApi(apiKey)
        console.log(verifyidApi)
        


        const finalData = await result.listByUser(userId);
        return NextResponse.json({ ...finalData });



    } catch (error) {
        
    }
    

    
    // l'api key est associer a un utilisateur,
    // l'utilisateur en question a repondu a ce quiz 

      // sinon une 401 Unautorized 


}


