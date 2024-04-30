import { NextResponse } from "next/server";
import { verifyJwt } from "../../../lib/jwt-tools";
import { user } from "../../../lib/user";

export async function POST (request) {
    const { jwt } = await request.json();
    const { data: { userId }} = await verifyJwt(jwt);

    if (!userId) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const currentUser = await user.findById(userId);

    return NextResponse.json({ user: currentUser }, { status: 200 });
}