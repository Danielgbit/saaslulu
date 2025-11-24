import { DollarSign, ListChecks, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export function StatsCards({ completedServices, totalIncome }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center gap-4"
            >
                <DollarSign size={40} className="text-green-500" />
                <div>
                    <p className="text-gray-500 text-sm">Ingresos totales</p>
                    <h2 className="text-2xl font-bold">{completedServices.length}</h2>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center gap-4"
            >
                <ListChecks size={40} className="text-blue-500" />
                <div>
                    <p className="text-gray-500 text-sm">Citas realizadas</p>
                    <h2 className="text-2xl font-bold">{completedServices.length}</h2>
                </div>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => window.open(`https://calendar.google.com/calendar/u/0/r`, "_blank")}
                className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl flex items-center gap-4 transition"
            >
                <Calendar size={40} />
                <div>
                    <p className="text-sm opacity-80">Calendario</p>
                    <h2 className="text-xl font-semibold">Abrir Calendar</h2>
                </div>
            </motion.button>
        </div>
    );
}
