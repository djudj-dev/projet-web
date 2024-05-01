import React from "react";
import Image from "next/image";
import Link from "next/link";

export const QuizStatList = ({ quiz }) => {

    const {
        title,
        id,
        creatorId,
        date,
        results,
        status
    } = quiz

    const getQuizLink = () => {
        const link = window.location.origin + '/quiz/' + id
        navigator.clipboard.writeText(link);
    }

    return (
        <div className="flex flex-col gap-3 w-11/12 m-auto shadow-tile bg-white rounded p-[10px] text-sm">
            {/* Conteneur principal avec styles pour la tuile */}
            <div className="flex justify-between">
                {/* Conteneur pour le statut et la date de création */}
                <div className=" flex items-center justify-center w-[80px] h-[33px] rounded px-[6px] py-2 bg-[#FFC9C1] text-[#6A0808]">
                    {status}
                </div>
                <p className="text-[#6A6363] flex items-center justify-center">
                    Créé le {date}
                </p>
            </div>
            <p>
                {title}:<br></br>
                {/* Affiche le propriétaire en gras */}
                <b>{creatorId}</b>
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
                    {results.length} réponses
                </div>
                {/* Lien pour voir les statistiques */}
                <Link
                    onClick={getQuizLink}
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
                    Copier le liens du quiz
                </Link>
            </div>
        </div>
    );
};
