
import React from 'react';

const PlannerList = ({ tasks }) => {
  if (tasks.length === 0) return <p className="text-gray-500 mt-2">No planner entries yet.</p>;

  return (
    <div className="mt-4 space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="border p-2 rounded shadow-sm bg-gray-50">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">🗓 {task.date}</p>
          {task.note && <p className="text-gray-700">{task.note}</p>}
        </div>
      ))}
    </div>
  );
};

export default PlannerList;
