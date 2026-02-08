import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, Film, PlusSquare, User } from "lucide-react";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/reels", icon: Film, label: "Reels" },
  { to: "/create", icon: PlusSquare, label: "Create" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function BottomTabBar() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-background py-2 md:hidden">
      {tabs.map(({ to, icon: Icon, label }) => {
        const active = location.pathname === to;
        return (
          <NavLink key={to} to={to} className="flex flex-col items-center gap-0.5 p-1">
            <Icon className={`h-6 w-6 ${active ? "text-foreground" : "text-muted-foreground"}`} strokeWidth={active ? 2.5 : 1.5} />
          </NavLink>
        );
      })}
    </nav>
  );
}
