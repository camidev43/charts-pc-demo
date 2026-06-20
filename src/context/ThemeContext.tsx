import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

/** Contexto global del tema. Lo provee `App` y lo refleja en `<html data-theme>`. */
export const ThemeContext = createContext<Theme>("light");

/** Devuelve el tema actual ("light" | "dark"). */
export const useTheme = () => useContext(ThemeContext);

/**
 * Paleta derivada del tema para los charts (color de ejes, grillas, etc.).
 * Se usa a través de {@link useChartTheme} para no repetir el cálculo.
 */
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

/**
 * Estilo "glass" compartido para los tooltips de ECharts. Se expone vía
 * {@link useChartTheme} como `tooltip` para no importarlo en cada chart.
 */
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

/**
 * Acceso centralizado al tema para los charts. En vez de repetir en cada uno
 * `const theme = useTheme(); const cc = chartColors(theme);`, basta:
 *
 * ```tsx
 * const { cc, tooltip } = useChartTheme();
 * ```
 *
 * @returns `theme` (claro/oscuro), `cc` (colores derivados) y `tooltip` (estilo glass).
 */
export function useChartTheme() {
  const theme = useTheme();
  return { theme, cc: chartColors(theme), tooltip: TOOLTIP_GLASS };
}
