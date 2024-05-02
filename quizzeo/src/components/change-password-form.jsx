"use client";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { postApi } from "../lib/client-fetch";
import { Spinner } from "./spinner";

export const ChangePasswordForm = ({ user }) => {
    const { data, error, mutate, isLoading } = useMutation((body) =>
        postApi("/user/change-password", body)
    );

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    });

    const onSubmit = ({ password, newPassword }) => {
        mutate({
            password,
            newPassword,
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
                    Le changement de mot de passe a échoué
                </p>
            )}
            {data && (
                <p className="m-auto text-center p-1 px-3 bg-green-400 w-fit my-2 rounded">
                    Le changement de mot de passe a réussi
                </p>
            )}
            <div className="mb-6">
                <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Mot de passe actuel
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
                    htmlFor="newPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Nouveau mot de passe
                </label>
                <input
                    {...register("newPassword")}
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Entrez votre nouveau mot de passe"
                />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="w-[30%] bg-[#CDB46D] text-white py-2 px-4 rounded-md hover:bg-[#F3E999] focus:outline-none focus:bg-[#F3E999] hover:text-[#6A6363] font-bold"
                >
                    Changer de mot de passe
                </button>
            </div>
        </form>
    );
};
