import ReactECharts from 'echarts-for-react';
import { metabolicRadar } from '../../data/mockData';

export default function RadarChart({ expanded }: { expanded?: boolean }) {
  const option = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', backgroundColor: '#1E1B4B', borderColor: 'transparent', textStyle: { color: '#fff', fontSize: 12 } },
    legend: {
      bottom: expanded ? 8 : 0,
      textStyle: { color: '#64748B', fontSize: 10 },
      icon: 'circle', itemWidth: 8, itemHeight: 8,
    },
    radar: {
      center: ['50%', expanded ? '46%' : '50%'],
      radius: expanded ? '62%' : '56%',
      indicator: metabolicRadar.indicators,
      axisNameGap: expanded ? 10 : 6,
      name: { textStyle: { color: '#64748B', fontSize: expanded ? 12 : 9 } },
      splitArea: { areaStyle: { color: ['rgba(124,58,237,0.03)', 'rgba(124,58,237,0.06)', 'rgba(124,58,237,0.09)'] } },
      splitLine: { lineStyle: { color: 'rgba(124,58,237,0.15)' } },
      axisLine: { lineStyle: { color: 'rgba(124,58,237,0.15)' } },
    },
    series: [
      {
        type: 'radar',
        name: 'Referencia',
        data: [{ value: metabolicRadar.reference, name: 'Referencia' }],
        symbol: 'none',
        lineStyle: { color: 'rgba(14,165,233,0.5)', type: 'dashed', width: 1.5 },
        areaStyle: { color: 'rgba(14,165,233,0.06)' },
      },
      {
        type: 'radar',
        name: 'Paciente',
        data: [{ value: metabolicRadar.current, name: 'Paciente' }],
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: { color: '#7C3AED', width: 2 },
        areaStyle: { color: 'rgba(124,58,237,0.2)' },
        itemStyle: { color: '#7C3AED' },
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
