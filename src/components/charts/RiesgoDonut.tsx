import EChart from './EChart';
import { patientStats } from '../../data/mockData';
import { useChartTheme } from '../../context/ThemeContext';

/** Donut de distribución de pacientes por nivel de riesgo cardiovascular. */
export default function RiesgoDonut({ expanded }: { expanded?: boolean }) {
  const { theme, cc, tooltip } = useChartTheme();

  const data = [
    { value: patientStats.riskHigh,   name: 'Alto',  itemStyle: { color: '#FF3B30' } },
    { value: patientStats.riskMedium, name: 'Medio', itemStyle: { color: '#FBBF24' } },
    { value: patientStats.riskLow,    name: 'Bajo',  itemStyle: { color: '#30B0C7' } },
  ];

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...tooltip,
      trigger: 'item',
      formatter: (p: { name: string; value: number; color: string }) =>
        `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${p.color};margin-right:5px;"></span>`
        + `<b style="color:#18151F">${p.name}</b>&ensp;<span style="color:#8B93A8">${p.value}%</span>`,
    },
    legend: {
      bottom: expanded ? 12 : 4,
      textStyle: { color: cc.legend, fontSize: expanded ? 12 : 10 },
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
        itemStyle: {
          borderRadius: 6,
          borderColor: theme === 'dark' ? 'rgba(20,15,40,0.5)' : 'rgba(255,255,255,0.8)',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'center',
          formatter: () => `{big|${patientStats.riskHigh}%}\n{sub|Riesgo\nAlto}`,
          rich: {
            big: { fontSize: expanded ? 28 : 22, fontWeight: 800, color: '#FF3B30', fontFamily: 'Inter', lineHeight: 32 },
            sub: { fontSize: 10, color: cc.text, lineHeight: 15, fontFamily: 'Inter' },
          },
        },
        emphasis: { label: { show: true } },
        data,
      },
    ],
  };

  return (
    <EChart option={option} />
  );
}
