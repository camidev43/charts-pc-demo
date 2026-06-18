import ReactECharts from 'echarts-for-react';
import { diagnostics } from '../../data/mockData';

export default function DiagnosticosTree({ expanded }: { expanded?: boolean }) {
  const total = diagnostics.reduce((s, d) => s + d.value, 0);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1E1B4B',
      borderColor: 'transparent',
      textStyle: { color: '#fff', fontSize: 12 },
      formatter: (p: { name: string; value: number }) =>
        `<b>${p.name}</b>: ${p.value} pacientes (${((p.value / total) * 100).toFixed(1)}%)`,
    },
    series: [
      {
        type: 'treemap',
        roam: false,
        nodeClick: false,
        width: '100%',
        height: '100%',
        breadcrumb: { show: false },
        label: {
          show: true,
          formatter: (p: { name: string; value: number }) =>
            expanded
              ? `{bold|${p.name}}\n${p.value} pac.`
              : p.name.length > 12
              ? p.name.slice(0, 11) + '…'
              : p.name,
          rich: { bold: { fontWeight: 700, fontSize: 13 } },
          fontSize: expanded ? 13 : 10,
          color: '#fff',
          fontFamily: "'Inter', sans-serif",
        },
        itemStyle: { borderColor: '#fff', borderWidth: 2, gapWidth: 2, borderRadius: 8 },
        data: diagnostics.map(d => ({
          name: d.name,
          value: d.value,
          itemStyle: { color: d.color },
        })),
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
