import { NextResponse } from "next/server";
import { quiz } from "../../../../lib/quiz";
import { question } from "../../../../lib/question";
import { getUserIdFromBearer } from "../../../../lib/jwt-tools";
import { headers } from "next/headers";

export async function POST (request) {
    const creatorId = await getUserIdFromBearer( headers().get('authorization'));
    const { title, questions } = await request.json();

    const newQuiz = await quiz.create({ title, creatorId })

    for (const index in questions) {
        await question.create({ ...questions[index], quizId: newQuiz.id })
    }

    const finalData = await quiz.getWithQuestion(newQuiz.id)

    return NextResponse.json({ ...finalData });
}
