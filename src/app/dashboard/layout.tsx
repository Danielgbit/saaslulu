import Sidebar from "@/components/dashboard/SideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">

            <Sidebar />

            <main className="flex-1 min-h-screen bg-gray-50">
                {children}
            </main>
        </div>
    );
}
