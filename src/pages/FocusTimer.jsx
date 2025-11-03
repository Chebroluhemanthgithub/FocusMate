import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function FocusTimer() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(
    parseInt(localStorage.getItem("sessionsCompleted")) || 0
  );
  const [graphData, setGraphData] = useState(
    JSON.parse(localStorage.getItem("pomodoroGraph")) || []
  );

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(intervalRef.current);
          handleTimerEnd();
          return 0;
        });
      }, 1000);
    } else clearInterval(intervalRef.current);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleTimerEnd = () => {
    if (!isBreak) {
      const newSession = {
        time: new Date().toLocaleTimeString(),
        duration: workMinutes,
      };
      const updatedGraph = [...graphData, newSession];
      setGraphData(updatedGraph);
      localStorage.setItem("pomodoroGraph", JSON.stringify(updatedGraph));

      const updatedCount = completedSessions + 1;
      setCompletedSessions(updatedCount);
      localStorage.setItem("sessionsCompleted", updatedCount);

      // 🔄 Inform Home page immediately
      window.dispatchEvent(new Event("pomodoroUpdated"));
    }

    setIsBreak(!isBreak);
    setSecondsLeft((isBreak ? workMinutes : breakMinutes) * 60);
    setIsRunning(false);
  };

  const handleStart = () => {
    if (secondsLeft > 0) setIsRunning(true);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setSecondsLeft(workMinutes * 60);
  };

  const handleDeleteGraph = () => {
    setGraphData([]);
    localStorage.removeItem("pomodoroGraph");
  };

  useEffect(() => {
    if (!isBreak) setSecondsLeft(workMinutes * 60);
  }, [workMinutes]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const data = {
    labels: graphData.map((d) => d.time),
    datasets: [
      {
        label: "Focus Sessions (min)",
        data: graphData.map((d) => d.duration),
        borderColor: "#4B9CD3",
        backgroundColor: "rgba(75, 156, 211, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">⏱️ Focus Timer</h1>
      <h2 className="text-xl mb-4">
        {isBreak ? "Break Time ☕" : "Focus Time 💪"}
      </h2>
      <p className="text-4xl font-mono mb-4">
        {minutes}:{seconds}
      </p>

      <div className="flex gap-6 mb-4">
        <div>
          <label className="block mb-1 font-medium">Work (min)</label>
          <input
            type="number"
            min="1"
            value={workMinutes}
            onChange={(e) => setWorkMinutes(Number(e.target.value))}
            className="border px-3 py-1 rounded w-20 text-center"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Break (min)</label>
          <input
            type="number"
            min="0"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
            className="border px-3 py-1 rounded w-20 text-center"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleStart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Start
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Reset
        </button>
      </div>

      <p className="mb-4 text-lg">✅ Completed Sessions: {completedSessions}</p>

      {graphData.length > 0 && (
        <div className="w-3/4 md:w-1/2">
          <Line data={data} />
          <button
            onClick={handleDeleteGraph}
            className="bg-red-500 text-white mt-4 px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Graph
          </button>
        </div>
      )}
    </div>
  );
}
