import { Moon, Sparkles } from "lucide-react";

function ThemeToggle({ theme, setTheme }) {
  const isLuxury = theme === "luxury";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isLuxury ? "dark" : "luxury")}
      aria-label="Toggle theme"
      title={isLuxury ? "Switch to Dark Orange" : "Switch to Luxury Gold"}
    >
      {isLuxury ? <Moon size={18} /> : <Sparkles size={18} />}
      <span>{isLuxury ? "Dark" : "Gold"}</span>
    </button>
  );
}

export default ThemeToggle;