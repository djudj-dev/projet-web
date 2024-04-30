import SideBar from "../../components/sidebar";

export default function BackOfficeLayout({ children }) {
    return (
        <div className="flex justify-center bg-[#F0F0F0] h-screen">
            <SideBar />
            {children}
        </div>
    );
}
