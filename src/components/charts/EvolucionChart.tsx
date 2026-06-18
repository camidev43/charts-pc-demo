import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { evolucionSemana, evolucionMes, weekLabels } from '../../data/mockData';

export default function EvolucionChart({ expanded }: { expanded?: boolean }) {
  const [tab, setTab] = useState<'semana' | 'mes'>('semana');

  const isWeek = tab === 'semana';
  const labels = isWeek ? weekLabels : evolucionMes.labels;
  const glucosa = isWeek ? evolucionSemana.glucosa : evolucionMes.glucosa;
  const triglis = isWeek ? evolucionSemana.trigliceridos : evolucionMes.trigliceridos;
  const hdl = isWeek ? evolucionSemana.hdl : evolucionMes.hdl;

  const makeSeries = (name: string, data: number[], color: string) => ({
    name, type: 'line', data,
    smooth: true, symbol: 'circle', symbolSize: 5,
    lineStyle: { color, width: 2.5 },
    itemStyle: { color, borderWidth: 2, borderColor: '#fff' },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: color + '40' },
        { offset: 1, color: color + '04' },
      ]),
    },
  });

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1E1B4B',
      borderColor: 'transparent',
      textStyle: { color: '#fff', fontFamily: 'Inter', fontSize: 12 },
    },
    legend: {
      top: expanded ? 4 : 2, right: 4,
      textStyle: { color: '#64748B', fontSize: 10 },
      icon: 'circle', itemWidth: 8, itemHeight: 8,
    },
    grid: { left: expanded ? 42 : 36, right: 12, top: expanded ? 36 : 28, bottom: expanded ? 32 : 24 },
    xAxis: {
      type: 'category', data: labels,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: '#94A3B8', fontSize: 10 },
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: '#F1F5F9', type: 'dashed' } },
      axisLabel: { color: '#94A3B8', fontSize: 10 },
    },
    series: [
      makeSeries('Glucosa', glucosa, '#7C3AED'),
      makeSeries('Triglicéridos', triglis, '#0EA5E9'),
      makeSeries('HDL', hdl, '#84CC16'),
    ],
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 4, padding: '0 0 8px',
        flexShrink: 0,
      }}>
        {(['semana', 'mes'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '4px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 600, fontFamily: "'Inter', sans-serif",
              background: tab === t ? '#7C3AED' : 'rgba(0,0,0,0.05)',
              color: tab === t ? 'white' : '#64748B',
              transition: 'all 0.2s',
            }}
          >
            {t === 'semana' ? 'Semana' : 'Mes'}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ReactECharts
          key={tab}
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>
    </div>
  );
}
