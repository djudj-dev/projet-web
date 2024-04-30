import { NextResponse } from "next/server";
import { user } from "../../../../lib/user";

export async function POST (request) {
    const { userId, newEmail } = await request.json();
    const finalData = await user.changeEmail({ userId, newEmail });


    if (!finalData) {

        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    return NextResponse.json({ ...finalData });
}

