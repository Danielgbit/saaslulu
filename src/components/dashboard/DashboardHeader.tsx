export function DashboardHeader({ employee }: { employee: any }) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Bienvenido, {employee?.full_name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
                Aquí puedes ver tus ingresos, servicios realizados y tu calendario.
            </p>
        </div>
    );
}
