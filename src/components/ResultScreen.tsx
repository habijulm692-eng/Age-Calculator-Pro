import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Gift, Star } from "lucide-react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInWeeks,
  addYears,
  addMonths,
  format,
  getDay,
  isBefore,
} from "date-fns";

interface ResultScreenProps {
  key?: string;
  dob: Date;
  targetDate: Date;
  onBack: () => void;
}

export default function ResultScreen({
  dob,
  targetDate,
  onBack,
}: ResultScreenProps) {
  // Exact Age Calculation
  const years = differenceInYears(targetDate, dob);
  const dateAfterYears = addYears(dob, years);
  const months = differenceInMonths(targetDate, dateAfterYears);
  const dateAfterMonths = addMonths(dateAfterYears, months);
  const days = differenceInDays(targetDate, dateAfterMonths);

  // Total Calculations
  const totalMonths = differenceInMonths(targetDate, dob);
  const totalWeeks = differenceInWeeks(targetDate, dob);
  const totalDays = differenceInDays(targetDate, dob);

  // Approximate Time
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Next Birthday
  let nextBirthday = new Date(
    targetDate.getFullYear(),
    dob.getMonth(),
    dob.getDate(),
  );
  if (
    isBefore(nextBirthday, targetDate) ||
    (nextBirthday.getMonth() === targetDate.getMonth() &&
      nextBirthday.getDate() === targetDate.getDate() &&
      years > 0)
  ) {
    nextBirthday = addYears(nextBirthday, 1);
  }

  const daysToNextBirthday = differenceInDays(nextBirthday, targetDate);
  const monthsToNextBirthday = Math.floor(daysToNextBirthday / 30); // Approximate
  const remainingDaysToNextBirthday = daysToNextBirthday % 30;

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const bornDay = weekdays[getDay(dob)];
  const nextBirthdayDay = weekdays[getDay(nextBirthday)];

  const StatBox = ({
    label,
    value,
    colorClass,
  }: {
    label: string;
    value: number | string;
    colorClass: string;
  }) => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm ${colorClass}`}
    >
      <span className="text-2xl font-bold mb-1">{value}</span>
      <span className="text-xs font-medium uppercase tracking-wider opacity-80">
        {label}
      </span>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex-1 flex flex-col bg-gray-50 absolute inset-0 z-30"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 pt-12 pb-8 px-6 shadow-md relative z-20">
        <div className="flex items-center text-white">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold ml-4">Your Age Result</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Main Age Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -z-10 opacity-50" />

          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <Star size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Exact Age</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StatBox
              label="Years"
              value={years}
              colorClass="bg-purple-50 text-purple-700"
            />
            <StatBox
              label="Months"
              value={months}
              colorClass="bg-blue-50 text-blue-700"
            />
            <StatBox
              label="Days"
              value={days}
              colorClass="bg-indigo-50 text-indigo-700"
            />
          </div>
        </motion.div>

        {/* Next Birthday Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-3xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Gift size={20} />
              </div>
              <h2 className="text-lg font-bold">Next Birthday</h2>
            </div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {nextBirthdayDay}
            </span>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/80 text-sm mb-1">Remaining Time</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">
                  {monthsToNextBirthday}
                </span>
                <span className="text-sm font-medium">Months</span>
                <span className="text-3xl font-bold ml-2">
                  {remainingDaysToNextBirthday}
                </span>
                <span className="text-sm font-medium">Days</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Extra Info Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-md p-6 border border-gray-100"
        >
          <h3 className="text-gray-800 font-bold mb-4 flex items-center">
            <Clock size={18} className="mr-2 text-gray-400" />
            Total Time Passed
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500">Total Months</span>
              <span className="font-semibold text-gray-800">
                {totalMonths.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500">Total Weeks</span>
              <span className="font-semibold text-gray-800">
                {totalWeeks.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500">Total Days</span>
              <span className="font-semibold text-gray-800">
                {totalDays.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500">Total Hours</span>
              <span className="font-semibold text-gray-800">
                {totalHours.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500">Total Minutes</span>
              <span className="font-semibold text-gray-800">
                {totalMinutes.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Born Day */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-teal-50 rounded-2xl p-4 flex items-center justify-between border border-teal-100 mb-8"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <span className="text-teal-900 font-medium">
              You were born on a
            </span>
          </div>
          <span className="text-teal-700 font-bold text-lg">{bornDay}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
