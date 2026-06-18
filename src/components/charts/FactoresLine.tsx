import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { factoresLine } from '../../data/mockData';

export default function FactoresLine({ expanded }: { expanded?: boolean }) {
  const series = factoresLine.series.map(s => ({
    name: s.name,
    type: 'line',
    data: s.data,
    smooth: true,
    symbol: 'circle',
    symbolSize: expanded ? 6 : 4,
    lineStyle: { color: s.color, width: 2.5 },
    itemStyle: { color: s.color, borderWidth: 2, borderColor: '#fff' },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: s.color + '30' },
        { offset: 1, color: s.color + '03' },
      ]),
    },
  }));

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1E1B4B',
      borderColor: 'transparent',
      textStyle: { color: '#fff', fontFamily: 'Inter', fontSize: 12 },
      formatter: (params: { seriesName: string; value: number; color: string }[]) =>
        params.map(p =>
          `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color};margin-right:6px;"></span><b>${p.seriesName}</b>: ${p.value}`
        ).join('<br/>'),
    },
    legend: {
      bottom: expanded ? 8 : 2,
      textStyle: { color: '#64748B', fontSize: expanded ? 12 : 10 },
      icon: 'circle', itemWidth: 8, itemHeight: 8,
      data: factoresLine.series.map(s => s.name),
    },
    grid: {
      left: expanded ? 44 : 36,
      right: expanded ? 16 : 12,
      top: expanded ? 20 : 14,
      bottom: expanded ? 44 : 32,
    },
    xAxis: {
      type: 'category',
      data: factoresLine.months,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: '#94A3B8', fontSize: expanded ? 12 : 10 },
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: '#F1F5F9', type: 'dashed' } },
      axisLabel: { color: '#94A3B8', fontSize: 10 },
    },
    series,
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
