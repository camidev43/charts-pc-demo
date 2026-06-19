import ReactECharts from 'echarts-for-react';
import { metabolicRadar } from '../../../data/mockData';
import { useTheme, chartColors, TOOLTIP_GLASS } from '../../../context/ThemeContext';

export default function RadarChart({ expanded }: { expanded?: boolean }) {
  const theme = useTheme();
  const cc = chartColors(theme);

  const gridLineColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const axisLineColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_GLASS,
      trigger: 'item',
    },
    legend: {
      bottom: expanded ? 8 : 0,
      textStyle: { color: cc.legend, fontSize: 10 },
      icon: 'circle', itemWidth: 8, itemHeight: 8,
    },
    radar: {
      center: ['50%', expanded ? '46%' : '50%'],
      radius: expanded ? '62%' : '56%',
      indicator: metabolicRadar.indicators,
      axisNameGap: expanded ? 10 : 6,
      name: { textStyle: { color: cc.legend, fontSize: expanded ? 12 : 9 } },
      splitArea: {
        areaStyle: { color: [
          'rgba(10,132,255,0.03)',
          'rgba(10,132,255,0.06)',
          'rgba(10,132,255,0.09)',
        ]},
      },
      splitLine: { lineStyle: { color: gridLineColor } },
      axisLine:  { lineStyle: { color: axisLineColor } },
    },
    series: [
      {
        type: 'radar',
        name: 'Referencia',
        data: [{ value: metabolicRadar.reference, name: 'Referencia' }],
        symbol: 'none',
        lineStyle: { color: 'rgba(10,132,255,0.5)', type: 'dashed', width: 1.5 },
        areaStyle: { color: 'rgba(10,132,255,0.06)' },
      },
      {
        type: 'radar',
        name: 'Paciente',
        data: [{ value: metabolicRadar.current, name: 'Paciente' }],
        symbol: 'circle', symbolSize: 5,
        lineStyle: { color: '#FF8A00', width: 2 },
        areaStyle: { color: 'rgba(255,138,0,0.18)' },
        itemStyle: { color: '#FF8A00' },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'canvas' }}/>
  );
}
