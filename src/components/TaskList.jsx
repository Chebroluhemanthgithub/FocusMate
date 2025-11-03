// src/pages/TaskList.jsx
import React from "react";
import TaskPlanner from "../components/TaskPlanner";

const TaskList = () => {
  return (
    <div className="pt-24 px-6 min-h-screen bg-white text-black flex justify-center items-start overflow-y-auto">
      <div className="w-full max-w-3xl">
        <TaskPlanner />
      </div>
    </div>
  );
};

export default TaskList;
