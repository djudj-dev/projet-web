"use client"
import { redirect } from "next/navigation";
import { getAuthApi } from "./client-fetch";
import { localJwt } from "./local-storage"
import { useQuery } from "react-query"
import { useEffect } from "react";

export const useAuth = (wantedRole) => {
    const jwt = localJwt.get();

    useEffect(() => {
        if (!jwt){
            redirect('/connexion/login')
        }
    }, [jwt])

    const { data, error } = useQuery ({
        queryKey: "user-auth",
        queryFn: () => getAuthApi("auth", jwt),
        enabled: jwt !== undefined
    })

    if (error) {
        redirect('/connexion/login')
    }

    if (data && !data.user) {
        redirect('/connexion/login')
    }

    if (data && data.user.role && wantedRole !== "any") {
        const { role } = data.user

        if (wantedRole === "QuizMaker") {

            if (role === "User" || role === "UserAdmin") {
                redirect('/')
            }
        } else if (role !== wantedRole) {
            redirect('/');
        }
    }

    return { jwt, user: data?.user }
}