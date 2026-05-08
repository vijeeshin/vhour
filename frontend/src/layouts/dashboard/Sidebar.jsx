import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  Users,
  Tag,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Projects", icon: Clock, to: "/projects" },
  { label: "Customers", icon: Users, to: "/customers" },
  { label: "Assignment Types", icon: Tag, to: "/assignment-types" },
  { label: "Project Assignments", icon: UserCheck, to: "/project-assignments" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col h-full bg-white transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[220px]"
      }`}
      style={{ borderRight: "1px solid #EBEBEB" }}
    >
      {/* Logo */}
      <div
        className={`flex items-center h-16 shrink-0 ${collapsed ? "justify-center px-0" : "px-5"}`}
        style={{ borderBottom: "1px solid #EBEBEB" }}
      >
        {collapsed ? (
          <span className="text-[#FF5A5F] text-xl font-extrabold">v</span>
        ) : (
          <span className="text-[#FF5A5F] text-xl font-extrabold tracking-tight">
            vHour
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all ${
                isActive
                  ? "bg-[#FFF0F0] text-[#FF5A5F]"
                  : "text-[#484848] hover:bg-[#F7F7F7] hover:text-[#222222]"
              } ${collapsed ? "justify-center" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  className={`shrink-0 ${isActive ? "text-[#FF5A5F]" : "text-[#767676]"}`}
                />
                {!collapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-[22px] z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#767676] hover:text-[#FF5A5F] transition-colors"
        style={{
          border: "1px solid #EBEBEB",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
};

export default Sidebar;
