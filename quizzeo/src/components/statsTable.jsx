import React from "react";

// Composant fonctionnel StatsTable qui prend les données des quiz en prop
const StatsTable = ({ quizData }) => {
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
                            Date de fin
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-xs bg-white">
                    {/* // Boucle sur les données des quiz pour générer les lignes du tableau */}
                    {quizData.map((quiz, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {index + 1}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {quiz.nomDuQuiz}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {quiz.createurQuiz}
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div
                                    className="rounded-[27px] py-2 px-[30px]"
                                    style={{
                                        backgroundColor:
                                            parseInt(quiz.resultat) <= 30
                                                ? "#FFC9C1" // fond rouge si le résultat est inférieur ou égal à 30%
                                                : "#DCEED3", // sinon fond vert
                                    }}
                                >
                                    {quiz.resultat} %
                                </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                                {quiz.dateFin}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default StatsTable;
