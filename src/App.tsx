import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeContext, Theme } from "./context/ThemeContext";
import LandingCard from "./components/LandingCard";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [view, setView] = useState<"card" | "dashboard">("card");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "var(--bg-page)",
        }}
      >
        <AnimatePresence mode="wait">
          {view === "card" ? (
            <LandingCard
              key="card"
              onExplore={() => setView("dashboard")}
              onToggleTheme={toggleTheme}
            />
          ) : (
            <Dashboard
              key="dashboard"
              onBack={() => setView("card")}
              onToggleTheme={toggleTheme}
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}
