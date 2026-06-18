import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { regionalData } from '../../data/mockData';

export default function DistribucionChart({ expanded }: { expanded?: boolean }) {
  const regions = [...regionalData].reverse();

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#1E1B4B',
      borderColor: 'transparent',
      textStyle: { color: '#fff', fontFamily: 'Inter', fontSize: 12 },
      formatter: (params: { seriesName: string; value: number }[]) =>
        params.map(p => `<b>${p.seriesName}</b>: ${p.value}`).join('<br/>'),
    },
    legend: {
      top: 4, right: 4,
      textStyle: { color: '#64748B', fontSize: 10 },
      itemWidth: 10, itemHeight: 10, icon: 'circle',
    },
    grid: { left: 90, right: 16, top: 32, bottom: 12 },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#F1F5F9', type: 'dashed' } },
      axisLabel: { color: '#94A3B8', fontSize: 10 },
    },
    yAxis: {
      type: 'category',
      data: regions.map(d => d.region),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748B', fontSize: expanded ? 12 : 10, width: 80, overflow: 'truncate' },
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
            { offset: 0, color: '#7C3AED' },
            { offset: 1, color: '#C4B5FD' },
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
            { offset: 0, color: '#0EA5E9' },
            { offset: 1, color: '#BAE6FD' },
          ]),
        },
        data: regions.map(d => d.risk),
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
