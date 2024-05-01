import React from "react";
import dateFormat from "../lib/dateFormat";

// Composant fonctionnel StatsTable qui prend les données des quiz en prop
const UsersTable = ({ usersData }) => {
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
                    {usersData.map((user, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {index + 1}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {user.email}
                            </td>
                            <td className="py-3 px-6 text-left">{user.role}</td>
                            <td className="py-3 px-6 text-center">
                                {/* //TODO: mettre en place une fonctionnalité
                                permettant d'activer / désactiver le status de
                                l'utilisateur lors d'un clic sur le bouton
                                ci-dessous */}
                                <div
                                    className="rounded-[27px] py-2 px-[30px] cursor-pointer"
                                    style={{
                                        backgroundColor: user.enabled
                                            ? "#FFC9C1" // si l'utilisateur est désactivé
                                            : "#DCEED3", // sinon fond vert
                                    }}
                                >
                                    {user.enabled ? "Activé" : "Désactivé"}
                                </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                                {dateFormat(user.date)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default UsersTable;
