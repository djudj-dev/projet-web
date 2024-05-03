import { NextResponse } from "next/server";
import { verifyJwt } from "../../../lib/crypto-tools";
import { headers } from "next/headers";
import { user } from "../../../lib/user";

export async function GET (request) {
    const bearer = headers().get('authorization');

    if (!bearer) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const jwt = bearer.substring(7, bearer.length);
    const { data: { userId }} = await verifyJwt(jwt);

    if (!userId) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const currentUser = await user.findById(userId);

    return NextResponse.json({ user: currentUser }, { status: 200 });
}