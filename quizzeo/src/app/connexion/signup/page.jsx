"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { postApi } from "../../../lib/client-fetch";
import { ReactQueryProvider } from "../../../components/react-query";
import { Captcha } from "../../../components/captcha";
import { useMutation } from "react-query";
import { Redirection } from "../../../components/auth-redirection";
import { localJwt } from "../../../lib/local-storage";
import Image from "next/image";

const SignupForm = () => {
    const [errorText, setErrorText] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [captchaResolve, setCaptaResolve] = useState(false);

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    });
    const { data, error, mutate } = useMutation((body) =>
        postApi("signup", body)
    );

    const onSubmit = async ({ email, password, confirmPassword }) => {
        if (!email || !password || !confirmPassword || !captchaResolve) {
            return;
        }

        if (password !== confirmPassword) {
            setErrorText("Les mot de passe ne correspondent pas");
        } else {
            setErrorText();
        }

        if (!errorText) {
            mutate({ email, password });
        }
    };

    useMemo(() => {
        if (!error && data && data.jwt) {
            localJwt.set(data.jwt);
            setRedirect(true);
        }
    }, [data, error]);

    if (redirect) {
        return (
            <p>
                Votre Inscription a été prise compte. Vous pourrez vous
                connecter lorsque qu'un administrateur aura activé votre compte.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
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
                <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
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
            <div className="mb-6">
                <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Confirmer le Mot de passe
                </label>
                <input
                    {...register("confirmPassword")}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Confirmez votre mot de passe"
                />
            </div>
            <Captcha setCaptaResolve={setCaptaResolve} />
            {errorText && (
                <p className="text-center mb-4 font-bold text-red-600">
                    {errorText}
                </p>
            )}
            <button
                type="submit"
                className="w-full font-bold bg-[#CDB46D] text-white py-2 px-4 rounded-md hover:bg-[#F3E999] focus:outline-none focus:bg-[#F3E999] hover:text-[#696262]"
            >
                Créer un Compte
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
                        <h2 className="text-2xl font-semibold mb-6 text-[#696262]">
                            CREER UN COMPTE
                        </h2>
                        <Image
                            src="/QuizzeoIcon.svg"
                            alt="Logo Quizzeo"
                            className=""
                            width={81}
                            height={96}
                        />
                    </div>
                    <SignupForm />
                    <p className="text-sm mt-4 text-center">
                        Vous avez déjà un compte ?{" "}
                        <Link
                            href="/connexion/login"
                            className="text-blue-500 hover:underline"
                        >
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </ReactQueryProvider>
    );
}
