import { NextResponse } from "next/server";
import { generateJwt } from "../../../lib/jwt-tools";
import { connexion } from "../../../lib/connexion";

export async function POST (request) {
    console.log(request)
    const { email, password }  = await request.json()
    user = connexion(email, password)
    const jwt = await generateJwt(user.id)
    return NextResponse.json({ jwt }, { status: 404 });
}