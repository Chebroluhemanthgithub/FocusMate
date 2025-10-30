import TimerDisplay from "../components/timer/TimerDisplay";
import TimerControls from "../components/timer/TimerControls";
import TimerInputs from "../components/timer/TimerInputs";
import SessionStats from "../components/timer/SessionStats";
import usePomodoro from "../components/timer/usePomodoro";

const FocusTimer = () => {
  const {
    isRunning,
    isBreak,
    timeLeft,
    workDuration,
    breakDuration,
    setWorkDuration,
    setBreakDuration,
    toggleTimer,
    resetTimer,
    sessionsCompleted,
  } = usePomodoro();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 overflow-hidden">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">⏱️ Focus Timer</h1>

        <TimerDisplay timeLeft={timeLeft} isBreak={isBreak} />

        <TimerInputs
          workDuration={workDuration}
          breakDuration={breakDuration}
          setWorkDuration={setWorkDuration}
          setBreakDuration={setBreakDuration}
        />

        <TimerControls
          isRunning={isRunning}
          start={toggleTimer}
          pause={toggleTimer}
          reset={resetTimer}
        />

        <SessionStats completedSessions={sessionsCompleted} />
      </div>
    </div>
  );
};

export default FocusTimer;
