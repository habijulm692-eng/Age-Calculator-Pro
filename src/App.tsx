/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./components/HomeScreen";
import ResultScreen from "./components/ResultScreen";

export type Screen = "splash" | "home" | "result";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [dob, setDob] = useState<Date | null>(null);
  const [targetDate, setTargetDate] = useState<Date>(new Date());

  useEffect(() => {
    // Load saved DOB
    const savedDob = localStorage.getItem("userDob");
    if (savedDob) {
      setDob(new Date(savedDob));
    }

    // Splash screen timer
    const timer = setTimeout(() => {
      setCurrentScreen("home");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleCalculate = (selectedDob: Date, selectedTarget: Date) => {
    setDob(selectedDob);
    setTargetDate(selectedTarget);
    localStorage.setItem("userDob", selectedDob.toISOString());
    setCurrentScreen("result");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center sm:p-4 font-sans">
      <div className="w-full max-w-md h-[100dvh] sm:h-[850px] bg-white sm:rounded-[2.5rem] sm:shadow-2xl overflow-hidden relative flex flex-col">
        <AnimatePresence mode="wait">
          {currentScreen === "splash" && <SplashScreen key="splash" />}
          {currentScreen === "home" && (
            <HomeScreen
              key="home"
              initialDob={dob}
              onCalculate={handleCalculate}
            />
          )}
          {currentScreen === "result" && (
            <ResultScreen
              key="result"
              dob={dob!}
              targetDate={targetDate}
              onBack={() => setCurrentScreen("home")}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
