import { NextResponse } from "next/server";
import { generateJwt } from "../../../lib/jwt-tools";

export async function POST (request) {
    console.log(request)
    const { email, password }  = await request.json()

    // add login function
    // change test by user id

    const jwt = await generateJwt('test')
    return NextResponse.json({ jwt }, { status: 404 });
}