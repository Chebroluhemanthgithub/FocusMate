import { NavLink } from "react-router-dom";
import { MdHome, MdToday, MdTask, MdTimer, MdSettings } from "react-icons/md";

const Navbar = () => {
  const navItems = [
    { to: "/", label: "Home", icon: <MdHome size={20} /> },
    { to: "/planner", label: "Planner", icon: <MdToday size={20} /> },
    { to: "/tasks", label: "Tasks", icon: <MdTask size={20} /> },
    { to: "/timer", label: "Timer", icon: <MdTimer size={20} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 shadow-lg backdrop-blur-md border-b border-blue-400/30">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="font-semibold text-lg tracking-wide">
          FocusMate 🚀
        </h1>
        <ul className="flex gap-6 font-medium text-sm md:text-base items-center">
          {navItems.map(({ to, label, icon }) => (
            <li key={label} className="flex items-center gap-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 flex items-center gap-1 border-b-2 border-yellow-300 pb-1 transition-all"
                    : "hover:text-yellow-300 flex items-center gap-1 transition-all"
                }
              >
                {icon} {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
