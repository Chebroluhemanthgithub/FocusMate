import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Tasks from "./pages/Tasks";
import FocusTimer from "./pages/FocusTimer"; // ✅ Correct import
import AiAssistant from "./components/AiAssistant";

const App = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />
      <div className="pt-20 px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/timer" element={<FocusTimer />} /> {/* ✅ FIXED */}
      
        </Routes>

        {/* Optional: keep AI assistant visible on all pages */}
        <AiAssistant />
      </div>
    </div>
  );
};

export default App;

