"use client"
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { localJwt } from "../../lib/local-storage";

export default function HomeLayout({ children }) {
    const jwt = localJwt.get();

    useEffect(() => {
        if (!jwt){
            redirect('/connexion/login')
        }

    }, [jwt])

    return (
        <>
            {children}
        </>
    )
}
