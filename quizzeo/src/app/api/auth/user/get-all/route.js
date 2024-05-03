import { NextResponse } from "next/server";
import { user } from "../../../../../lib/user";
import { getUserIdFromBearer } from "../../../../../lib/crypto-tools";
import { headers } from "next/headers";

export async function GET(request) {
    const userId = await getUserIdFromBearer( headers().get('authorization'));

    const finalData = await user.getAllUsers(userId);

    if (!finalData) {

        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    return NextResponse.json({ ...finalData });
}
