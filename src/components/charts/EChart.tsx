import { useEffect, useRef, CSSProperties } from "react";
import ReactECharts from "echarts-for-react";
import type { ECharts } from "echarts";

interface Props {
  /**
   * Objeto `option` de ECharts. Tipado laxo (no `EChartsOption`) porque los
   * charts construyen literales planos que no satisfacen las uniones estrictas
   * de ECharts — la misma laxitud que permite `echarts-for-react`.
   */
  option: Record<string, unknown>;
  /** Estilos extra para el contenedor del chart (por defecto llena a su padre). */
  style?: CSSProperties;
  /** Motor de render. Canvas es el default y el mejor para estos dashboards. */
  renderer?: "canvas" | "svg";
}

/**
 * Envoltorio fino sobre `echarts-for-react` que garantiza que los charts pinten
 * en el primer layout dentro de una celda de GridStack.
 *
 * Los widgets montan con alto `100%`, pero GridStack le asigna a la celda su
 * alto real en píxeles un frame después. ECharts mide su contenedor al
 * inicializar y, si no, se quedaría con un canvas de 0×0 — en blanco hasta un
 * resize manual de la ventana. La solución es el `ResizeObserver` de abajo: en
 * cada cambio de tamaño llama `chart.resize({ width, height })` con las
 * dimensiones **explícitas** del observer, así ECharts nunca re-mide un DOM
 * que está en carrera.
 *
 * Centralizar esto aquí mantiene a los 11 charts declarativos — solo construyen
 * un `option` y renderizan `<EChart option={...} />`.
 */
export default function EChart({ option, style, renderer = "canvas" }: Props) {
  const chartRef = useRef<ECharts | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const chart = chartRef.current;
      if (chart && !chart.isDisposed() && width > 0 && height > 0) {
        chart.resize({ width, height });
      }
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%", ...style }}>
      <ReactECharts
        option={option}
        opts={{ renderer }}
        style={{ width: "100%", height: "100%" }}
        onChartReady={(chart) => {
          chartRef.current = chart;
        }}
      />
    </div>
  );
}
