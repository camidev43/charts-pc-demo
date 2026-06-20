import { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsReactProps } from "echarts-for-react";
import type { ECharts } from "echarts";

// A ResizeObserver on the chart's own wrapper. It fires once immediately with
// the current size and again on every change, so it cannot miss the moment
// GridStack gives the container a real height — which is why charts that used
// to render blank until a manual window resize now paint on first load. No
// timers, no global resize events, each chart heals itself.
let counter = 0;

export default function EChart(props: EChartsReactProps) {
  const chartRef = useRef<ECharts | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(++counter);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const id = idRef.current;
    // eslint-disable-next-line no-console
    console.log(`[EChart ${id}] mount — wrapper ${el.clientWidth}x${el.clientHeight}`);
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const chart = chartRef.current;
      // eslint-disable-next-line no-console
      console.log(
        `[EChart ${id}] RO ${Math.round(width)}x${Math.round(height)} | chart:${chart ? (chart.isDisposed() ? "disposed" : "live") : "null"}`,
      );
      if (chart && !chart.isDisposed() && width > 0 && height > 0) {
        chart.resize();
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
      <ReactECharts
        {...props}
        style={{ height: "100%", width: "100%" }}
        onChartReady={(chart) => {
          // eslint-disable-next-line no-console
          console.log(`[EChart ${idRef.current}] ready — dom ${chart.getDom().clientWidth}x${chart.getDom().clientHeight}`);
          chartRef.current = chart;
          props.onChartReady?.(chart);
        }}
      />
    </div>
  );
}
