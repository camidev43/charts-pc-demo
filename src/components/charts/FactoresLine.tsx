import EChart from './EChart';
import { factoresLine } from '../../data/mockData';
import { useChartTheme } from '../../context/ThemeContext';

/** Líneas de evolución anual de los marcadores metabólicos. */
export default function FactoresLine({ expanded }: { expanded?: boolean }) {
  const { cc, tooltip } = useChartTheme();

  const series = factoresLine.series.map(s => ({
    name: s.name,
    type: 'line',
    data: s.data,
    smooth: 0.5,
    smoothMonotone: 'x',
    showSymbol: false,
    symbol: 'circle',
    symbolSize: expanded ? 7 : 5,
    lineStyle: {
      color: s.color,
      width: expanded ? 2.5 : 2,
      cap: 'round',
      shadowColor: s.color + '33',
      shadowBlur: 10,
      shadowOffsetY: 4,
    },
    itemStyle: { color: s.color },
    emphasis: { focus: 'series', scale: 1.2, lineStyle: { width: expanded ? 3.5 : 3 } },
    blur: { lineStyle: { opacity: 0.12 } },
    endLabel: {
      show: true,
      formatter: (p: { value: number }) => `${p.value}`,
      color: s.color,
      fontSize: expanded ? 12 : 10,
      fontWeight: 700,
      fontFamily: 'Inter',
      offset: [6, 0],
    },
  }));

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      ...tooltip,
      trigger: 'axis',
      axisPointer: { lineStyle: { color: cc.grid, width: 1 } },
      formatter: (params: { seriesName: string; value: number; color: string }[]) =>
        params.map(p =>
          `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${p.color};margin-right:5px;"></span>`
          + `<span style="color:#8B93A8">${p.seriesName}</span>&ensp;<b style="color:#18151F">${p.value}</b>`
        ).join('<br/>'),
    },
    legend: {
      top: expanded ? 6 : 2,
      left: 'center',
      textStyle: { color: cc.legend, fontSize: expanded ? 12 : 10 },
      icon: 'roundRect',
      itemWidth: 10,
      itemHeight: 4,
      itemGap: expanded ? 18 : 12,
      data: factoresLine.series.map(s => s.name),
    },
    grid: {
      left: expanded ? 34 : 28,
      right: expanded ? 46 : 38,
      top: expanded ? 40 : 32,
      bottom: expanded ? 30 : 22,
    },
    xAxis: {
      type: 'category',
      data: factoresLine.months,
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: cc.text, fontSize: expanded ? 12 : 10, margin: 12 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: cc.grid, type: 'dashed' } },
      axisLabel: { color: cc.text, fontSize: 10, margin: 8 },
    },
    series,
  };

  return (
    <EChart option={option} />
  );
}
