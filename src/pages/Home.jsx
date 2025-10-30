import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const motivationalQuotes = [
  "The key to productivity is simplicity.",
  "Start now. Not tomorrow.",
  "Small steps lead to big results.",
  "Focus on being productive, not busy.",
  "Consistency beats motivation."
];

const Home = () => {
  const [greeting, setGreeting] = useState('');
  const [quote, setQuote] = useState('');
  const [tasksCount, setTasksCount] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning 🌞');
    else if (hour < 18) setGreeting('Good Afternoon ☀️');
    else setGreeting('Good Evening 🌙');

    // Random motivational quote
    const random = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[random]);

    // LocalStorage data
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedSessions = JSON.parse(localStorage.getItem('sessionHistory')) || {};

    setTasksCount(storedTasks.length);
    const totalPomodoros = Object.values(storedSessions).reduce((sum, val) => sum + val, 0);
    setPomodoroCount(totalPomodoros);
  }, []);

  return (
    <div className="pt-20 px-6">
      <h1 className="text-3xl font-bold mb-2">{greeting}</h1>
      <p className="text-lg text-gray-600 mb-8 italic text-center md:text-left">
        "{quote}"
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">📝 Tasks Today</h2>
          <p className="text-3xl font-bold text-blue-600">{tasksCount}</p>
        </div>

        <div className="card text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">⏱️ Pomodoros Completed</h2>
          <p className="text-3xl font-bold text-green-600">{pomodoroCount}</p>
        </div>

        <div className="card text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">🗓️ Planner</h2>
          <p className="text-base text-gray-500">View your scheduled day</p>
        </div>
      </div>

      {/* Big Action Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-100">
        <Link
          to="/tasks"
          className="bg-blue-600 text-white text-center py-4 rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          🗒️ Go to Tasks
        </Link>

        <Link
          to="/timer"
          className="bg-green-600 text-white text-center py-4 rounded-xl font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          ⏱️ Start Focus Timer
        </Link>

        <Link
          to="/planner"
          className="bg-yellow-500 text-white text-center py-4 rounded-xl font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          📅 Open Planner
        </Link>
      </div>
    </div>
  );
};

export default Home;
