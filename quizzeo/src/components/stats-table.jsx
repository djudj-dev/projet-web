import React from "react";
import { getApi } from "../lib/client-fetch";
import { useQuery } from "react-query";
import { Spinner } from "./spinner";

export const StatsTable = ({ user }) => {
    const { data } = useQuery ({
        queryKey: "quiz-admin-stat-list",
        queryFn: () => getApi("quiz/"+user.id),
        enabled: user !== undefined
    })

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
                                Nom du quizz
                            </th>
                            <th className="py-3 px-[10px] border border-[#F2F2F2]">
                                Nom du créateur
                            </th>
                            <th className="py-3 px-[10px] border border-[#F2F2F2]">
                                Résultat
                            </th>
                            <th className="py-3 px-[10px] border border-[#F2F2F2]">
                                Status du quiz
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-xs bg-white">
                        {
                            Object.values(data).map((quiz, index) => {
                                const {
                                    title,
                                    creator: {
                                        email
                                    },
                                    results,
                                    enabled
                                } = quiz

                                const sum = results.reduce((previous, current) => {
                                    

                                    return previous + current.score
                                }, 0)

                                const average = sum / results.length
                                return (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {title}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {email}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div
                                                className="rounded-[27px] py-2 px-[30px]"
                                                style={{
                                                    backgroundColor:
                                                        parseInt(average * 100) <= 30
                                                            ? "#FFC9C1" // fond rouge si le résultat est inférieur ou égal à 30%
                                                            : "#DCEED3", // sinon fond vert
                                                }}
                                            >
                                                { average ? `${Math.round(average * 100)} %` : 'Pas de donnée'}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {enabled ? 'Actif' : 'Terminé'}
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
export default StatsTable;
