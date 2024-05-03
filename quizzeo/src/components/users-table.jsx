import React from "react";
import { useQuery, useMutation } from "react-query";
import { getAuthApi, postAuthApi } from "../lib/client-fetch";
import { Spinner } from "./spinner";
import { dateFormat } from "../lib/date-format";

const RoleSelect = ({ user, actualUser, jwt }) => {
    const { error, mutate } = useMutation((body) =>
        postAuthApi("auth/user/change-role", body, jwt)
    );

    const commonCss =
        "w-[60%] h-[30px] border border-[#CFCFCF] rounded hover:border-gray-500 focus:outline-none focus:shadow-outline";

    const changeRole = (role, user) => {
        mutate({
            newRole: role,
            userToChange: user,
        });
    };

    if (error) {
        location.reload();
    }

    if (actualUser.role === "UserAdmin") {
        return (
            <select
                className={commonCss}
                defaultValue={user.role}
                onChange={(event) =>
                    changeRole(event.target.value, user)
                }
            >
                <option value="User">User</option>
                <option value="QuizCreator">QuizCreator</option>
                <option value="QuizAdmin">QuizAdmin</option>
            </select>
        );
    }

    if (actualUser.role === "GlobalAdmin") {
        return (
            <select defaultValue={user.role} className={commonCss}>
                <option value="User">User</option>
                <option value="QuizCreator">QuizCreator</option>
                <option value="QuizAdmin">QuizAdmin</option>
                <option value="UserAdmin">UserAdmin</option>
            </select>
        );
    }
};

export const UsersTable = ({ user, jwt }) => {
    const { data } = useQuery({
        queryKey: "quiz-admin-list",
        queryFn: () => getAuthApi("auth/user/get-all", jwt),
        enabled: user !== undefined,
    });

    const {
        data: mutationData,
        error,
        mutate,
    } = useMutation((body) => postAuthApi("auth/user/change-status", body, jwt));

    const changeUserStatus = (userToChange) => {
        mutate({
            newStatus: !userToChange.enabled,
            userToChange,
        });
    };

    if (mutationData) {
        location.reload();
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
                        {Object.values(data).map((currentUser, index) => {
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
                                    <td className="py-3 px-6 text-center">
                                        {
                                            <RoleSelect
                                                actualUser={user}
                                                user={currentUser}
                                            />
                                        }
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div
                                            onClick={() =>
                                                changeUserStatus(currentUser)
                                            }
                                            className="rounded-[27px] py-2 cursor-pointer"
                                            style={{
                                                backgroundColor:
                                                    !currentUser.enabled
                                                        ? "#FFC9C1" // si l'utilisateur est désactivé
                                                        : "#DCEED3", // sinon fond vert
                                            }}
                                        >
                                            {currentUser.enabled
                                                ? "Activé"
                                                : "Désactivé"}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {dateFormat(currentUser.date)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    return <Spinner />;
};

export default UsersTable;
