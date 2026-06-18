import ReactECharts from 'echarts-for-react';
import { patientStats } from '../../data/mockData';

export default function RiesgoDonut({ expanded }: { expanded?: boolean }) {
  const data = [
    { value: patientStats.riskHigh,   name: 'Alto',  itemStyle: { color: '#EF4444' } },
    { value: patientStats.riskMedium, name: 'Medio', itemStyle: { color: '#F59E0B' } },
    { value: patientStats.riskLow,    name: 'Bajo',  itemStyle: { color: '#10B981' } },
  ];

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1E1B4B',
      borderColor: 'transparent',
      textStyle: { color: '#fff', fontSize: 12 },
      formatter: (p: { name: string; value: number; percent: number }) =>
        `<b>${p.name}</b>: ${p.value}% (${p.percent}%)`,
    },
    legend: {
      bottom: expanded ? 12 : 4,
      textStyle: { color: '#64748B', fontSize: expanded ? 12 : 10 },
      icon: 'circle', itemWidth: 8, itemHeight: 8,
      data: ['Alto', 'Medio', 'Bajo'],
    },
    series: [
      {
        type: 'pie',
        radius: expanded ? ['45%', '72%'] : ['48%', '75%'],
        center: ['50%', expanded ? '44%' : '46%'],
        avoidLabelOverlap: false,
        padAngle: 3,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: {
          show: true,
          position: 'center',
          formatter: () => `{big|${patientStats.riskHigh}%}\n{sub|Riesgo\nAlto}`,
          rich: {
            big: { fontSize: expanded ? 28 : 22, fontWeight: 700, color: '#EF4444', fontFamily: "'Playfair Display', serif", lineHeight: 32 },
            sub: { fontSize: 10, color: '#94A3B8', lineHeight: 15 },
          },
        },
        emphasis: { label: { show: true } },
        data,
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
