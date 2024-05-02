import { NextResponse } from 'next/server';
import { headers } from "next/headers"  ;
import { verifyJwt } from './lib/jwt-tools';
import { findById } from './lib/user';


export async function middleware(request) {
    const bearer = headers().get('authorization')
    if (!bearer) {return NextResponse.json("Unautorized", { status: 401});}

        const jwt = bearer.substring(7, bearer.length);  
        const  { data: { userId }} = await verifyJwt(jwt);    // Extraction de l'id à partir du token
        
        // On stock dans la variable user l'id de l'utilisateur dans la bdd qui a pour id celui du tocken et qui a enable true 


        const Id_user = await User.findById(userId);
        
        if (!Id_user.enable === true) {
            return NextResponse.json("Unautorized", { status: 401});
        }
            
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*']
}


