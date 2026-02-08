import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, Film, Send, PlusSquare, Heart, User, Menu } from "lucide-react";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/reels", icon: Film, label: "Reels" },
  { to: "/messages", icon: Send, label: "Messages" },
  { to: "/notifications", icon: Heart, label: "Notifications" },
  { to: "/create", icon: PlusSquare, label: "Create" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function SideNav() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <nav className="fixed left-0 top-0 hidden h-screen w-[72px] flex-col border-r bg-background px-3 py-6 md:flex lg:w-[244px]">
      <NavLink to="/" className="mb-8 px-3">
        <span className="hidden text-xl font-semibold lg:block" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
          Instagram
        </span>
        <Home className="h-6 w-6 lg:hidden" />
      </NavLink>

      <div className="flex flex-1 flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-accent ${active ? "font-bold" : ""}`}
            >
              <Icon className="h-6 w-6" strokeWidth={active ? 2.5 : 1.5} />
              <span className="hidden lg:inline">{label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="flex flex-col gap-1">
        <ThemeToggle />
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-accent transition-colors"
        >
          <Menu className="h-6 w-6" />
          <span className="hidden lg:inline">More</span>
        </button>
      </div>
    </nav>
  );
}
