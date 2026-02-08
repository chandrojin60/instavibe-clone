import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-accent transition-colors"
    >
      {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      <span className="hidden lg:inline">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}
