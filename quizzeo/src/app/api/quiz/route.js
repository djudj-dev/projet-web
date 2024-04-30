import { NextResponse } from "next/server";
import { quiz } from "../../../lib/quiz";
import { question } from "../../../lib/question";

export async function POST (request) {
    const { title, creatorId, questions } = await request.json();

    const newQuiz = await quiz.create({ title, creatorId })
    console.log(questions)

    for (const index in questions) {
        await question.create({ ...questions[index], quizId: newQuiz.id })
    }

    const finalData = await quiz.getWithQuestion(newQuiz.id)

    return NextResponse.json({ ...finalData });
}