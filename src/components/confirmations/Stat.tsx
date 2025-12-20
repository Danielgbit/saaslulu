interface Props {
    label: string;
    value: number;
    success?: boolean;
    error?: boolean;
}

const Stat = ({ label, value, success, error }: Props) => (
    <div
        className={`rounded-xl p-4 text-center border ${success
                ? "bg-green-50 border-green-200 text-green-700"
                : error
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-gray-50 border-gray-200"
            }`}
    >
        <p className="text-xs uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

export default Stat;
