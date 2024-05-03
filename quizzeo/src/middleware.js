import { NextResponse } from 'next/server';
import { headers } from "next/headers"  ;

export async function middleware(request) {
    
    const bearer = headers().get('authorization')
    if (!bearer) {
        
        return NextResponse.json("Unauthorized", { status: 401});
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/auth/:path*']
}


