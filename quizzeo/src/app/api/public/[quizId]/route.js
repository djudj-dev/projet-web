import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { quiz } from "../../../../lib/quiz"
import { api } from "../../../../lib/api"

export async function GET (request, { params }) {
    const apiKey = headers().get('api-key');
    const { quizId } = params

    const { userId } = await api.checkApiKey(apiKey)
    
    if(!userId) {
        return NextResponse.json("Forbidden", { status: 403 });
    }
    
    const finalData = await quiz.getByApiKey({ userId, quizId });

    if(!finalData) {
        return NextResponse.json("Internal Server Error", { status: 500});
    }

    return NextResponse.json({...finalData})
}
