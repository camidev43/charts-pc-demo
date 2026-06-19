import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { casosAnuales } from '../../../data/mockData';
import { useTheme, chartColors, TOOLTIP_GLASS } from '../../../context/ThemeContext';

export default function CasosAnio({ expanded }: { expanded?: boolean }) {
  const theme = useTheme();
  const cc = chartColors(theme);
  const last = casosAnuales.casos.length - 1;

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_GLASS,
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: { name: string; value: number }[]) =>
        `<span style="color:#8B93A8">${params[0].name}</span>&ensp;<b style="color:#18151F">${params[0].value}</b> casos`,
    },
    grid: {
      left: expanded ? 40 : 30,
      right: expanded ? 16 : 10,
      top: expanded ? 28 : 18,
      bottom: expanded ? 30 : 24,
    },
    xAxis: {
      type: 'category',
      data: casosAnuales.years,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: cc.text, fontSize: expanded ? 12 : 10 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: cc.grid, type: 'dashed' } },
      axisLabel: { color: cc.text, fontSize: 10 },
    },
    series: [
      {
        type: 'bar',
        data: casosAnuales.casos,
        barMaxWidth: expanded ? 40 : 26,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: (params: { dataIndex: number }) => {
            const top = params.dataIndex === last ? '#30B0C7' : '#0A84FF';
            const bottom = params.dataIndex === last ? '#7FE0EC' : '#6FB4FF';
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: top },
              { offset: 1, color: bottom },
            ]);
          },
        },
        label: {
          show: expanded,
          position: 'top',
          formatter: (p: { value: number }) => `${p.value}`,
          fontSize: 11,
          color: cc.legend,
          fontWeight: 600,
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'canvas' }} />
  );
}
