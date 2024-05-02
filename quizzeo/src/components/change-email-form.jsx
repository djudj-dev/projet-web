"use client";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { Spinner } from "./spinner";

import { postApi } from "../lib/client-fetch";

export const ChangeEmailForm = ({ user }) => {
    const { data, error, mutate, isLoading } = useMutation((body) =>
        postApi("/user/change-email", body)
    );

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    });

    const onSubmit = ({ newEmail }) => {
        mutate({
            newEmail,
            userId: user.id,
        });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <form
            className="m-auto bg-white rounded shadow-tile px-12 py-8"
            onSubmit={handleSubmit(onSubmit)}
        >
            {error && (
                <p className="m-auto text-center p-1 px-3 bg-red-400 w-fit my-2 rounded">
                    le changement d'email a echouer
                </p>
            )}
            {data && (
                <p className="m-auto text-center p-1 px-3 bg-green-400 w-fit my-2 rounded">
                    le changement d'email a reussi
                </p>
            )}
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
                    {...register("newEmail")}
                    type="email"
                    id="newEmail"
                    name="newEmail"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Entrez votre nouveau mot de passe"
                />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="w-[30%] bg-[#CDB46D] text-white py-2 px-4 rounded-md hover:bg-[#F3E999] focus:outline-none focus:bg-[#F3E999] hover:text-[#6A6363] font-bold"
                >
                    Changer votre email
                </button>
            </div>
        </form>
    );
};
