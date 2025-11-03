import { useState, useEffect, useRef } from "react";

export default function usePomodoro() {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [workDuration, setWorkDuration] = useState(
    () => Number(localStorage.getItem("workDuration")) || 25
  );
  const [breakDuration, setBreakDuration] = useState(
    () => Number(localStorage.getItem("breakDuration")) || 5
  );
  const [sessionsCompleted, setSessionsCompleted] = useState(
    () => Number(localStorage.getItem("sessionsCompleted")) || 0
  );
  const [sessionHistory, setSessionHistory] = useState(
    () => JSON.parse(localStorage.getItem("sessionHistory")) || []
  );

  const intervalRef = useRef(null);

  // Initialize time
  useEffect(() => {
    setTimeLeft(workDuration * 60);
  }, [workDuration]);

  // Persist state
  useEffect(() => {
    localStorage.setItem("workDuration", workDuration);
    localStorage.setItem("breakDuration", breakDuration);
    localStorage.setItem("sessionsCompleted", sessionsCompleted);
    localStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
  }, [workDuration, breakDuration, sessionsCompleted, sessionHistory]);

  // Main timer logic
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);

          if (!isBreak) {
            // ✅ Count session only after work time ends
            const newCount = sessionsCompleted + 1;
            setSessionsCompleted(newCount);

            const newHistory = [
              ...sessionHistory,
              { session: newCount, date: new Date().toLocaleTimeString() },
            ];
            setSessionHistory(newHistory);

            // 🔄 notify Home instantly
            window.dispatchEvent(new Event("pomodoroUpdated"));
          }

          // Switch between work <-> break
          const nextMode = !isBreak;
          setIsBreak(nextMode);

          if (nextMode && breakDuration > 0) {
            setTimeLeft(breakDuration * 60);
            setIsRunning(true);
          } else if (!nextMode && workDuration > 0) {
            setTimeLeft(workDuration * 60);
            setIsRunning(true);
          } else {
            setIsRunning(false);
          }

          return nextMode ? breakDuration * 60 : workDuration * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isBreak]);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workDuration * 60);
  };

  const clearSessionHistory = () => {
    setSessionsCompleted(0);
    setSessionHistory([]);
    localStorage.removeItem("sessionHistory");
    localStorage.setItem("sessionsCompleted", 0);

    // 🔄 also inform Home
    window.dispatchEvent(new Event("pomodoroCleared"));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return {
    isRunning,
    isBreak,
    timeLeft,
    workDuration,
    breakDuration,
    sessionsCompleted,
    sessionHistory,
    toggleTimer,
    resetTimer,
    setWorkDuration,
    setBreakDuration,
    clearSessionHistory,
    formatTime,
  };
}
