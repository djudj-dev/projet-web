import React from "react";
import Image from "next/image";
import Link from "next/link";

const QuizListTile = ({
    setTileStatus, // Prop pour le statut du quiz (ex: "Brouillon")
    setTileDate, // Prop pour la date de création du quiz
    setTileTitle, // Prop pour le titre du quiz
    setTileOwner, // Prop pour le propriétaire/créateur du quiz
    setTileAnswersNumber, // Prop pour le nombre de réponses au quiz
}) => {
    return (
        <div className="flex flex-col gap-3 w-[412px] shadow-tile bg-white rounded p-[10px] text-sm">
            {/* Conteneur principal avec styles pour la tuile */}
            <div className="flex justify-between">
                {/* Conteneur pour le statut et la date de création */}
                <div className=" flex items-center justify-center w-[80px] h-[33px] rounded px-[6px] py-2 bg-[#FFC9C1] text-[#6A0808]">
                    {setTileStatus}
                </div>
                <p className="text-[#6A6363] flex items-center justify-center">
                    Créé le {setTileDate}
                </p>
            </div>
            <p>
                {setTileTitle}:<br></br>
                {/* Affiche le propriétaire en gras */}
                <b>{setTileOwner}</b>
            </p>
            <div className="flex justify-between items-center">
                {/* Conteneur pour le nombre de réponses */}
                <div className="flex justify-between items-center gap-[6px] bg-[#CDB46D] text-white w-[131px] h-[32px] px-[10px] py-[6px] rounded">
                    <Image
                        src="/visibilityIcon.svg"
                        alt=""
                        className=""
                        width={18.33}
                        height={12.5}
                    />
                    {setTileAnswersNumber} réponses
                </div>
                {/* Lien pour voir les statistiques */}
                <Link
                    href="#"
                    className="flex items-center justify-between w-[193px] h-[32px] rounded border border-[#84602C] gap-[6px] text-[#84602C] px-[8px] py-[6px]"
                >
                    <Image
                        src="/barchartIcon.svg"
                        alt=""
                        className=""
                        width={10.67}
                        height={10.67}
                    />
                    Voir les statistiques
                </Link>
            </div>
        </div>
    );
};

export default QuizListTile;
