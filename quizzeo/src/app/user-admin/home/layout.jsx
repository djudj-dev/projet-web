"use client"
import SideBar from "../../../components/sidebar";
import { ReactQueryProvider } from "../../../components/react-query";

export default function Page ({ children }) {
    
    return (
        <div className="flex justify-between bg-[#F0F0F0] h-screen">
            <SideBar userType={"UserAdmin"}/>
            <div className="w-5/6 px-16">
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </div>
        </div>
    );
}