import { NextResponse } from 'next/server'
import { headers } from "next/headers"  
 
export async function middleware(request) {
    const bearer = headers().get('authorization');
    if (bearer) {
        const jwt = bearer.substring(7, bearer.length);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*']
}