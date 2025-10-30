// src/components/TaskList.jsx
import React, { useReducer, useEffect, useState } from 'react';
import { taskReducer } from '../reducers/taskReducer';

const TaskList = () => {
  const [taskText, setTaskText] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, active

  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const localData = localStorage.getItem('tasks');
    return localData ? JSON.parse(localData) : [];
  });

  // 🧠 Save to localStorage every time tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (taskText.trim()) {
      dispatch({ type: 'ADD_TASK', payload: taskText });
      setTaskText('');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="space-y-4 max-w-lg mx-auto mt-6">
      <div className="flex items-center gap-2">
        <input
          className="flex-1 border px-2 py-1 rounded"
          placeholder="Enter new task"
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* 🔍 Filter Buttons */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setFilter('all')}
          className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-2 py-1 rounded ${filter === 'active' ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-2 py-1 rounded ${filter === 'completed' ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
        >
          Completed
        </button>
      </div>

      {/* 📋 Task List */}
      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-2 border rounded ${task.completed ? 'line-through text-gray-500' : ''}`}
          >
            <span onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })} className="cursor-pointer flex-1">
              {task.text}
            </span>
            <button
              onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
              className="text-red-600 hover:text-red-800"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
