import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const motivationalQuotes = [
  "The key to productivity is simplicity.",
  "Start now. Not tomorrow.",
  "Small steps lead to big results.",
  "Focus on being productive, not busy.",
  "Consistency beats motivation.",
];

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");
  const [tasksCount, setTasksCount] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(
    Number(localStorage.getItem("sessionsCompleted")) || 0
  );
  const [plannerCount, setPlannerCount] = useState(0);

  // 👋 Greeting + Quote
  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12
        ? "Good Morning 🌞"
        : hour < 18
        ? "Good Afternoon ☀️"
        : "Good Evening 🌙"
    );
    setQuote(
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    );
  }, []);

  // 🔁 Sync stats
  useEffect(() => {
    const updateStats = () => {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const storedPlanner = JSON.parse(localStorage.getItem("dailyPlans")) || [];
      setTasksCount(storedTasks.length);
      setPomodoroCount(Number(localStorage.getItem("sessionsCompleted")) || 0);
      setPlannerCount(storedPlanner.length);
    };

    const handleStorage = (e) => {
      if (["sessionsCompleted", "tasks", "dailyPlans"].includes(e.key)) {
        updateStats();
      }
    };

    const onPomodoroUpdate = () => updateStats();
    const onPlannerUpdate = () => updateStats();

    window.addEventListener("pomodoroUpdated", onPomodoroUpdate);
    window.addEventListener("pomodoroCleared", onPomodoroUpdate);
    window.addEventListener("dailyPlansUpdated", onPlannerUpdate);
    window.addEventListener("storage", handleStorage);

    updateStats();

    return () => {
      window.removeEventListener("pomodoroUpdated", onPomodoroUpdate);
      window.removeEventListener("pomodoroCleared", onPomodoroUpdate);
      window.removeEventListener("dailyPlansUpdated", onPlannerUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // ♻️ Reset Pomodoro
  const handleResetPomodoro = () => {
    if (!window.confirm("Reset all Pomodoro progress?")) return;
    localStorage.removeItem("sessionHistory");
    localStorage.setItem("sessionsCompleted", "0");
    window.dispatchEvent(new Event("pomodoroCleared"));
    window.dispatchEvent(new Event("pomodoroUpdated"));
    setPomodoroCount(0);
  };

  return (
    <div className="pt-20 px-6 min-h-screen bg-white text-gray-800 flex flex-col items-center overflow-hidden">
      {/* 👋 Greeting + Quote */}
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl font-bold mb-2">{greeting}</h1>
        <p className="text-lg text-gray-600 mb-8 italic">"{quote}"</p>

        {/* 🧩 Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* 📝 Tasks */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">📝 Tasks</h2>
            <p className="text-3xl font-bold text-blue-600">{tasksCount}</p>
          </div>

          {/* ⏱️ Pomodoros */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow text-center">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-gray-700">
                ⏱️ Pomodoros Completed
              </h2>
              <button
                onClick={handleResetPomodoro}
                disabled={pomodoroCount === 0}
                className={`text-sm px-3 py-1 rounded-md transition ${
                  pomodoroCount === 0
                    ? "text-gray-400 cursor-not-allowed bg-gray-100"
                    : "text-white bg-red-500 hover:bg-red-600"
                }`}
              >
                Reset
              </button>
            </div>
            <p className="text-3xl font-bold text-green-600">{pomodoroCount}</p>
          </div>

          {/* 📅 Planner */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">📅 Planner</h2>
            <p className="text-3xl font-bold text-purple-600">{plannerCount}</p>
            <p className="text-base text-gray-500">
              {plannerCount > 0 ? "Daily plans saved" : "No schedules yet"}
            </p>
          </div>
        </div>

        {/* 🔗 Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <Link
            to="/tasks"
            className="bg-blue-600 text-white text-center py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            🗒️ Go to Tasks
          </Link>
          <Link
            to="/timer"
            className="bg-green-600 text-white text-center py-4 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            ⏱️ Start Focus Timer
          </Link>
          <Link
            to="/planner"
            className="bg-yellow-500 text-white text-center py-4 rounded-xl font-semibold hover:bg-yellow-600 transition"
          >
            📅 Open Planner
          </Link>
        </div>
      </div>
    </div>
  );
}
