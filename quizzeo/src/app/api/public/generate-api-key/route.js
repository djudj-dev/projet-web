import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { generateApiKey } from "../../../../lib/generate-api-key";
import { user } from "../../../../lib/user";

export async function POST (request){
    const { email, password } = await request.json();

    const userToLog = await user.login({ email, password });

    if(!userToLog) {
        return NextResponse.json("Forbidden", { status: 403 });
    }

    const { apiKey } = await prisma.apiKey.create({
        data: {
            apiKey: generateApiKey(),
            userId: userToLog.id
        }
    })
    
    if (!apiKey) {
        return NextResponse.json("Internal Server Error", { status: 500});
    }

    return NextResponse.json({ apiKey }, { status: 200 });
}