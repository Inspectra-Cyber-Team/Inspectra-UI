"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // This effect ensures the theme is only accessed on the client-side
  React.useEffect(() => {
    setMounted(true); // Set mounted to true after the component is mounted
  }, []);

  // If not mounted (first render), return null or a placeholder to avoid hydration mismatch
  if (!mounted) {
    return null; // You can also return a loading spinner or any placeholder here
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className="flex items-center justify-center px-2 rounded-md transition-colors"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="h-[20px] w-[20px]" />
      ) : (
        <Moon className="h-[20px] w-[20px]" />
      )}
    </button>
  );
}
