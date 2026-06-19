import EChart from "../EChart";
import * as echarts from "echarts";
import { monthlyBMI } from "../../../data/mockData";
import {
  useTheme,
  chartColors,
  TOOLTIP_GLASS,
} from "../../../context/ThemeContext";

export default function IMCBarChart({ expanded }: { expanded?: boolean }) {
  const theme = useTheme();
  const cc = chartColors(theme);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      ...TOOLTIP_GLASS,
      trigger: "axis",
      formatter: (params: { value: number }[]) =>
        `<span style="color:#8B93A8">IMC</span>&ensp;<b style="color:#18151F">${params[0].value}</b>`,
    },
    grid: {
      left: expanded ? 40 : 28,
      right: expanded ? 16 : 8,
      top: expanded ? 24 : 16,
      bottom: expanded ? 30 : 24,
    },
    xAxis: {
      type: "category",
      data: monthlyBMI.map((d) => d.month),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: cc.text,
        fontSize: expanded ? 12 : 9,
        interval: expanded ? 0 : 1,
      },
    },

    yAxis: {
      type: "value",
      min: 25,
      max: 32,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: cc.grid, type: "dashed" } },
      axisLabel: { color: cc.text, fontSize: 10 },
    },
    series: [
      {
        type: "bar",
        barMaxWidth: expanded ? 28 : 16,
        data: monthlyBMI.map((d) => d.avg),
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: (params: { dataIndex: number }) => {
            const val = monthlyBMI[params.dataIndex].avg;
            if (val >= 29)
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FF3B30" },
                { offset: 1, color: "#FF9A93" },
              ]);
            if (val >= 27.5)
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FBBF24" },
                { offset: 1, color: "#FFE08A" },
              ]);
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#30B0C7" },
              { offset: 1, color: "#8FD6E0" },
            ]);
          },
        },
      },
      {
        type: "line",
        data: monthlyBMI.map((d) => d.avg),
        smooth: true,
        symbol: "none",
        lineStyle: { color: "rgba(251,191,36,0.35)", width: 2, type: "dashed" },
        areaStyle: { color: "rgba(251,191,36,0.04)" },
      },
    ],
  };

  return (
    <EChart
      option={option}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: "canvas" }}
    />
  );
}
