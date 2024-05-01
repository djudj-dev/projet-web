import { NextResponse } from "next/server";
import { quiz } from "../../../../lib/quiz";

export async function POST (request) {
    const { quizId, status, userId } = await request.json()
    
    const finalData = await quiz.changeQuizStatus({ quizId, status, userId});

    if (!finalData) {

        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    return NextResponse.json({ ...finalData });
}

