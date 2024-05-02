import { NextResponse } from "next/server";
import { quiz } from "../../../../../lib/quiz";
import { getUserIdFromBearer } from "../../../../../lib/jwt-tools";
import { headers } from "next/headers";

export async function GET (request, { params }) {
    const userIdToken = await getUserIdFromBearer( headers().get('authorization'));
    const { userId } = params

    if (userId !== userIdToken) {
        
        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    const finalData = await quiz.getByCreator(userId);

    if (!finalData) {

        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    return NextResponse.json({ ...finalData });
}

