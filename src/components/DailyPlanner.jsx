import React, { useState } from 'react';
import dayjs from 'dayjs';

function DailyPlanner() {
  const [taskInput, setTaskInput] = useState('');
  const [plans, setPlans] = useState([]);
  const [deletedPlans, setDeletedPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const getToday = () => dayjs().format('DD MMMM YYYY');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      date: getToday(),
    };

    setPlans([...plans, newTask]);
    setTaskInput('');
  };

  const handleDelete = (id) => {
    const deletedTask = plans.find((task) => task.id === id);
    setPlans(plans.filter((task) => task.id !== id));
    setDeletedPlans([...deletedPlans, deletedTask]);
  };

  const handleUndoDelete = (id) => {
    const restoredTask = deletedPlans.find((task) => task.id === id);
    setDeletedPlans(deletedPlans.filter((task) => task.id !== id));
    setPlans([...plans, restoredTask]);
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleSaveEdit = (id) => {
    setPlans(
      plans.map((plan) =>
        plan.id === id ? { ...plan, text: editedText } : plan
      )
    );
    setEditingId(null);
    setEditedText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedText('');
  };

  const groupedPlans = plans.reduce((acc, plan) => {
    acc[plan.date] = acc[plan.date] ? [...acc[plan.date], plan] : [plan];
    return acc;
  }, {});

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">📅 Daily Planner</h2>

      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter your daily plan..."
          className="flex-grow p-2 rounded border border-gray-300 bg-gray-50 text-gray-800"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>

      {/* 🗂️ Grouped by Date */}
      {Object.entries(groupedPlans).map(([date, tasks]) => (
        <div key={date} className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">{date}</h3>
          <ul>
            {tasks.map((plan) => (
              <li
                key={plan.id}
                className="flex justify-between items-center p-2 border-b border-gray-200"
              >
                {editingId === plan.id ? (
                  <div className="flex flex-grow items-center gap-2">
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="flex-grow p-1 rounded border border-gray-300 bg-gray-50 text-gray-800"
                    />
                    <button
                      onClick={() => handleSaveEdit(plan.id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="flex-grow text-gray-800">{plan.text}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(plan.id, plan.text)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* ♻️ Deleted Plans */}
      {deletedPlans.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">🗑️ Deleted Plans</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {deletedPlans.map((plan) => (
              <li
                key={plan.id}
                className="flex justify-between items-center border-b border-gray-200 py-1"
              >
                <span>{plan.text}</span>
                <button
                  onClick={() => handleUndoDelete(plan.id)}
                  className="text-green-600 hover:text-green-800 text-xs"
                >
                  Undo
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DailyPlanner;
