import Sidebar from "@/components/sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">

            <Sidebar />

            <main className="flex-1 min-h-screen bg-gray-900">
                {children}
            </main>
        </div>
    );
}
