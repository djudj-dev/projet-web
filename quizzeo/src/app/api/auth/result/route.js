import { NextResponse } from "next/server";
import { result } from "../../../../lib/result";
import { headers } from "next/headers";
import { getUserIdFromBearer } from "../../../../lib/jwt-tools";

export async function POST (request) {
    const userId = await getUserIdFromBearer( headers().get('authorization'));
    const { score, quizId } = await request.json();

    const finalData = await result.create({ score: Number(score), quizId, userId });

    if (!finalData) {

        return NextResponse.json("Internal Server Error", { status: 500});
    }

    return NextResponse.json({ ...finalData });
}