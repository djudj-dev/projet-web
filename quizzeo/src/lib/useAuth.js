"use client"
import { redirect } from "next/navigation";
import { postApi } from "./client-fetch";
import { localJwt } from "./local-storage"
import { useQuery } from "react-query"
import { useEffect } from "react";

export const useAuth = () => {
    const jwt = localJwt.get();

    useEffect(() => {
        if (!jwt){
            redirect('/connexion/login')
        }
    }, [jwt])

    const { data, error } = useQuery ({
        queryKey: "user-auth",
        queryFn: () => postApi("auth", { jwt }),
        enabled: jwt !== undefined
    })

    if (error) {
        redirect('/connexion/login')
    }

    if (data && !data.user) {
        redirect('/connexion/login')
    }

    return { jwt, user: data?.user }
}