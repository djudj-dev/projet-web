import { NextResponse } from "next/server";
import { generateJwt } from "../../../lib/crypto-tools";
import { user } from "../../../lib/user";

export async function POST (request) {
    const { email, password }  = await request.json()
    const newUser = await user.signup({ 
        email, 
        password, 
        role: "User"
    })

    if (!newUser) {
        return NextResponse.json("Internal Server Error", { status: 500});
    }

    const jwt = await generateJwt(user.id);

    return NextResponse.json({ jwt, user: newUser}, { status: 200 });
}