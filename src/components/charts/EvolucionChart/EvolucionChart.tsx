import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { evolucionSemana, evolucionMes, weekLabels } from '../../../data/mockData';
import { useTheme, chartColors, TOOLTIP_GLASS } from '../../../context/ThemeContext';
import styles from './EvolucionChart.module.css';

export default function EvolucionChart({ expanded }: { expanded?: boolean }) {
  const [tab, setTab] = useState<'semana' | 'mes'>('semana');
  const theme = useTheme();
  const cc = chartColors(theme);

  const isWeek = tab === 'semana';
  const labels  = isWeek ? weekLabels : evolucionMes.labels;
  const glucosa = isWeek ? evolucionSemana.glucosa      : evolucionMes.glucosa;
  const triglis = isWeek ? evolucionSemana.trigliceridos: evolucionMes.trigliceridos;
  const hdl     = isWeek ? evolucionSemana.hdl          : evolucionMes.hdl;

  const dotBorder = theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#fff';

  const makeSeries = (name: string, data: number[], color: string) => ({
    name, type: 'line', data, smooth: true,
    symbol: 'circle', symbolSize: 5,
    lineStyle: { color, width: 2.5 },
    itemStyle: { color, borderWidth: 2, borderColor: dotBorder },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: color + '38' },
        { offset: 1, color: color + '03' },
      ]),
    },
  });

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...TOOLTIP_GLASS,
      trigger: 'axis',
      formatter: (params: { seriesName: string; value: number; color: string }[]) =>
        params.map(p =>
          `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${p.color};margin-right:5px;"></span>`
          + `<span style="color:#8B93A8">${p.seriesName}</span>&ensp;<b style="color:#18151F">${p.value}</b>`
        ).join('<br/>'),
    },
    legend: {
      top: expanded ? 4 : 2, right: 4,
      textStyle: { color: cc.legend, fontSize: 10 },
      icon: 'circle', itemWidth: 8, itemHeight: 8,
    },
    grid: { left: expanded ? 42 : 36, right: 12, top: expanded ? 36 : 28, bottom: expanded ? 32 : 24 },
    xAxis: {
      type: 'category', data: labels,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: cc.text, fontSize: 10 },
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: cc.grid, type: 'dashed' } },
      axisLabel: { color: cc.text, fontSize: 10 },
    },
    series: [
      makeSeries('Glucosa',       glucosa, '#FF8A00'),
      makeSeries('Triglicéridos', triglis, '#0A84FF'),
      makeSeries('HDL',           hdl,     '#30B0C7'),
    ],
  };

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        {(['semana', 'mes'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`${styles.tab} ${tab === t ? styles.tab_active : styles.tab_inactive}`}
          >
            {t === 'semana' ? 'Semana' : 'Mes'}
          </button>
        ))}
      </div>
      <div className={styles.chart_area}>
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
