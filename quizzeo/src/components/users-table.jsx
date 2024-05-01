import React from "react";
import { useQuery, useMutation } from "react-query"
import { postApi } from "../lib/client-fetch";
import { Spinner } from "./spinner"
import dateFormat from "../lib/dateFormat";

const RoleSelect = ({ user, actualUser}) => {

    const { error, mutate } = useMutation(body => 
        postApi("user/change-role", body)
    );

    const changeRole = (role, userId, user) => {
        mutate({
            userId,
            newRole: role,
            userToChange: user
        })
    }

    if (error) {
        location.reload();
    }

    if (actualUser.role === "UserAdmin") {
        return (
            <select 
                defaultValue={user.role}
                onChange={(event) => changeRole(
                    event.target.value,
                    actualUser.id,
                    user
                )}
            >
                <option value="User" >User</option>
                <option value="QuizCreator" >QuizCreator</option>
                <option value="QuizAdmin" >QuizAdmin</option>
            </select>
        )
    }

    if (actualUser.role === "GlobalAdmin") {
        return (
            <select defaultValue={user.role}>
                <option value="User" >User</option>
                <option value="QuizCreator" >QuizCreator</option>
                <option value="QuizAdmin" >QuizAdmin</option>
                <option value="UserAdmin" >UserAdmin</option>
            </select>
        )
    }
}

export const UsersTable = ({ user }) => {

    const { data } = useQuery ({
        queryKey: "quiz-admin-list",
        queryFn: () => postApi("user/get-all", { userId : user.id }),
        enabled: user !== undefined
    })

    const { data: mutationData, error, mutate } = useMutation(body => 
        postApi("user/change-status", body)
    );

    const changeUserStatus = (userToChange) => {
        mutate({
            userId: user.id,
            newStatus: !userToChange.enabled,
            userToChange
        })
    }

    if (mutationData) {
        location.reload()
    }

    if (data) {
        return (
            <div className="overflow-x-auto mt-[46px]">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-white text-black text-xs uppercase leading-normal rounded">
                            <th className="py-3 px-[10px] border border-[#F2F2F2]">
                                Numéro
                            </th>
                            <th className="py-3 px-[10px] border border-[#F2F2F2]">
                                Email
                            </th>
                            <th className="py-3 px-[10px] border border-[#F2F2F2]">
                                Rôle
                            </th>
                            <th className="py-3 px-[10px] border border-[#F2F2F2]">
                                Status
                            </th>
                            <th className="py-3 px-[10px] border border-[#F2F2F2]">
                                Date de création
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-xs bg-white">
                        {/* // Boucle sur les données des quiz pour générer les lignes du tableau */}
                        {
                            Object.values(data).map((currentUser, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {currentUser.email}
                                        </td>
                                        <td className="py-3 px-6 text-center">{
                                            <RoleSelect actualUser={user} user={currentUser}/>}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {/* //TODO: mettre en place une fonctionnalité
                                            permettant d'activer / désactiver le status de
                                            l'utilisateur lors d'un clic sur le bouton
                                            ci-dessous */}
                                            <div
                                                onClick={() => changeUserStatus(currentUser)}
                                                className="rounded-[27px] py-2 px-[30px] cursor-pointer"
                                                style={{
                                                    backgroundColor: !currentUser.enabled
                                                        ? "#FFC9C1" // si l'utilisateur est désactivé
                                                        : "#DCEED3", // sinon fond vert
                                                }}
                                            >
                                                {currentUser.enabled ? "Activé" : "Désactivé"}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {dateFormat(currentUser.date)}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    return <Spinner />
};

export default UsersTable;
