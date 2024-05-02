"use client"
import { useAuth } from "../../../lib/useAuth";
import { CreateUserForm } from "../../../components/create-user-form";
import { ChangeEmailForm } from "../../../components/change-email-form";

export default function Page () {
    const { user, jwt } = useAuth('GlobalAdmin');

    return (
        <div className="flex flex-col mt-[23px] min-w-[800px]">
            <div className="m-12 flex flex-col justify-left bg-[#F0F0F0] h-screen">
                <section className="flex w-full justify-between">
                    <h1 className="text-4xl text-[#84602C]">Créer un utilisateur</h1>
                </section>
                <section className="m-auto w-4/5 my-[30px]">
                    <CreateUserForm {...{ user, jwt }} />
                </section>
            </div>
        </div>
    );
}