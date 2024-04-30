import { NextResponse } from "next/server";
import { result } from "../../../../lib/result";

export async function GET (request, { params }) {
    const { userId } = params
    const finalData = await result.listByUser(userId);

    return NextResponse.json({ ...finalData });
}

