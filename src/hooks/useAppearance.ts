import { useEffect, useState } from "react";

export type ThemeMode = "dark" | "light" | "system";
export type TextSize = "small" | "medium" | "large";

export const ACCENTS = [
  { name: "Blue", value: "#4f8cff" },
  { name: "Violet", value: "#7c5cff" },
  { name: "Teal", value: "#22c1c3" },
  { name: "Pink", value: "#ec4899" },
  { name: "Amber", value: "#f59e0b" },
];

const SIZE_PX: Record<TextSize, string> = { small: "14px", medium: "16px", large: "18px" };

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: ignore */
  }
}

export function useAppearance() {
  const [theme, setTheme] = useState<ThemeMode>(() => load("vf-theme", "dark"));
  const [textSize, setTextSize] = useState<TextSize>(() => load("vf-text", "medium"));
  const [accent, setAccent] = useState<string>(() => load("vf-accent", ACCENTS[0].value));

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (): void => {
      const dark = theme === "dark" || (theme === "system" && mq.matches);
      root.dataset.theme = dark ? "dark" : "light";
    };
    apply();
    save("vf-theme", theme);
    if (theme === "system") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = SIZE_PX[textSize];
    save("vf-text", textSize);
  }, [textSize]);

  useEffect(() => {
    document.documentElement.style.setProperty("--color-brand", accent);
    save("vf-accent", accent);
  }, [accent]);

  return { theme, setTheme, textSize, setTextSize, accent, setAccent };
}

export type AppearanceState = ReturnType<typeof useAppearance>;