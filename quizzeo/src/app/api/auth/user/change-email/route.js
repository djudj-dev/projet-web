import { NextResponse } from "next/server";
import { user } from "../../../../../lib/user";
import { headers } from "next/headers";
import { getUserIdFromBearer } from "../../../../../lib/jwt-tools";

export async function POST (request) {
    const userId = await getUserIdFromBearer( headers().get('authorization'));
    const { newEmail } = await request.json();
    const finalData = await user.changeEmail({ userId, newEmail });


    if (!finalData) {

        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    return NextResponse.json({ ...finalData });
}

