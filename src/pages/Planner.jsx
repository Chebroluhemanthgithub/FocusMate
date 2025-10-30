// pages/Planner.jsx
import DailyPlanner from '../components/DailyPlanner';
import PlannerList from '../components/PlannerList';
import HourlyPlanner from '../components/HourlyPlanner';

function Planner() {
  return (
    <div className="pt-20 px-4">
      <DailyPlanner />
       <HourlyPlanner />
    </div>
  );
}

export default Planner;
