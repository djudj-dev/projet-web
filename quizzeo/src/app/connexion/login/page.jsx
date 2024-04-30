'use client'
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { postApi } from "../../../lib/client-fetch";
import { ReactQueryProvider } from "../../../components/react-query";
import { useMutation } from "react-query";
import { Captcha } from "../../../components/captcha";
import { Redirection } from "../../../components/client-auth";
import { localJwt } from "../../../lib/local-storage";

const LoginForm = () => {
    const [captchaResolve, setCaptaResolve] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true
    });
    const { data, error, mutate } = useMutation(body => 
        postApi("login", body)
    );

    const onSubmit = async ({ email, password}) => {
        
        if(!email || !password || !captchaResolve) {
            console.log(false)
            return 
        }

        mutate({ email, password })

        if(!error && data && data.jwt) {
            localJwt.set(data.jwt);
            setRedirect(true);
        }
    }

    useMemo(() => {
        if (!error && data && data.jwt) {
            localJwt.set(data.jwt);
            setRedirect(true);
        }
    },[data, error])

    if (redirect) {
        return <Redirection />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Email
                </label>
                <input
                    {...register('email')}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Entrez votre email"
                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Mot de passe
                </label>
                <input
                    {...register('password')}
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Entrez votre mot de passe"
                />
            </div>
            <Captcha setCaptaResolve={setCaptaResolve}/>
            {data === "Forbidden" && <p className="text-center font-bold text-red-600 mb-4">L'identification à echoué</p> }
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Se Connecter
            </button>
        </form>
    );
};

export default function Page() {
    return (
        <ReactQueryProvider>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">CONNEXION</h2>
                    <LoginForm />
                    <p className="text-sm mt-4">
                        Vous n'avez pas de compte ?{" "}
                        <Link
                            href="/connexion/signup"
                            className="text-blue-500 hover:underline"
                        >
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </ReactQueryProvider>
    );
};
