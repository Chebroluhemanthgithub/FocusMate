import React, { useEffect, useState } from 'react';

const HourlyPlanner = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const currentHour = new Date().getHours();
  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [tasks, setTasks] = useState({});
  const [showPlanner, setShowPlanner] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('hourlyTasks')) || {};
    setTasks(stored[selectedDate] || {});
  }, [selectedDate]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('hourlyTasks')) || {};
    stored[selectedDate] = tasks;
    localStorage.setItem('hourlyTasks', JSON.stringify(stored));
  }, [tasks, selectedDate]);

  const handleTaskChange = (hour, value) => {
    setTasks((prev) => ({ ...prev, [hour]: value }));
  };

  const clearTasks = () => {
    if (confirm('Clear all tasks for this date?')) {
      setTasks({});
      const stored = JSON.parse(localStorage.getItem('hourlyTasks')) || {};
      delete stored[selectedDate];
      localStorage.setItem('hourlyTasks', JSON.stringify(stored));
    }
  };

  const deleteTask = (hour) => {
    const updated = { ...tasks };
    delete updated[hour];
    setTasks(updated);
  };

  const formatHour = (hour) => {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12} ${suffix}`;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 max-w-3xl mx-auto mt-6">
      <button
        onClick={() => setShowPlanner((prev) => !prev)}
        className="w-full text-left bg-indigo-600 text-white px-4 py-3 rounded-md mb-4 hover:bg-indigo-700 transition"
      >
        {showPlanner ? '🔽 Hide Daily Planner' : '🕒 Show Daily Planner'}
      </button>

      {showPlanner && (
        <>
          <div className="flex items-center justify-between mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border px-3 py-2 rounded bg-gray-50 text-gray-800"
            />
            <button
              onClick={clearTasks}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
              🗑️ Clear All Tasks
            </button>
          </div>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {hours.map((hour) => (
              <div
                key={hour}
                className={`flex items-start gap-2 p-2 border rounded-md transition ${
                  hour === currentHour
                    ? 'bg-yellow-50 border-yellow-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="w-20 font-bold text-gray-700">
                  {formatHour(hour)}
                </div>
                <textarea
                  value={tasks[hour] || ''}
                  onChange={(e) => handleTaskChange(hour, e.target.value)}
                  rows={2}
                  className="flex-1 p-2 rounded-md border border-gray-300 bg-white text-gray-800 resize-none"
                  placeholder="Write your task..."
                />
                {tasks[hour] && (
                  <button
                    onClick={() => deleteTask(hour)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete this task"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HourlyPlanner;
