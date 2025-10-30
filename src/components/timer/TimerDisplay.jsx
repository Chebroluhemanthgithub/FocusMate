
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const TimerDisplay = ({ timeLeft, isBreak }) => {
  return (
    <div className="text-center my-6">
      <h2 className="text-lg text-gray-700">{isBreak ? 'Break Time' : 'Focus Time'}</h2>
      <p className="text-5xl font-mono font-semibold mt-2">{formatTime(timeLeft)}</p>
    </div>
  );
};

export default TimerDisplay;
