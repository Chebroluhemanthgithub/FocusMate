
// pages/Tasks.jsx
import React from "react";
import TaskPlanner from "../components/TaskPlanner";

const TaskList = () => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-start overflow-hidden bg-white text-black pt-24 px-6"
      style={{ minHeight: "100vh" }}
    >
      <TaskPlanner />
    </div>
  );
};

export default TaskList;

