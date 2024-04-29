import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { generateApiKey } from "../../../lib/generate-api-key";

export async function GET (){
    const newApiKey = await prisma.apiKey.create({
        data: {
            apiKey: generateApiKey()
        }
    })

    return NextResponse.json({ body: newApiKey }, { status: 200 });
}