import useAuth from "@/shared/hooks/useAuth";
import { profileRequested } from "@/shared/store/profileSlice";
import { logout } from "@/features/auth/store/authSlice";
import { Bell, Search, ChevronDown, Check, User, Settings, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Placeholder notifications — replace with Redux state once slice/saga are ready
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    read: false,
    avatar: "A",
    avatarColor: "#FF5A5F",
    title: "Alice approved your time log",
    time: "2 min ago",
  },
  {
    id: 2,
    read: false,
    avatar: "B",
    avatarColor: "#00A699",
    title: "Bob commented on your schedule",
    time: "18 min ago",
  },
  {
    id: 3,
    read: true,
    avatar: "S",
    avatarColor: "#FC642D",
    title: "System maintenance at 11 PM",
    time: "1 hr ago",
  },
  {
    id: 4,
    read: true,
    avatar: "C",
    avatarColor: "#484848",
    title: "Carlos submitted a leave request",
    time: "Yesterday",
  },
];

const NotificationDropdown = () => {
  const [items, setItems] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl overflow-hidden z-50"
      style={{ boxShadow: "0 6px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #EBEBEB" }}>
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold text-[#222222]">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-[11px] font-semibold text-white bg-[#FF5A5F] rounded-full px-1.5 py-0.5 leading-none">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1 text-[12px] font-semibold text-[#FF5A5F] hover:text-[#E0484D] transition-colors"
          >
            <Check size={12} />
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <ul className="max-h-72 overflow-y-auto">
        {items.length === 0 ? (
          <li className="px-4 py-8 text-center text-[13px] text-[#767676]">
            You're all caught up!
          </li>
        ) : (
          items.map((n) => (
            <li
              key={n.id}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                n.read ? "bg-white hover:bg-[#F7F7F7]" : "bg-[#FFF8F8] hover:bg-[#FFF0F0]"
              }`}
              style={{ borderBottom: "1px solid #F0F0F0" }}
              onClick={() =>
                setItems((prev) =>
                  prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
                )
              }
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                style={{ backgroundColor: n.avatarColor }}
              >
                {n.avatar}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className={`text-[13px] leading-snug ${n.read ? "text-[#484848] font-normal" : "text-[#222222] font-semibold"}`}>
                  {n.title}
                </p>
                <p className="text-[11px] text-[#767676] mt-0.5">{n.time}</p>
              </div>

              {/* Unread dot */}
              {!n.read && (
                <span className="w-2 h-2 rounded-full bg-[#FF5A5F] shrink-0 mt-1.5" />
              )}
            </li>
          ))
        )}
      </ul>

      {/* Footer */}
      <div
        className="px-4 py-2.5 text-center"
        style={{ borderTop: "1px solid #EBEBEB" }}
      >
        <button className="text-[13px] font-semibold text-[#FF5A5F] hover:text-[#E0484D] transition-colors">
          View all notifications
        </button>
      </div>
    </div>
  );
};

const ProfileDropdown = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(logout());
    onClose();
    navigate("/login");
  };

  const menuItems = [
    {
      icon: User,
      label: "Profile",
      onClick: () => { navigate("/profile"); onClose(); },
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => { navigate("/settings"); onClose(); },
    },
  ];

  return (
    <div
      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl overflow-hidden z-50"
      style={{ boxShadow: "0 6px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)" }}
    >
      {/* User info */}
      {user && (
        <div className="px-4 py-3" style={{ borderBottom: "1px solid #EBEBEB" }}>
          <p className="text-[13px] font-bold text-[#222222] truncate">
            {user.first_name} {user.last_name}
          </p>
          {user.email && (
            <p className="text-[11px] text-[#767676] truncate mt-0.5">{user.email}</p>
          )}
        </div>
      )}

      {/* Menu items */}
      <ul className="py-1">
        {menuItems.map(({ icon: Icon, label, onClick }) => (
          <li key={label}>
            <button
              onClick={onClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-[#484848] hover:bg-[#F7F7F7] hover:text-[#222222] transition-colors text-left"
            >
              <Icon size={15} className="text-[#767676]" />
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Divider + Logout */}
      <div style={{ borderTop: "1px solid #EBEBEB" }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-[#FF5A5F] hover:bg-[#FFF0F0] transition-colors"
        >
          <LogOut size={15} />
          Log out
        </button>
      </div>
    </div>
  );
};

const TopBar = () => {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    dispatch(profileRequested());
  }, [isLoggedIn, dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const user = useSelector((state) => state.profile.data);
  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header
      className="flex items-center justify-between h-16 px-6 bg-white shrink-0"
      style={{ borderBottom: "1px solid #EBEBEB" }}
    >
      {/* Search */}
      <div className="relative w-64">
       
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onMouseEnter={() => setNotifOpen(true)}
            onClick={() => setNotifOpen((o) => !o)}
            className="relative p-2 rounded-full hover:bg-[#F7F7F7] text-[#767676] hover:text-[#484848] transition-colors"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5A5F]" />
            )}
          </button>
          {notifOpen && <NotificationDropdown />}
        </div>

        {/* Avatar / profile */}
        <div className="relative" ref={profileRef}>
          <button
            onMouseEnter={() => setProfileOpen(true)}
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-[#F7F7F7] transition-colors border border-[#EBEBEB]"
          >
            <div className="w-7 h-7 rounded-full bg-[#FF5A5F] flex items-center justify-center text-white text-xs font-bold">
              {isLoggedIn ? (user?.first_name?.substring(0, 1) ?? "?") : "?"}
            </div>
            {isLoggedIn && user?.first_name && (
              <span className="text-[13px] font-semibold text-[#484848]">
                {user.first_name}
              </span>
            )}
            <ChevronDown
              size={13}
              className={`text-[#767676] transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {profileOpen && (
            <ProfileDropdown user={user} onClose={() => setProfileOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
