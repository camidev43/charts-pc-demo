import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { regionalData } from '../../../data/mockData';
import { useTheme, chartColors, TOOLTIP_GLASS } from '../../../context/ThemeContext';

export default function DistribucionChart({ expanded }: { expanded?: boolean }) {
  const theme = useTheme();
  const cc = chartColors(theme);
  const regions = [...regionalData].reverse();

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_GLASS,
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: { seriesName: string; value: number; color: string }[]) =>
        params.map(p =>
          `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${p.color};margin-right:5px;"></span>`
          + `<span style="color:#8B93A8">${p.seriesName}</span>&ensp;<b style="color:#18151F">${p.value}</b>`
        ).join('<br/>'),
    },
    legend: {
      top: 4, right: 4,
      textStyle: { color: cc.legend, fontSize: 10 },
      itemWidth: 10, itemHeight: 10, icon: 'circle',
    },
    grid: { left: expanded ? 118 : 108, right: 16, top: 32, bottom: expanded ? 30 : 26 },
    xAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: cc.grid, type: 'dashed' } },
      axisLabel: { color: cc.text, fontSize: 10, margin: 10 },
    },
    yAxis: {
      type: 'category',
      data: regions.map(d => d.region),
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: {
        color: cc.legend,
        fontSize: expanded ? 12 : 10,
        width: expanded ? 112 : 102,
        overflow: 'truncate',
      },
    },
    series: [
      {
        name: 'Pacientes',
        type: 'bar',
        barMaxWidth: 12,
        barGap: '30%',
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#0A84FF' },
            { offset: 1, color: '#6FB4FF' },
          ]),
        },
        data: regions.map(d => d.patients),
      },
      {
        name: 'Riesgo %',
        type: 'bar',
        barMaxWidth: 12,
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#FF8A00' },
            { offset: 1, color: '#FFC180' },
          ]),
        },
        data: regions.map(d => d.risk),
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'canvas' }}/>
  );
}
