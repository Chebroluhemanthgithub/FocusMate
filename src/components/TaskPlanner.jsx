
import React, { useState, useEffect } from 'react';

function TaskPlanner() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Load saved tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      const newTask = { id: Date.now(), text: input, completed: false };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">📝 Task Planner</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter your task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={addTask}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center px-4 py-2 rounded ${
              task.completed ? 'bg-green-100 dark:bg-green-700 text-green-900' : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            <span
              onClick={() => toggleComplete(task.id)}
              className={`cursor-pointer flex-1 ${
                task.completed ? 'line-through opacity-70' : ''
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPlanner;
