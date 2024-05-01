import React from "react";
import CreateQuizButton from "../../../components/CreateQuizButton";
import UsersTable from "../../../components/usersTable";
import { user } from "../../../lib/user";

// Récupère les informations concernant la totalité des utilisateurs
const getAllUsersData = await user.getAllUsers();

export default function Page() {
    return (
        <main className="flex flex-col mt-[23px] min-w-[800px]">
            <section className="flex justify-between">
                <h1 className="text-4xl text-[#84602C]">
                    Liste des utilisateurs
                </h1>
                <CreateQuizButton />
            </section>
            <section>
                <UsersTable usersData={getAllUsersData} />
            </section>
        </main>
    );
}
