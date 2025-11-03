// pages/Planner.jsx
import DailyPlanner from "../components/DailyPlanner";
import HourlyPlanner from "../components/HourlyPlanner";

function Planner() {
  return (
    <div className="pt-20 px-4 pb-48 bg-white text-gray-900 min-h-screen overflow-y-auto">
      <DailyPlanner />
      <div className="mt-10">
        <HourlyPlanner />
      </div>
    </div>
  );
}

export default Planner;
