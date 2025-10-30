
const TimerControls = ({ isRunning, start, pause, reset }) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      {!isRunning ? (
        <button onClick={start} className="px-4 py-2 bg-green-500 text-white rounded">Start</button>
      ) : (
        <button onClick={pause} className="px-4 py-2 bg-yellow-500 text-white rounded">Pause</button>
      )}
      <button onClick={reset} className="px-4 py-2 bg-red-500 text-white rounded">Reset</button>
    </div>
  );
};

export default TimerControls;
