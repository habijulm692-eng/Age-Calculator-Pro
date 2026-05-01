import { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar as CalendarIcon,
  User,
  Menu,
  ChevronRight,
  Clock,
  CalendarDays,
  Baby,
} from "lucide-react";
import { format } from "date-fns";

interface HomeScreenProps {
  key?: string;
  initialDob: Date | null;
  onCalculate: (dob: Date, targetDate: Date) => void;
}

export default function HomeScreen({
  initialDob,
  onCalculate,
}: HomeScreenProps) {
  const [dob, setDob] = useState<string>(
    initialDob ? format(initialDob, "yyyy-MM-dd") : "",
  );
  const [targetDate, setTargetDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [error, setError] = useState<string>("");

  const handleCalculate = () => {
    if (!dob) {
      setError("Please select your Date of Birth");
      return;
    }

    const dobDate = new Date(dob);
    const target = new Date(targetDate);

    if (dobDate > target) {
      setError("Date of birth cannot be after target date");
      return;
    }

    setError("");
    onCalculate(dobDate, target);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex-1 flex flex-col bg-gray-50 absolute inset-0 z-10"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 pt-12 pb-24 px-6 rounded-b-[2.5rem] shadow-lg relative">
        <div className="flex justify-between items-center text-white mb-8">
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">Age Calculator</h1>
          <button className="p-2 bg-white/20 rounded-full">
            <User size={24} />
          </button>
        </div>

        <div className="text-white">
          <h2 className="text-3xl font-bold mb-2">Hello! 👋</h2>
          <p className="text-purple-100">Let's calculate your exact age.</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="flex-1 px-6 -mt-16 relative z-20 overflow-y-auto pb-8">
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="space-y-6">
            {/* DOB Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                Date of Birth
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-500">
                  <CalendarIcon size={20} />
                </div>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                    setError("");
                  }}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none font-medium"
                />
              </div>
            </div>

            {/* Target Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                Today's Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-500">
                  <CalendarDays size={20} />
                </div>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm ml-1"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-purple-500/30 flex items-center justify-center space-x-2"
            >
              <span>Calculate My Age</span>
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Quick Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 ml-2">
            Quick Options
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              onClick={handleCalculate}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-3"
            >
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                <Clock size={24} />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Days until birthday
              </span>
            </motion.button>

            <motion.button
              onClick={handleCalculate}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-3"
            >
              <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center">
                <Baby size={24} />
              </div>
              <span className="text-sm font-medium text-gray-700">
                What day I was born
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
