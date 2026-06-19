import ReactECharts from 'echarts-for-react';
import { patientStats } from '../../../data/mockData';
import { useTheme, chartColors } from '../../../context/ThemeContext';
import styles from './PacientesMes.module.css';

export default function PacientesMes() {
  const theme = useTheme();
  const cc = chartColors(theme);

  const gaugeOption = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 200,
        endAngle: -20,
        radius: '92%',
        center: ['50%', '56%'],
        min: 0, max: 300,
        progress: {
          show: true, width: 12,
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: '#FF8A00' },
                { offset: 1, color: '#FBBF24' },
              ],
            },
          },
        },
        axisLine: { lineStyle: { width: 12, color: [[1, cc.barTrack]] } },
        axisTick:  { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer:   { show: false },
        detail: {
          valueAnimation: true,
          fontSize: 28,
          fontWeight: 800,
          color: cc.detail,
          fontFamily: 'Inter',
          offsetCenter: [0, '-4%'],
          formatter: '{value}',
        },
        title: {
          show: true,
          offsetCenter: [0, '28%'],
          fontSize: 10,
          color: cc.text,
          fontFamily: 'Inter',
          width: 80,
          overflow: 'break',
        },
        data: [{ value: patientStats.total, name: 'pacientes' }],
      },
    ],
  };

  return (
    <div className={styles.root}>
      <div className={styles.gauge_area}>
        <ReactECharts option={gaugeOption} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'canvas' }}/>
      </div>
      <div className={styles.chips}>
        {[
          { label: 'Nuevos este mes', val: `+${patientStats.monthlyNew}`, color: '#FF8A00' },
          { label: 'IMC promedio',    val: patientStats.avgBMI,           color: '#0A84FF' },
        ].map(s => (
          <div key={s.label} className={styles.chip} style={{ background: cc.chipBg }}>
            <p className={styles.chip_label} style={{ color: cc.chipTxt }}>{s.label}</p>
            <p className={styles.chip_val} style={{ color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
