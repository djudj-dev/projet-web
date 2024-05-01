"use client"
import { useAuth } from "../../../lib/useAuth";
import { QuizResultList } from "../../../components/quiz-admin-list"
import { CreateQuizButton } from "../../../components/create-quiz-button";
import StatsTable from "../../../components/stats-table";


export default function Page () {
    const { user } = useAuth();

    return (
        <div className="flex flex-col mt-[23px] min-w-[800px]">
            <div className="m-12 flex flex-col justify-left bg-[#F0F0F0] h-screen">
                <section className="flex w-full justify-between">
                    <h1 className="text-4xl text-[#84602C]">Statistique des quiz</h1>
                    <CreateQuizButton />
                </section>
                <section className="mt-[50px]">
                    <StatsTable user={user} />
                </section>
            </div>
            
        </div>
    );
}