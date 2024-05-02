import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useMutation } from "react-query";
import { postAuthApi } from "../lib/client-fetch";
import { Spinner } from "./spinner";

export const QuizStatList = ({ quiz, user, jwt }) => {
    const { title, id, creatorId, date, results, enabled } = quiz;

    const { data, isLoading, mutate } = useMutation((body) =>
        postAuthApi("auth/quiz/change-status", body, jwt)
    );

    const getQuizLink = () => {
        const link = window.location.origin + "/quiz/" + id;
        navigator.clipboard.writeText(link);
    };

    const changeQuizStatus = () => {
        if (user.role === "QuizCreator" || user.role === "GlobalAdmin") {
            mutate({
                quizId: quiz.id,
                status: !enabled,
            });
        }

        if (user.role == "QuizAdmin" && enabled) {
            mutate({
                quizId: quiz.id,
                status: false,
            });
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (data) {
        location.reload();
    }

    return (
        <div className="flex flex-col gap-3 w-11/12 m-auto shadow-tile bg-white rounded p-[10px] text-sm">
            {/* Conteneur principal avec styles pour la tuile */}
            <div className="flex justify-between">
                {/* Conteneur pour le statut et la date de création */}
                <div
                    onClick={changeQuizStatus}
                    className="cursor-pointer flex items-center justify-center w-[80px] h-[33px] rounded px-[6px] py-2 text-[#6A0808]"
                    style={{
                        backgroundColor: !enabled ? "#FFC9C1" : "#DCEED3",
                    }}
                >
                    {enabled ? "Actif" : "Terminé"}
                </div>
                <p className="text-[#6A6363] flex items-center justify-center">
                    Créé le{" "}
                    {new Intl.DateTimeFormat("en-US").format(new Date(date))}
                </p>
            </div>
            <p>
                {title}
                <br></br>
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
