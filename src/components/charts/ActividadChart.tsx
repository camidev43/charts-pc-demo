import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { actividadData } from '../../data/mockData';

export default function ActividadChart({ expanded }: { expanded?: boolean }) {
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1E1B4B',
      borderColor: 'transparent',
      textStyle: { color: '#fff', fontSize: 12 },
      formatter: (params: { value: number }[]) => `Calorías: <b>${params[0].value} kcal</b>`,
    },
    grid: {
      left: expanded ? 44 : 32,
      right: expanded ? 16 : 8,
      top: expanded ? 20 : 12,
      bottom: expanded ? 32 : 22,
    },
    xAxis: {
      type: 'category',
      data: actividadData.labels,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: '#94A3B8', fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: '#F1F5F9', type: 'dashed' } },
      axisLabel: { color: '#94A3B8', fontSize: 10 },
    },
    series: [
      {
        type: 'bar',
        data: actividadData.calorias,
        barMaxWidth: expanded ? 28 : 18,
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
          color: (params: { dataIndex: number }) => {
            const idx = params.dataIndex;
            const high = actividadData.calorias[idx] >= 450;
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: high ? '#7C3AED' : '#0EA5E9' },
              { offset: 1, color: high ? '#C4B5FD' : '#BAE6FD' },
            ]);
          },
        },
        label: {
          show: expanded,
          position: 'top',
          formatter: (p: { value: number }) => `${p.value}`,
          fontSize: 10, color: '#64748B',
        },
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
