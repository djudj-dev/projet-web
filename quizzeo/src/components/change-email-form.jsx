'use client' 
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { Spinner } from "./spinner"

import { postApi } from "../lib/client-fetch";

export const ChangeEmailForm = ({ user }) => {

    const { data, error, mutate, isLoading } = useMutation (
        (body) => postApi("/user/change-email", body)
    );

    const { register, handleSubmit, } = useForm({
        shouldUseNativeValidation: true
    });

    const onSubmit = ({ newEmail }) => {
        mutate({
            newEmail,
            userId: user.id
        })
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
            { error && <p className="m-auto text-center p-1 px-3 bg-red-400 w-fit my-2 rounded">le changement d'email a echouer</p> }
            { data && <p className="m-auto text-center p-1 px-3 bg-green-400 w-fit my-2 rounded">le changement d'email a reussi</p> }
            <div className="mb-6">
                <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                   Votre email actuel
                </label>
                <input
                    type="email"
                    id="email"
                    name="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    disabled
                    value={user?.email}
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="newPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Nouvel email
                </label>
                <input
                    {...register('newEmail')}
                    type="email"
                    id="newEmail"
                    name="newEmail"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Entrez votre nouveau mot de passe"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-[#84602C] text-white py-2 px-4 rounded-md hover:bg-[#84602C] focus:outline-none focus:bg-blue-600"
            >
                Changer de mot de passe
            </button>
        </form>
    )
}
