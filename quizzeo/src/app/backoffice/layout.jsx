import SideBar from "../../components/sidebar";

export default function BackOfficeLayout({ children }) {
    return (
        <div className="flex h-screen">
            <SideBar />
            {children}
        </div>
    );
}
