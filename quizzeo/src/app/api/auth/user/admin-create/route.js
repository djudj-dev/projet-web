import { NextResponse } from "next/server";
import { user } from "../../../../../lib/user";
import { getUserIdFromBearer } from "../../../../../lib/crypto-tools";
import { headers } from "next/headers";

export async function POST (request) {
    const adminId = await getUserIdFromBearer( headers().get('authorization'));
    const { email, password, enabled, role }  = await request.json()
    const finalData = await user.adminCreate({ 
        email, 
        password, 
        role,
        enabled,
        adminId    
    })

    if (!finalData) {
        return NextResponse.json("Internal Server Error", { status: 500});
    }

    return NextResponse.json({ ...finalData }, { status: 200 });
}