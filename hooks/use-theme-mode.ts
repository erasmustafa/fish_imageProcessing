"use client";

import { useEffect, useState } from "react";
import { getInitialTheme, themeModeKey, type ThemeMode } from "../lib/theme";

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(themeModeKey, mode);
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return {
    mode,
    toggleMode: () => setMode((current) => (current === "dark" ? "light" : "dark")),
  };
}
