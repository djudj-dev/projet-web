"use client";
import { useQuery } from "react-query";
import { useAuth } from "../../../lib/useAuth";
import { QuizResultList } from "../../../components/quiz-result-list";
import { ChangePasswordForm } from "../../../components/change-password-form";
import CreateQuizButton from "../../../components/create-quiz-button";
import { ChangeEmailForm } from "../../../components/change-email-form";

export default function Page() {
    const { user } = useAuth("QuizAdmin");

    return (
        <div className="flex flex-col mt-[23px] min-w-[800px]">
            <div className="m-12 flex flex-col justify-left bg-[#F0F0F0]">
                <section className="flex w-full justify-between">
                    <h1 className="text-4xl text-[#84602C]">Liste des quiz</h1>
                </section>
                <section className="grid grid-cols-2 gap-[20px] my-[30px]">
                    <QuizResultList user={user} />
                </section>
                <section className="flex w-full justify-left my-[30px]">
                    <h1 className="text-4xl text-[#84602C]">
                        Changer de mot de passe
                    </h1>
                </section>
                <section className="m-auto w-4/5 my-[30px]">
                    <ChangePasswordForm user={user} />
                </section>
                <section className="flex w-full justify-left my-[30px]">
                    <h1 className="text-4xl text-[#84602C]">
                        Changer votre email
                    </h1>
                </section>
                <section className="m-auto w-4/5 my-[30px]">
                    <ChangeEmailForm user={user} />
                </section>
            </div>
        </div>
    );
}
