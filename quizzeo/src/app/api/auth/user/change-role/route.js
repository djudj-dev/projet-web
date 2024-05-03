import { NextResponse } from "next/server";
import { user } from "../../../../../lib/user";
import { getUserIdFromBearer } from "../../../../../lib/crypto-tools";
import { headers } from "next/headers";

export async function POST (request) {
    const userId = await getUserIdFromBearer( headers().get('authorization'));
    const { userToChange, newRole } = await request.json();
    const finalData = await user.changeRole({ userId, userToChange, newRole });

    if (!finalData) {

        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    return NextResponse.json({ ...finalData });
}

