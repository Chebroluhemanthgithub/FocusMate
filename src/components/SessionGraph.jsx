import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Trash2 } from "lucide-react";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

function SessionGraph({ history = {}, onClear }) {
  const dates = Object.keys(history);
  const values = Object.values(history);

  const data = {
    labels: dates.length ? dates : ["No data"],
    datasets: [
      {
        label: "Focus Minutes",
        data: dates.length ? values : [0],
        backgroundColor: "rgba(99, 102, 241, 0.85)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "📊 Productivity — Focus Minutes / Day",
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} minutes`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 5 },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Productivity Graph</h3>
        <button
          onClick={onClear}
          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm"
        >
          <Trash2 size={14} /> Clear
        </button>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default SessionGraph;
