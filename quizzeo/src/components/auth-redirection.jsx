'use client'
import { redirect } from "next/navigation"
import { localJwt } from "../lib/local-storage";
import { ReactQueryProvider } from "./react-query";
import { postApi } from "../lib/client-fetch";
import { useQuery } from 'react-query';
import { useEffect } from "react";

export const Redirection = () => {
    const jwt = localJwt.get();

    useEffect(() => {
        if (!jwt){
            redirect('/connexion/login')
        }
    }, [jwt])

    return (
        <ReactQueryProvider>
            <ClientAuth jwt={jwt}/>
        </ReactQueryProvider>
    )
}

const ClientAuth = ({ jwt }) => {
    const { data, error } = useQuery ({
        queryKey: "user-auth",
        queryFn: () => postApi("auth", { jwt }),
        enabled: jwt !== undefined
    })

    if (data) {
        switch(data.user.role) {
            case 'User' : 
                redirect('/user/home');
            case 'QuizAdmin' :
                redirect('/quiz-admin/home');
            case 'UserAdmin' :
                redirect('/user-admin/home');
            case 'QuizCreator' :
                redirect('/quiz-creator/home');
            default:
                redirect('/connexion/login');
        }
    }

    if (error) {
        console.log(error)
        redirect('/connexion/login');
    }
}