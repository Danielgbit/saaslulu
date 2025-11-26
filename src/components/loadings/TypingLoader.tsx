import { motion } from "framer-motion";

export const TypingLoader = () => (
    <div className="flex items-center gap-1 px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl w-fit">
        {[0, 0.15, 0.3].map((delay, i) => (
            <motion.span
                key={i}
                className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay }}
            />
        ))}
    </div>
);