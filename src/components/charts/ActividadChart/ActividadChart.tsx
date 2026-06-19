import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { actividadData } from "../../../data/mockData";
import {
  useTheme,
  chartColors,
  TOOLTIP_GLASS,
} from "../../../context/ThemeContext";

export default function ActividadChart({ expanded }: { expanded?: boolean }) {
  const theme = useTheme();
  const cc = chartColors(theme);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      ...TOOLTIP_GLASS,
      trigger: "axis",
      formatter: (params: { value: number }[]) =>
        `<span style="color:#8B93A8">Calorías</span>&ensp;<b style="color:#18151F">${params[0].value} kcal</b>`,
    },
    dataZoom: [
      {
        type: "slider",
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100,
        bottom: expanded ? 4 : 2,
        handleSize: "100%",
        handleStyle: {
          color: cc.text,
          borderColor: cc.text,
        },
        textStyle: {
          color: cc.text,
        },
      },
    ],

    grid: {
      left: expanded ? 44 : 32,
      right: expanded ? 16 : 8,
      top: expanded ? 20 : 12,
      bottom: expanded ? 32 : 22,
    },
    xAxis: {
      type: "category",
      data: actividadData.labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: cc.text, fontSize: 10 },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: cc.grid, type: "dashed" } },
      axisLabel: { color: cc.text, fontSize: 10 },
    },
    series: [
      {
        type: "line",
        data: actividadData.calorias,
        barMaxWidth: expanded ? 28 : 18,
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
          color: (params: { dataIndex: number }) => {
            const high = actividadData.calorias[params.dataIndex] >= 450;
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: high ? "#30B0C7" : "#0A84FF" },
              { offset: 1, color: high ? "#8FD6E0" : "#6FB4FF" },
            ]);
          },
        },
        label: {
          show: expanded,
          position: "top",
          formatter: (p: { value: number }) => `${p.value}`,
          fontSize: 10,
          color: cc.legend,
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: "canvas" }}
    />
  );
}
