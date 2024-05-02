import { NextResponse } from "next/server";
import { generateJwt, verifyJwt } from "../../../lib/jwt-tools";
import { user } from "../../../lib/user";

export async function POST (request) {
    const { email, password }  = await request.json()
    const currentUser = await user.login({ email, password });
    if(!currentUser) {
        
        return NextResponse.json("Forbidden", { status: 403 });
    }

    const jwt = await generateJwt(currentUser.id);

    return NextResponse.json({ jwt, user: currentUser}, { status: 200 });
}