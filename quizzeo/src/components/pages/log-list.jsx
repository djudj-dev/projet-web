import { LogTable } from "../log-table";

export const LogList = ({ jwt }) => (
    <div className="flex flex-col mt-[23px] min-w-[800px]">
        <div className="m-12 flex flex-col justify-left bg-[#F0F0F0] h-screen">
            <section className="flex w-full justify-between">
                <h1 className="text-4xl text-[#84602C]">Journalisation</h1>
            </section>
            <section>
                <LogTable jwt={jwt}/>
            </section>
        </div>
    </div>
);
