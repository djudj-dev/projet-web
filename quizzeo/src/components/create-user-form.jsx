"use client";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { postAuthApi } from "../lib/client-fetch";
import { Spinner } from "./spinner";

export const CreateUserForm = ({ user, jwt }) => {
    const { data, error, mutate, isLoading } = useMutation((body) =>
        postAuthApi("auth/user/admin-create", body, jwt)
    );

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
    });

    const onSubmit = ({ email, password, role, enabled }) => {
        mutate({
            password,
            role,
            email,
            enabled,
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
                    la création d'utilisateur a echouer
                </p>
            )}
            {data && (
                <p className="m-auto text-center p-1 px-3 bg-green-400 w-fit my-2 rounded">
                    la création d'utilisateur a reussi
                </p>
            )}
            <div className="mb-6">
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
                    placeholder="Entrez votre mot de passe"
                    required
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
                    required
                />
            </div>
            <div className="mb-6 flex ">
                <div className="mr-12">
                    <label
                        htmlFor="newPassword"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Role
                    </label>
                    <select
                        {...register("role")}
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Entrez votre nouveau mot de passe"
                    >
                        <option value="User">User</option>
                        <option value="QuizCreator">QuizCreator</option>
                        <option value="QuizAdmin">QuizAdmin</option>
                        <option value="UserAdmin">UserAdmin</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="newPassword"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Actif
                    </label>
                    <input
                        {...register("enabled")}
                        type="checkbox"
                        id="enabled"
                        name="enabled"
                        className="w-[25px] h-[25px] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 mt-1"
                        placeholder="Entrez votre nouveau mot de passe"
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="w-[30%] bg-[#CDB46D] text-white py-2 px-4 rounded-md hover:bg-[#F3E999] focus:outline-none focus:bg-[#F3E999] hover:text-[#6A6363] font-bold"
                >
                    Créer l'utilisateur
                </button>
            </div>
        </form>
    );
};
