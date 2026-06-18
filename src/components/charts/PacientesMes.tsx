import ReactECharts from 'echarts-for-react';
import { patientStats } from '../../data/mockData';

export default function PacientesMes() {
  const gaugeOption = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 200,
        endAngle: -20,
        radius: '95%',
        center: ['50%', '58%'],
        min: 0, max: 300,
        progress: {
          show: true, width: 12,
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: '#7C3AED' },
                { offset: 1, color: '#0EA5E9' },
              ],
            },
          },
        },
        axisLine: { lineStyle: { width: 12, color: [[1, '#F1F5F9']] } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer: { show: false },
        detail: {
          valueAnimation: true,
          fontSize: 28,
          fontWeight: 700,
          color: '#1E293B',
          fontFamily: "'Playfair Display', serif",
          offsetCenter: [0, '0%'],
          formatter: '{value}',
        },
        title: {
          show: true,
          offsetCenter: [0, '30%'],
          fontSize: 11,
          color: '#94A3B8',
          fontFamily: "'Inter', sans-serif",
        },
        data: [{ value: patientStats.total, name: 'pacientes totales' }],
      },
    ],
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ReactECharts option={gaugeOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'canvas' }} />
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '0 4px 4px', flexShrink: 0 }}>
        {[
          { label: 'Nuevos este mes', val: `+${patientStats.monthlyNew}`, color: '#7C3AED' },
          { label: 'IMC promedio', val: patientStats.avgBMI, color: '#0EA5E9' },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, background: '#F8F9FC', borderRadius: 10, padding: '7px 10px',
          }}>
            <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 3 }}>{s.label}</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
