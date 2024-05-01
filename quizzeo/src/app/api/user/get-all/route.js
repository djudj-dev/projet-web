import { NextResponse } from "next/server";
import { user } from "../../../../lib/user";

export async function POST(request) {
    const { userId } = await request.json();

    const finalData = await user.getAllUsers(userId);

    if (!finalData) {

        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    return NextResponse.json({ ...finalData });
}
