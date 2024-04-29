import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { generateApiKey } from "../../../lib/generate-api-key";

export async function GET (request, { params }){
    const newApiKey = await prisma.apiKey.create({
        data: {
            apiKey: generateApiKey()
        }
    })

    return NextResponse.json(newApiKey);
}