/**
 * Status Badge Component
 * Renders a colored badge based on appointment status.
 * Updated to include the new "scheduled" status.
 * All comments are in English following user preferences.
 */

interface Props {
    status: "scheduled" | "confirmed" | "in-progress" | "completed";
}

// Color mapping for each status
const colors = {
    scheduled: "bg-purple-500", // New status color
    confirmed: "bg-yellow-500",
    "in-progress": "bg-blue-500",
    completed: "bg-green-600",
};

export default function StatusBadge({ status }: Props) {
    // Render a colored badge with dynamic styles
    // Spanish label mapping for display purposes
    const labels = {
        scheduled: "Programada",
        confirmed: "Confirmada",
        "in-progress": "En progreso",
        completed: "Completada",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${colors[status]}`}
        >
            {labels[status]}
        </span>
    );
}
