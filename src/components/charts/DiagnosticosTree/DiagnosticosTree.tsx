import EChart from "../EChart";
import { diagnostics } from "../../../data/mockData";
import { useTheme, TOOLTIP_GLASS } from "../../../context/ThemeContext";

export default function DiagnosticosTree({ expanded }: { expanded?: boolean }) {
  const theme = useTheme();
  const total = diagnostics.reduce((s, d) => s + d.value, 0);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      ...TOOLTIP_GLASS,
      trigger: "item",
      formatter: (p: { name: string; value: number; color: string }) =>
        `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${p.color};margin-right:5px;"></span>` +
        `<b style="color:#18151F">${p.name}</b><br/><span style="color:#8B93A8">${p.value} pacientes · ${((p.value / total) * 100).toFixed(1)}%</span>`,
    },
    series: [
      {
        type: "treemap",
        roam: false,
        nodeClick: false,
        width: "100%",
        height: "100%",
        breadcrumb: { show: false },
        label: {
          show: true,
          position: "insideBottomRight",
          align: "right",
          verticalAlign: "bottom",
          lineHeight: expanded ? 18 : 16,
          formatter: (p: { name: string; value: number }) => {
            const name =
              p.name.length > 12 ? p.name.slice(0, 11) + "…" : p.name;
            return `{name|${name}}\n{value|${p.value}}`;
          },
          rich: {
            name: {
              fontWeight: 700,
              fontSize: expanded ? 13 : 11,
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
            },
            value: {
              fontWeight: 600,
              fontSize: expanded ? 12 : 10,
              color: "rgba(255,255,255,0.9)",
              fontFamily: "'Inter', sans-serif",
            },
          },
        },
        itemStyle: {
          borderColor:
            theme === "dark" ? "rgba(20,15,40,0.55)" : "rgba(255,255,255,0.65)",
          borderWidth: 2,
          gapWidth: 2,
          borderRadius: 8,
        },
        data: diagnostics.map((d) => ({
          name: d.name,
          value: d.value,
          itemStyle: { color: d.color },
        })),
      },
    ],
  };

  return (
    <EChart
      option={option}
      style={{ height: "100%", width: "100%" }}
      opts={{ renderer: "canvas" }}
    />
  );
}
