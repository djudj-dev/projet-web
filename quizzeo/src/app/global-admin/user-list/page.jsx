"use client"
import { useAuth } from "../../../lib/useAuth";
import { UsersTable } from "../../../components/users-table"

export default function Page () {
    const { user } = useAuth('GlobalAdmin');

    return (
        <div className="flex flex-col mt-[23px] min-w-[800px]">
            <div className="m-12 flex flex-col justify-left bg-[#F0F0F0] h-screen">
                <section className="flex w-full justify-between">
                    <h1 className="text-4xl text-[#84602C]">Liste des Utilisateurs</h1>
                </section>
                <section className="my-[30px]">
                    <UsersTable user={user} />
                </section>
            </div>
            
        </div>
    );
}