import { NextResponse } from "next/server";
import { result } from "../../../../lib/result";
import { getClientIp } from 'request-ip';
import { headers } from "next/headers";
import { getUserIdFromBearer } from "../../../../lib/crypto-tools";
import { logs, ACTION } from "../../../../lib/logs";

export async function POST (request) {
    const userId = await getUserIdFromBearer( headers().get('authorization'));
    const { score, quizId } = await request.json();

    const finalData = await result.create({ score: Number(score), quizId, userId });

    if (!finalData) {

        return NextResponse.json("Internal Server Error", { status: 500});
    }
    await logs.create(
        {
            action: ACTION.loggin,
            ip: getClientIp(request),
            userId
        },
        `reply to quizId: ${quizId}`
    )

    return NextResponse.json({ ...finalData });
}