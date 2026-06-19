import { createContext, useContext } from "react";

export type Theme = "light" | "dark";
export const ThemeContext = createContext<Theme>("light");
export const useTheme = () => useContext(ThemeContext);

export function chartColors(theme: Theme) {
  const d = theme === "dark";
  return {
    text: d ? "rgba(255,255,255,0.35)" : "#8FA3BE",
    grid: d ? "rgba(255,255,255,0.05)" : "#EBF0F5",
    legend: d ? "rgba(255,255,255,0.42)" : "#64748B",
    detail: d ? "rgba(255,255,255,0.92)" : "#18151F",
    chipBg: d ? "rgba(255,255,255,0.06)" : "#F4F5FA",
    chipTxt: d ? "rgba(255,255,255,0.45)" : "#8B93A8",
    barTrack: d ? "rgba(255,255,255,0.07)" : "#E8EDF5",
  };
}

export const TOOLTIP_GLASS = {
  appendToBody: true,
  confine: false,
  backgroundColor: "rgba(255,255,255,0.97)",
  borderColor: "rgba(0,0,0,0.07)",
  borderWidth: 1,
  borderRadius: 14,
  padding: [10, 14] as [number, number],
  textStyle: {
    color: "#18151F",
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 12,
    fontWeight: 400 as const,
  },
  extraCssText:
    "box-shadow:0 8px 32px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.06);",
};
