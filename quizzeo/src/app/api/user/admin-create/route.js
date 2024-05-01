import { NextResponse } from "next/server";
import { user } from "../../../../lib/user";

export async function POST (request) {
    const { email, password, enabled, role, adminId }  = await request.json()
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