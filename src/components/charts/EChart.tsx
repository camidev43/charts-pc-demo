import { useEffect, useRef, CSSProperties } from "react";
import * as echarts from "echarts";

interface Props {
  // Loose like echarts-for-react accepted — the chart files build plain option
  // objects that don't satisfy ECharts' strict EChartsOption type.
  option: Record<string, unknown>;
  style?: CSSProperties;
  opts?: { renderer?: "canvas" | "svg" };
}

// Native ECharts wrapper. We deliberately do NOT use echarts-for-react: its
// internal size-sensor fought with our ResizeObserver and a plain resize()
// left the canvas blank even though the container had a real size.
//
// Here we own the lifecycle: init once, re-apply the option when it changes,
// and on every ResizeObserver tick call resize() with the EXPLICIT width/height
// from the observer entry. Passing explicit dimensions avoids ECharts having to
// re-measure the DOM (which was racing to 0), so charts paint on first layout.
export default function EChart({ option, style, opts }: Props) {
  const elRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const chart = echarts.init(el, undefined, {
      renderer: opts?.renderer ?? "canvas",
    });
    chartRef.current = chart;

    let logged = false;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        chart.resize({ width, height });
        if (!logged) {
          logged = true;
          // eslint-disable-next-line no-console
          console.log(`[EChart] painted ${Math.round(width)}x${Math.round(height)}`);
        }
      }
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
    // init only once; renderer never changes at runtime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    chartRef.current?.setOption(option as echarts.EChartsOption, true);
  }, [option]);

  return <div ref={elRef} style={{ width: "100%", height: "100%", ...style }} />;
}
