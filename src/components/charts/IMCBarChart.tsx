import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { monthlyBMI } from '../../data/mockData';

export default function IMCBarChart({ expanded }: { expanded?: boolean }) {
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1E1B4B',
      borderColor: 'transparent',
      textStyle: { color: '#fff', fontFamily: 'Inter', fontSize: 12 },
      formatter: (params: { value: number }[]) => `IMC: <b>${params[0].value}</b>`,
    },
    grid: {
      left: expanded ? 40 : 28,
      right: expanded ? 16 : 8,
      top: expanded ? 24 : 16,
      bottom: expanded ? 30 : 24,
    },
    xAxis: {
      type: 'category',
      data: monthlyBMI.map(d => d.month),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#94A3B8', fontSize: expanded ? 12 : 9, interval: expanded ? 0 : 1 },
    },
    yAxis: {
      type: 'value',
      min: 25, max: 32,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#F1F5F9', type: 'dashed' } },
      axisLabel: { color: '#94A3B8', fontSize: 10 },
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: expanded ? 28 : 16,
        data: monthlyBMI.map(d => d.avg),
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: (params: { dataIndex: number }) => {
            const val = monthlyBMI[params.dataIndex].avg;
            if (val >= 29) return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#EF4444' }, { offset: 1, color: '#FECACA' },
            ]);
            if (val >= 27.5) return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#F59E0B' }, { offset: 1, color: '#FDE68A' },
            ]);
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#10B981' }, { offset: 1, color: '#A7F3D0' },
            ]);
          },
        },
        label: {
          show: false,
        },
      },
      {
        type: 'line',
        data: monthlyBMI.map(d => d.avg),
        smooth: true,
        symbol: 'none',
        lineStyle: { color: 'rgba(124,58,237,0.4)', width: 2, type: 'dashed' },
        areaStyle: { color: 'rgba(124,58,237,0.04)' },
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
