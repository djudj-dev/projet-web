import { NextResponse } from "next/server";
import { result } from "../../../../../lib/result";
import { headers } from "next/headers";
import { getUserIdFromBearer } from "../../../../../lib/jwt-tools";

export async function GET (request, { params }) {
    const userIdToken = await getUserIdFromBearer( headers().get('authorization'));
    const { userId } = params

    if (userId !== userIdToken) {
        
        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    const finalData = await result.listByUser(userId);

    if (!finalData) {

        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    return NextResponse.json({ ...finalData });
}

