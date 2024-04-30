import SideBar from "../../components/sidebar";

export default function BackOfficeLayout({ children }) {
    return (
        <div className="flex justify-between bg-[#F0F0F0] h-screen">
            <SideBar userType={"Admin"}/>
            <div className="w-5/6 px-16">
                {children}
            </div>
        </div>
    );
}
