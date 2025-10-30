
const TimerInputs = ({ workDuration, breakDuration, setWorkDuration, setBreakDuration }) => {
  return (
    <div className="flex justify-center gap-6 mt-4 text-sm">
      <div>
        <label>Work Duration (min)</label>
        <input
          type="number"
          value={workDuration}
          onChange={(e) => setWorkDuration(Number(e.target.value))}
          className="ml-2 w-16 p-1 border rounded"
        />
      </div>
      <div>
        <label>Break Duration (min)</label>
        <input
          type="number"
          value={breakDuration}
          onChange={(e) => setBreakDuration(Number(e.target.value))}
          className="ml-2 w-16 p-1 border rounded"
        />
      </div>
    </div>
  );
};

export default TimerInputs;
