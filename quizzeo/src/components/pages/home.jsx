import { QuizResultList } from "../quiz-result-list";
import { ChangePasswordForm } from "../change-password-form";
import { ChangeEmailForm } from "../change-email-form";

export const HomePage = ({ user, jwt }) => (
    <div className="flex flex-col mt-[23px] min-w-[800px]">
        <div className="m-12 flex flex-col justify-left bg-[#F0F0F0]">
            <section className="flex w-full justify-between">
                <h1 className="text-4xl text-[#84602C]">Liste des quiz</h1>
            </section>
            <section className="grid grid-cols-2 gap-[20px] my-[30px]">
                <QuizResultList  {...{ user, jwt }} />
            </section>
            <section className="flex w-full justify-left my-[30px]">
                <h1 className="text-4xl text-[#84602C]">
                    Changer de mot de passe
                </h1>
            </section>
            <section className="m-auto w-4/5 my-[30px]">
                <ChangePasswordForm  {...{ user, jwt }} />
            </section>
            <section className="flex w-full justify-left my-[30px]">
                <h1 className="text-4xl text-[#84602C]">
                    Changer votre email
                </h1>
            </section>
            <section className="m-auto w-4/5 my-[30px]">
                <ChangeEmailForm  {...{ user, jwt }} />
            </section>
        </div>
    </div>
);