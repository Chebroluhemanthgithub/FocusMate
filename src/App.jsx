// App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Tasks from "./pages/Tasks";
import FocusTimer from "./pages/FocusTimer";
import AiAssistant from "./components/AiAssistant";

const App = () => {
  const location = useLocation();

  // 👇 Detect if we are on the Focus Timer page
  const isFocusTimerPage = location.pathname === "/timer";

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-20 px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/timer" element={<FocusTimer />} />
        </Routes>
      </div>

      {/* ✅ Conditionally position AI Assistant */}
      <div
        className={`${
          isFocusTimerPage
            ? "relative mt-8 mb-6" // normal flow under chart
            : "fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
        } w-full flex justify-center`}
      >
        <div className="w-full max-w-2xl scale-110">
          <AiAssistant />
        </div>
      </div>
    </div>
  );
};

export default App;
