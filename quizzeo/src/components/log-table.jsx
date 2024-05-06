"use client"
import React from "react";
import { dateFormat } from "../lib/date-format";
import { getAuthApi } from "../lib/client-fetch";
import { useQuery } from "react-query";
import { Spinner } from "./spinner";

export const LogTable = ({ jwt }) => {

    const { data } = useQuery({
        queryKey: "user-logs-list",
        queryFn: () => getAuthApi("auth/logs", jwt),
        enabled: jwt !== undefined,
    });

    if (!data) {
        return <Spinner />
    }

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
                    { 
                         Object.values(data).map(({ip, userId, action, additionalInformation, date}, index) => {
                            return (
                                <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {userId}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {ip}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {action}
                                </td>
                                <td className="py-3 px-6 text-center overflow-scroll">
                                    {additionalInformation}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {dateFormat(date)}
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

