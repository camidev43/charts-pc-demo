import ReactECharts from "echarts-for-react";
import type { EChartsReactProps } from "echarts-for-react";
import type { ECharts } from "echarts";

// Wrapper that polls until the container has real dimensions before calling
// chart.resize(). echarts-for-react initializes the canvas with whatever
// clientHeight the container has at mount time — in a GridStack layout that
// is often 0, leaving a blank canvas. Polling with rAF is self-healing and
// works regardless of CSS / GridStack animation timing.
export default function EChart(props: EChartsReactProps) {
  function handleReady(chart: ECharts) {
    const poll = () => {
      if (chart.getDom().clientHeight > 0) {
        chart.resize();
      } else {
        requestAnimationFrame(poll);
      }
    };
    requestAnimationFrame(poll);
    props.onChartReady?.(chart);
  }

  return <ReactECharts {...props} onChartReady={handleReady} />;
}
