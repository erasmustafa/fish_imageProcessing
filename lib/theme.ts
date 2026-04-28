export const themeModeKey = "aquascope-theme";

export type ThemeMode = "light" | "dark";

export function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = window.localStorage.getItem(themeModeKey);
  return stored === "light" || stored === "dark" ? stored : "dark";
}
