import { NextResponse } from "next/server";
import { getClientIp } from 'request-ip'
import { generateJwt } from "../../../lib/crypto-tools";
import { user } from "../../../lib/user";
import { logs, ACTION } from "../../../lib/logs";

export async function POST (request) {
    const { email, password }  = await request.json()
    const currentUser = await user.login({ email, password });
    if(!currentUser) {
        
        return NextResponse.json("Forbidden", { status: 403 });
    }

    const jwt = await generateJwt(currentUser.id);

    await logs.create({
        action: ACTION.loggin,
        ip: getClientIp(request),
        userId: currentUser.id
    })

    return NextResponse.json({ jwt, user: currentUser}, { status: 200 });
}