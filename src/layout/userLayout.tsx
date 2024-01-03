import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";

export default function UserLayout() {
    return (
        <div className="h-screen w-full flex flex-col">
            <Navbar />
            <main className="flex-grow bg-slate-100  ">
                <Outlet />
            </main>
        </div>
    );
}
