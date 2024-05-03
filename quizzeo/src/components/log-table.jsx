import React from "react";
import { dateFormat } from "../lib/date-format";

//TODO: données à supprimer
const data = [
    {
        userId: "1bf87443-f77d-4c05-9572-6ab3d80daa14",
        ip: "192.168.20.1",
        action: "loggin",
        additionalInformation: "Connexion autorisée",
        date: "2024-05-03 08:57:21.354",
    },
    {
        userId: "1bf87443-f77d-4c05-9572-6ab3d80daa14",
        ip: "192.168.20.1",
        action: "loggin",
        additionalInformation: "Connexion autorisée",
        date: "2024-05-03 08:57:21.354",
    },
    {
        userId: "1bf87443-f77d-4c05-9572-6ab3d80daa14",
        ip: "192.168.20.1",
        action: "loggin",
        additionalInformation: "Connexion autorisée",
        date: "2024-05-03 08:57:21.354",
    },
    {
        userId: "1bf87443-f77d-4c05-9572-6ab3d80daa14",
        ip: "192.168.20.1",
        action: "loggin",
        additionalInformation: "Connexion autorisée",
        date: "2024-05-03 08:57:21.354",
    },
];

const LogTable = () => {
    return (
        <div className=" mt-[46px]">
            <table className="table-auto">
                <thead>
                    <tr className="bg-white text-black text-xs uppercase leading-normal rounded">
                        <th className="py-3 px-[10px] border border-[#F2F2F2]">
                            Numéro
                        </th>{" "}
                        <th className="py-3 px-[10px] border border-[#F2F2F2]">
                            ID de l'utilisateur
                        </th>
                        <th className="py-3 px-[10px] border border-[#F2F2F2]">
                            Adresse IP de l'utilisateur
                        </th>
                        <th className="py-3 px-[10px] border border-[#F2F2F2]">
                            Action
                        </th>
                        <th className="py-3 px-[10px] border border-[#F2F2F2]">
                            Informations additionnelles
                        </th>
                        <th className="py-3 px-[10px] border border-[#F2F2F2]">
                            Date de création
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-xs bg-white">
                    {/* // Boucle sur les données des logs pour générer les lignes du tableau */}
                    {data.map((log, index) => {
                        return (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {log.userId}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {log.ip}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {log.action}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {log.additionalInformation}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {dateFormat(log.date)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default LogTable;
