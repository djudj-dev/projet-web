import { NextResponse } from "next/server";
import { result } from "../../../lib/result";

export async function POST (request) {
    const { score, quizId, userId } = await request.json();

    const finalData = await result.create({ score: Number(score), quizId, userId });

    return NextResponse.json({ ...finalData });
}

