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
  const isFocusTimerPage = location.pathname === "/timer";

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Navbar />

      {/* ✅ Scrollable Content Area */}
      <div className="flex-grow pt-20 px-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/timer" element={<FocusTimer />} />
        </Routes>

        {/* ✅ AI Assistant - Below Page Data, Not Fixed */}
        <div className={`mt-10 mb-10 flex justify-center`}>
          <div
            className={`w-full max-w-2xl ${
              isFocusTimerPage ? "scale-100" : "scale-105"
            }`}
          >
            <AiAssistant />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
