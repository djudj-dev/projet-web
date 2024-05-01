import Link from "next/link";
import Image from "next/image";

const AdminNav = () => (
    <nav className="flex flex-col w-[147px] gap-4">
        <Link
            href="/backoffice/quizList"
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
            href="/backoffice/usersList"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/assignementIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Liste des users
        </Link>
        <Link
            href="/backoffice/statistics"
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
        <Link
            href="/connexion/logout"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/assignementIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Déconnexion
        </Link>
    </nav>
);

const QuizAdminNav = () => (
    <nav className="flex flex-col w-[147px] gap-4">
        <Link
            href="/quiz-admin/home"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/dashboardIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Vos Infos
        </Link>
        <Link
            href="/quiz-admin/quiz-list"
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
            href="/quiz-admin/statistics"
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
            href="/connexion/logout"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/assignementIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Déconnexion
        </Link>
    </nav>
)

const QuizCreatorNav = () => (
    <nav className="flex flex-col w-[147px] gap-4">
        <Link
            href="/quiz-creator/home"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/dashboardIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Vos Infos
        </Link>
        <Link
            href="/quiz-creator/quiz-list"
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
            href="/quiz-creator/statistics"
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
            href="/connexion/logout"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/assignementIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Déconnexion
        </Link>
    </nav>
)


const UserNav = () => (
    <nav className="flex flex-col w-[147px] gap-4">
        <Link
            href="/connexion/logout"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/assignementIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Déconnexion
        </Link>
    </nav>
);

export const SideBar = ({ userType }) => {
    console.log(userType);
    return (
        <>
            <aside className="w-1/6 min-w-36 max-w-48  h-screen text-[#84602C] flex flex-col justify-between items-center shadow-custom bg-white">
                <div className="flex flex-col justify-center items-center gap-10">
                    <Image
                        src="/QuizzeoIcon.svg"
                        alt="Logo Quizzeo"
                        className="mt-[37px]"
                        width={81}
                        height={96}
                    />
                    {
                        userType === "Admin" && <AdminNav />
                    }
                    {
                        userType === "QuizAdmin" && <QuizAdminNav />
                    }
                    {
                        userType === "QuizCreator" && <QuizCreatorNav />
                    }
                    {
                        userType === "User" && <UserNav />
                    }
                </div>
            </aside>
        </>
    );
};

export default SideBar;
