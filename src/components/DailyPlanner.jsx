import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

function DailyPlanner() {
  const [taskInput, setTaskInput] = useState("");
  const [plans, setPlans] = useState([]);
  const [deletedPlans, setDeletedPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const isInitialMount = useRef(true);

  const getToday = () => dayjs().format("DD MMMM YYYY");

  // ✅ Load once on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("dailyPlans")) || [];
      setPlans(stored);
    } catch {
      setPlans([]);
    }
  }, []);

  // ✅ Save only after initial load (to prevent overwrite)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    localStorage.setItem("dailyPlans", JSON.stringify(plans));
    window.dispatchEvent(new Event("dailyPlansUpdated"));
  }, [plans]);

  // ✅ Add Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      date: getToday(),
    };

    setPlans((prev) => [...prev, newTask]);
    setTaskInput("");
  };

  // ✅ Delete Task
  const handleDelete = (id) => {
    const deletedTask = plans.find((t) => t.id === id);
    setPlans((prev) => prev.filter((t) => t.id !== id));
    if (deletedTask) setDeletedPlans((prev) => [...prev, deletedTask]);
  };

  // ✅ Undo Delete
  const handleUndo = (id) => {
    const restored = deletedPlans.find((t) => t.id === id);
    if (restored) {
      setDeletedPlans((prev) => prev.filter((t) => t.id !== id));
      setPlans((prev) => [...prev, restored]);
    }
  };

  // ✅ Edit Task
  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const saveEdit = (id) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, text: editedText } : p))
    );
    setEditingId(null);
    setEditedText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedText("");
  };

  // ✅ Group tasks by date
  const groupedPlans = plans.reduce((acc, p) => {
    if (!acc[p.date]) acc[p.date] = [];
    acc[p.date].push(p);
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

      {Object.entries(groupedPlans).map(([date, tasks]) => (
        <div key={date} className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">{date}</h3>
          <ul>
            {tasks.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center p-2 border-b border-gray-200"
              >
                {editingId === p.id ? (
                  <div className="flex flex-grow items-center gap-2">
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="flex-grow p-1 rounded border border-gray-300 bg-gray-50 text-gray-800"
                    />
                    <button
                      onClick={() => saveEdit(p.id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="flex-grow text-gray-800">{p.text}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p.id, p.text)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
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

      {deletedPlans.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-2">🗑️ Recently Deleted</h4>
          <ul>
            {deletedPlans.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center border-b py-1 text-gray-600"
              >
                <span>{t.text}</span>
                <button
                  onClick={() => handleUndo(t.id)}
                  className="text-green-600 hover:text-green-800"
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
