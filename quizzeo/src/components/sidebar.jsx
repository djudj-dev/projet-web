import Link from "next/link";
import Image from "next/image";

const GlobalAdminNav = () => (
    <nav className="flex flex-col w-[147px] gap-4">
        <Link
            href="/global-admin/home"
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
            href="/global-admin/user-list"
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
            href="/global-admin/create-user"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/plus-circle.svg"
                alt=""
                className=""
                width={22}
                height={22}
            />
            Créer un user
        </Link>
        <Link
            href="/global-admin/statistics"
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
            href="/global-admin/quiz-list"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/splitscreenIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Liste des quiz
        </Link>
        <Link
            href="/connexion/logout"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/closeIcon.svg"
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
                src="/splitscreenIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            List des quiz
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
                src="/closeIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Déconnexion
        </Link>
    </nav>
);

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
                src="/splitscreenIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            List des quiz
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
                src="/closeIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Déconnexion
        </Link>
    </nav>
);

const UserAdminNav = () => (
    <nav className="flex flex-col w-[147px] gap-4">
        <Link
            href="/user-admin/home"
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
            href="/user-admin/user-list"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/leaderboardIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Utilisateurs
        </Link>
        <Link
            href="/connexion/logout"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/closeIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Déconnexion
        </Link>
    </nav>
);

const UserNav = () => (
    <nav className="flex flex-col w-[147px] gap-4">
        <Link
            href="/connexion/logout"
            className="py-1 px-1 rounded hover:bg-[#84602C] hover:text-white flex gap-[10px]"
        >
            <Image
                src="/closeIcon.svg"
                alt=""
                className=""
                width={18}
                height={18}
            />
            Déconnexion
        </Link>
    </nav>
);

export const SideBar = ({ userType }) => (
    <>
        <aside className="w-1/6 min-w-36 max-w-48 text-[#84602C] flex flex-col justify-between items-center shadow-custom bg-white sticky top-0 left-0 h-screen">
            <div className="flex flex-col justify-center items-center gap-10">
                <Image
                    src="/QuizzeoIcon.svg"
                    alt="Logo Quizzeo"
                    className="mt-[37px]"
                    width={81}
                    height={96}
                />
                {userType === "GlobalAdmin" && <GlobalAdminNav />}
                {userType === "QuizAdmin" && <QuizAdminNav />}
                {userType === "UserAdmin" && <UserAdminNav />}
                {userType === "QuizCreator" && <QuizCreatorNav />}
                {userType === "User" && <UserNav />}
            </div>
        </aside>
    </>
);

export default SideBar;
