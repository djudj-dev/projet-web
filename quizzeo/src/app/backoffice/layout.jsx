import SideBar from "../../components/sidebar";

export default function BackOfficeLayout({ children }) {
    return (
        <div className="flex h-screen bg-[#F0F0F0]">
            <SideBar />
            {children}
        </div>
    );
}
