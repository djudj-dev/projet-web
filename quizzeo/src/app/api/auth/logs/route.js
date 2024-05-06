import { NextResponse } from "next/server";
import { getUserIdFromBearer } from "../../../../lib/crypto-tools";
import { logs } from "../../../../lib/logs";
import { user } from "../../../../lib/user";
import { headers } from "next/headers";

export async function GET () {
    const userId = await getUserIdFromBearer( headers().get('authorization'));

    const { role } = await user.findById(userId);

    if (!role || role !== "GlobalAdmin" ) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const finalData = await logs.getAll()

    if (!finalData) {

        return NextResponse.json("Bad Request", { status: 400 }); 
    }

    return NextResponse.json({ ...finalData });
}