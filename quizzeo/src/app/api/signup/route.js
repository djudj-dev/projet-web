import { NextResponse } from "next/server";
import { generateJwt } from "../../../lib/jwt-tools";
import { signup } from "../../../lib/inscription";

export async function POST (request) {
    console.log(request)
    const { email, password }  = await request.json()
    signup(email, password)
    
    const user = prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    const jwt = await generateJwt(user.id);

    return NextResponse.json({ jwt });
}