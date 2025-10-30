
// components/SessionGraph.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function SessionGraph({ history }) {
  const dates = Object.keys(history);
  const values = Object.values(history);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Pomodoro Sessions',
        data: values,
        backgroundColor: '#4F46E5',
        borderRadius: 6,
      }
    ],
  };

  const options = {
    scales: {
      y: { beginAtZero: true }
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-2">📊 Your Productivity Graph</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default SessionGraph;
