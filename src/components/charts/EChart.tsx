import { useEffect, useRef, CSSProperties } from "react";
import ReactECharts from "echarts-for-react";
import type { ECharts } from "echarts";

interface Props {
  /**
   * ECharts option object. Typed loosely (not `EChartsOption`) because the
   * chart components build plain literals that don't satisfy ECharts' strict
   * discriminated unions — the same looseness `echarts-for-react` allows.
   */
  option: Record<string, unknown>;
  /** Extra styles merged onto the chart container (defaults to filling its parent). */
  style?: CSSProperties;
  /** Rendering backend. Canvas is the default and best for these dashboards. */
  renderer?: "canvas" | "svg";
}

/**
 * Thin wrapper around `echarts-for-react` that guarantees charts paint on first
 * layout inside a GridStack cell.
 *
 * The widgets mount with a height of `100%`, but GridStack only assigns the
 * cell its real pixel height a frame later. ECharts measures its container at
 * init time and would otherwise lock in a 0×0 canvas — staying blank until a
 * manual window resize. The fix is the `ResizeObserver` below: on every size
 * change it calls `chart.resize({ width, height })` with the observer's
 * **explicit** dimensions, so ECharts never has to re-measure a racing DOM.
 *
 * Centralising this here means the 11 chart components stay declarative — they
 * only build an `option` and render `<EChart option={...} />`.
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
