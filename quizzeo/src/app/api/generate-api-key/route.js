import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { generateApiKey } from "../../../lib/generate-api-key";
import { user } from "../../../lib/user";

export async function POST (request){
    const { email, password } = await request.json();

    const userToLog = user.login({ email, password });

    if(!userToLog) {
        return NextResponse.json("Forbidden", { status: 403 });
    }

    const newApiKey = await prisma.apiKey.create({
        data: {
            apiKey: generateApiKey(),
            userId: userToLog.userId
        }
    })
    
    if (!newApiKey) {
        return NextResponse.json("Internal Server Error", { status: 500});
    }

    return NextResponse.json({ body: newApiKey }, { status: 200 });
}