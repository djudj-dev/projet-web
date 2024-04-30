import Link from "next/link";
import Image from "next/image";

//FIXME: Changement de couleur des svg en blanc lors du mouse hover
const SideBar = () => {
    return (
        <>
            <aside className="fixed top-0 left-0 h-screen text-[#84602C] flex flex-col justify-between items-center w-[197px] shadow-custom bg-white">
                <div className="flex flex-col justify-center items-center gap-10">
                    <Image
                        src="/QuizzeoIcon.svg"
                        alt="Logo Quizzeo"
                        className="mt-[37px]"
                        width={81}
                        height={96}
                    />
                    <nav className="flex flex-col w-[147px] gap-4">
                        <Link
                            href="#"
                            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
                        >
                            <Image
                                src="/dashboardIcon.svg"
                                alt=""
                                className=""
                                width={18}
                                height={18}
                            />
                            Quiz
                        </Link>
                        <Link
                            href="#"
                            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
                        >
                            <Image
                                src="/assignementIcon.svg"
                                alt=""
                                className=""
                                width={18}
                                height={18}
                            />
                            Répondants
                        </Link>
                        <Link
                            href="#"
                            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
                        >
                            <Image
                                src="/leaderboardIcon.svg"
                                alt=""
                                className=""
                                width={18}
                                height={18}
                            />
                            Statistiques
                        </Link>
                        <Link
                            href="#"
                            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
                        >
                            <Image
                                src="/splitscreenIcon.svg"
                                alt=""
                                className=""
                                width={18}
                                height={18}
                            />
                            Quiz
                        </Link>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
