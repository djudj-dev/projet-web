import { UsersTable } from "../users-table";

export const UserList = ({ user, jwt }) => (
    <div className="flex flex-col mt-[23px] min-w-[800px]">
        <div className="m-12 flex flex-col justify-left bg-[#F0F0F0]">
            <section className="flex w-full justify-between">
                <h1 className="text-4xl text-[#84602C]">
                    Liste des Utilisateurs
                </h1>
            </section>
            <section className="my-[30px]">
                <UsersTable {...{ user, jwt }} />
            </section>
        </div>
    </div>
);
