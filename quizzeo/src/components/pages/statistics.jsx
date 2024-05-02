import { CreateQuizButton } from "../create-quiz-button";
import StatsTable from "../stats-table";

export const Statistics = ({ user, jwt }) => (
    <div className="flex flex-col mt-[23px] min-w-[800px]">
        <div className="m-12 flex flex-col justify-left bg-[#F0F0F0] h-screen">
            <section className="flex w-full justify-between">
                <h1 className="text-4xl text-[#84602C]">Statistique des quiz</h1>
                <CreateQuizButton />
            </section>
            <section className="mt-[50px]">
                <StatsTable {...{ user, jwt }} />
            </section>
        </div>
    </div>
);
