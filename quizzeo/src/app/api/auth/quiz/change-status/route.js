import { NextResponse } from "next/server";
import { getUserIdFromBearer } from "../../../../../lib/crypto-tools";
import { quiz } from "../../../../../lib/quiz";
import { headers } from "next/headers";

export async function POST (request) {
    const userId = await getUserIdFromBearer( headers().get('authorization'));
    const { quizId, status } = await request.json()
    
    const finalData = await quiz.changeQuizStatus({ quizId, status, userId});

    if (!finalData) {

        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    return NextResponse.json({ ...finalData });
}

