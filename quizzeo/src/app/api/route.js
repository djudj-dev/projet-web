import { NextResponse } from "next/server";


export async function GET () {

    return NextResponse.json({ data: process.env }, { status: 200 });
}