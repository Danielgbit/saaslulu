import EmployeesStats from "@/components/dashboard/EmployeesStats";

export default function EmployeesPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Empleados</h1>
            <EmployeesStats />
        </div>
    );
}
