"use client";
import Link from "next/link";
import dynamic from "next/dynamic"
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { postApi } from "../../../lib/client-fetch";
import { ReactQueryProvider } from "../../../components/react-query";
import { useMutation } from "react-query";
import { Redirection } from "../../../components/auth-redirection";
import { localJwt } from "../../../lib/local-storage";

const Captcha = dynamic(() => import(
    '../../../components/captcha').then((mod) => mod.Captcha), 
    { ssr: false }
)

const LoginForm = () => {
    const [captchaResolve, setCaptaResolve] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    });

    
    const { data, error, mutate } = useMutation((body) =>
        postApi("login", body)
    );

    const onSubmit = async ({ email, password }) => {
        if (!email || !password || !captchaResolve) {
            return;
        }

        mutate({ email, password });

        if (!error && data && data.jwt) {
            localJwt.set(data.jwt);
            setRedirect(true);
        }
    };

    useMemo(() => {
        if (!error && data && data.jwt) {
            localJwt.set(data.jwt);
            setRedirect(true);
        }
    }, [data, error]);

    if (redirect) {
        return <Redirection />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    {...register("email")}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Entrez votre email"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Mot de passe
                </label>
                <input
                    {...register("password")}
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Entrez votre mot de passe"
                />
            </div>
            <Captcha setCaptaResolve={setCaptaResolve} />
            {error && (
                <p className="text-center font-bold text-red-600 mb-4">
                    L'identification a échoué
                </p>
            )}
            <button
                type="submit"
                className="w-full font-bold bg-[#CDB46D] text-white py-2 px-4 rounded-md hover:bg-[#F3E999] focus:outline-none focus:bg-[#F3E999] hover:text-[#696262]"
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
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl text-[#696262] font-semibold mb-6">
                            CONNEXION
                        </h2>
                        <Image
                            src="/QuizzeoIcon.svg"
                            alt="Logo Quizzeo"
                            className=""
                            width={81}
                            height={96}
                        />
                    </div>
                    <LoginForm />
                    <p className="text-sm mt-4 text-center">
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
}
