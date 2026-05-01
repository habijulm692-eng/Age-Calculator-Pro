import { motion } from "motion/react";
import { CalendarDays } from "lucide-react";

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center justify-center text-white p-6 z-50"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
        className="mb-8 bg-white/20 p-6 rounded-full backdrop-blur-sm"
      >
        <CalendarDays size={80} className="text-white" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-4xl font-bold mb-4 text-center tracking-tight"
      >
        How Old Am I
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-blue-100 text-lg max-w-xs"
      >
        Check your current age based upon your date of birth
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12"
      >
        <div className="flex space-x-2">
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
