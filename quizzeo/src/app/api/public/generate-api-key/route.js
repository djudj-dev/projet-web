import { NextResponse } from "next/server";
import { user } from "../../../../lib/user";
import { api } from "../../../../lib/api";

export async function POST (request){
    console.log('test')
    const { email, password } = await request.json();

    const userToLog = await user.login({ email, password });

    if(!userToLog) {
        return NextResponse.json("Forbidden", { status: 403 });
    }

    const { apiKey } = await api.createApiKey(userToLog.id)
    
    if (!apiKey) {
        return NextResponse.json("Internal Server Error", { status: 500});
    }

    return NextResponse.json({ apiKey }, { status: 200 });
}