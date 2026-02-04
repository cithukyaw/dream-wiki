import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function getIsDark() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(getIsDark);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));

    // Observe class changes on <html> so button reflects external changes
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    update();

    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    // Mark that user explicitly overrides system for this session
    root.setAttribute("data-theme-override", "true");
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      // Add an explicit light marker so components that read it (e.g., toasts) stay in sync
      root.classList.add("light");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    setIsDark(root.classList.contains("dark"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="fixed top-2 right-2 z-50 inline-flex items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md hover:bg-muted transition-colors h-9 w-9 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
