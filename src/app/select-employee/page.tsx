import { EmployeeSelector } from "@/components/EmployeeSelector";

export default function SelectEmployeePage() {
    return (
        <div className="min-h-screen flex justify-center items-start pt-20 bg-gray-100 dark:bg-gray-900">
            <EmployeeSelector />
        </div>
    );
}
