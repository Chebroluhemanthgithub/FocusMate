import React, { useReducer, useEffect, useState } from "react";
import { taskReducer } from "../reducers/taskReducer";

const TaskPlanner = () => {
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const localData = localStorage.getItem("tasks");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    window.dispatchEvent(new Event("tasksUpdated"));
  }, [tasks]);

  const handleAdd = () => {
    if (taskText.trim()) {
      dispatch({ type: "ADD_TASK", payload: taskText });
      setTaskText("");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className="space-y-4 max-w-lg mx-auto mt-6">
      {/* 📝 Title Section */}
      <div className="flex items-center justify-center gap-2 text-2xl font-semibold">
        <span role="img" aria-label="book">
          📒
        </span>
        <h2>Task Planner</h2>
      </div>

      {/* ➕ Input Box */}
      <div className="flex items-center gap-2">
        <input
          className="flex-1 border px-2 py-1 rounded"
          placeholder="Enter new task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
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
        {["all", "active", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-2 py-1 rounded ${
              filter === type ? "bg-gray-300 dark:bg-gray-700" : ""
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* 📋 Task List */}
      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-2 border rounded ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span
              onClick={() =>
                dispatch({ type: "TOGGLE_TASK", payload: task.id })
              }
              className="cursor-pointer flex-1"
            >
              {task.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_TASK", payload: task.id })
              }
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

export default TaskPlanner;
