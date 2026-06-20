import { useEffect, useRef, CSSProperties } from "react";
import ReactECharts from "echarts-for-react";
import type { ECharts } from "echarts";

interface Props {
  // Loose like echarts-for-react accepted — the chart files build plain option
  // objects that don't satisfy ECharts' strict EChartsOption type.
  option: Record<string, unknown>;
  style?: CSSProperties;
  opts?: { renderer?: "canvas" | "svg" };
}

// echarts-for-react variant. The blank-on-load bug was NOT echarts-for-react's
// fault per se — it was calling chart.resize() with no arguments, which makes
// ECharts re-measure the DOM (which raced to 0). Here we grab the instance via
// onChartReady and, on every ResizeObserver tick, call resize() with the
// EXPLICIT width/height from the observer, so ECharts never has to measure.
export default function EChart({ option, style, opts }: Props) {
  const chartRef = useRef<ECharts | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const chart = chartRef.current;
      if (chart && !chart.isDisposed() && width > 0 && height > 0) {
        chart.resize({ width, height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%", ...style }}>
      <ReactECharts
        option={option}
        opts={opts}
        style={{ width: "100%", height: "100%" }}
        onChartReady={(chart) => {
          chartRef.current = chart;
        }}
      />
    </div>
  );
}
