import { NextResponse } from "next/server";
import { quiz } from "../../../../lib/quiz";

export async function GET (request, { params }) {
    const { userId } = params
    const finalData = await quiz.getByCreator(userId);

    if (!finalData) {

        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    return NextResponse.json({ ...finalData });
}

