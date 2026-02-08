import { NavLink } from "react-router-dom";
import { Heart, Send } from "lucide-react";

export default function TopHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[44px] items-center justify-between border-b bg-background px-4 md:hidden">
      <span className="text-lg font-semibold" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
        Instagram
      </span>
      <div className="flex items-center gap-4">
        <NavLink to="/notifications">
          <Heart className="h-6 w-6" />
        </NavLink>
        <NavLink to="/messages">
          <Send className="h-6 w-6" />
        </NavLink>
      </div>
    </header>
  );
}
