# Arquitectura — Dashboard Síndrome Metabólico

Demo de tablero clínico construido con **React 18 + Vite + TypeScript**, charts con
**Apache ECharts**, grilla arrastrable con **GridStack** y animaciones con **Framer Motion**.

---

## 1. Estructura de carpetas

```
src/
├── App.tsx                 # Raíz: estado de vista (landing/dashboard) + tema
├── main.tsx                # Punto de entrada de React
├── index.css               # Estilos globales + variables de tema (:root)
│
├── components/
│   ├── LandingCard.tsx     # Pantalla de inicio (3 módulos)
│   ├── Dashboard.tsx       # Grilla de widgets + modal
│   ├── WidgetCard.tsx      # Tarjeta "glass" que enmarca un chart
│   ├── GridItem.tsx        # Celda de GridStack (envoltorio reutilizable)
│   ├── Modal.tsx           # Modal para ver un chart en grande
│   ├── ThemeToggle.tsx     # Botón sol/luna compartido
│   ├── icons.tsx           # Todos los iconos SVG, centralizados
│   │
│   └── charts/
│       ├── EChart.tsx      # ◀ Primitivo: envuelve ECharts (ver §3)
│       ├── IMCBarChart.tsx # Charts "preset" (uno por widget)
│       ├── RadarChart.tsx
│       └── ... (11 charts)
│
├── context/
│   └── ThemeContext.tsx    # Tema + chartColors() + useChartTheme() + tooltip
│
├── data/
│   └── mockData.ts         # Datos de ejemplo
│
├── styles/                 # ◀ Todos los .module.css juntos
│   ├── Dashboard.module.css
│   └── ...
│
└── types/                  # Declaraciones de tipos (css modules, gs-* attrs)
```

**Regla simple:** componentes en `components/`, charts en `components/charts/`,
estilos en `styles/`. Nada de una carpeta por archivo.

---

## 2. Capas

El proyecto está en **3 capas**, de lo más genérico a lo más específico:

```
┌─────────────────────────────────────────────┐
│  Dashboard / LandingCard   (composición)     │  ← arma la pantalla
├─────────────────────────────────────────────┤
│  Charts "preset": IMCBarChart, RadarChart…   │  ← cada uno arma su `option`
├─────────────────────────────────────────────┤
│  EChart  (primitivo)                         │  ← renderiza cualquier option
└─────────────────────────────────────────────┘
        + useChartTheme()  (tema transversal)
```

### `EChart` — el primitivo
Recibe un `option` de ECharts y lo renderiza. **Es lo único que toca ECharts
directamente** y resuelve el problema de tamaño (ver §3). Todos los charts pasan
por aquí.

### Charts "preset" — uno por widget
Cada chart (`IMCBarChart`, `RadarChart`, …) es un componente que:
1. Toma sus datos de `data/mockData.ts`.
2. Lee los colores del tema con `useChartTheme()`.
3. Construye el objeto `option` de ECharts.
4. Renderiza `<EChart option={option} />`.

Son **declarativos y autocontenidos**: el dashboard solo escribe `<IMCBarChart />`.

### `useChartTheme()` — el tema, en un solo lugar
Antes cada chart repetía:
```tsx
const theme = useTheme();
const cc = chartColors(theme);
```
Ahora es una línea:
```tsx
const { cc, tooltip } = useChartTheme();
// cc      → colores derivados (ejes, grillas, leyenda…)
// tooltip → estilo "glass" compartido
// theme   → 'light' | 'dark' (si lo necesitas directo)
```
Si mañana cambias la paleta, se toca **un solo archivo**: `context/ThemeContext.tsx`.

---

## 3. ¿Por qué `EChart` tiene un `ResizeObserver`?

Es la solución a un bug real: los charts salían **en blanco** al cargar y solo
aparecían al redimensionar la ventana.

**Causa:** los widgets montan con alto `100%`, pero GridStack le da a la celda su
alto real en píxeles un frame *después*. ECharts mide su contenedor al
inicializar, ve `0` y se queda con un canvas de `0×0`.

**Fix:** un `ResizeObserver` sobre el contenedor del chart. En cuanto la celda
recibe alto real, llama `chart.resize({ width, height })` con dimensiones
**explícitas** (no deja que ECharts re-mida un DOM en carrera). Como vive dentro
de `EChart`, los 11 charts lo heredan gratis.

---

## 4. Cómo consumir / agregar un chart

### Agregar un chart nuevo al dashboard
1. Crea `components/charts/MiChart.tsx`:
   ```tsx
   import EChart from "./EChart";
   import { useChartTheme } from "../../context/ThemeContext";

   /** Descripción corta de qué muestra. */
   export default function MiChart({ expanded }: { expanded?: boolean }) {
     const { cc, tooltip } = useChartTheme();
     const option = {
       backgroundColor: "transparent",
       tooltip: { ...tooltip, trigger: "axis" },
       xAxis: { type: "category", data: [/* … */] },
       yAxis: { type: "value" },
       series: [{ type: "bar", data: [/* … */] }],
     };
     return <EChart option={option} />;
   }
   ```
2. En `Dashboard.tsx`, agrégalo dentro de un `<GridItem>`:
   ```tsx
   <GridItem x={0} y={9} w={4} h={3} minH={2}>
     <WidgetCard title="Mi chart" accentColor="#0A84FF">
       <MiChart />
     </WidgetCard>
   </GridItem>
   ```

### Cambiar el tipo de un gráfico
Como cada chart **es solo un `option`**, cambiar de barras a líneas es cambiar
`series[].type`:
```tsx
series: [{ type: "line" /* antes "bar" */, data }]
```

---

## 5. Recomendación: charts genéricos reutilizables (a futuro)

Hoy cada widget es un chart "preset" (datos + option juntos). Funciona muy bien
para un dashboard fijo. **Si en el futuro quieres reutilizar el mismo tipo de
gráfico en muchos lugares** (como tenían antes: "un BarChart, un DonutChart…"),
el patrón recomendado es crear **componentes genéricos tipados** sobre `EChart`:

```tsx
// components/charts/BarChart.tsx
import EChart from "./EChart";
import { useChartTheme } from "../../context/ThemeContext";

interface BarChartProps {
  labels: string[];
  values: number[];
  color?: string;
}

/** Gráfico de barras genérico y reutilizable. */
export default function BarChart({ labels, values, color = "#0A84FF" }: BarChartProps) {
  const { cc, tooltip } = useChartTheme();
  return (
    <EChart option={{
      backgroundColor: "transparent",
      tooltip: { ...tooltip, trigger: "axis" },
      xAxis: { type: "category", data: labels, axisLabel: { color: cc.text } },
      yAxis: { type: "value", axisLabel: { color: cc.text } },
      series: [{ type: "bar", data: values, itemStyle: { color } }],
    }} />
  );
}
```

Y se consume pasando solo datos:
```tsx
<BarChart labels={["Ene","Feb","Mar"]} values={[10, 20, 15]} color="#FBBF24" />
<DonutChart data={[{ name: "Alto", value: 34 }]} />
```

**Ventajas:** reúsas el mismo componente N veces, cambiar de tipo es cambiar
`<BarChart>` por `<LineChart>` con los mismos datos, y el tema queda dentro del
genérico. Es el camino natural si esto crece de demo a producto.

> Para este demo se mantuvieron los presets (ya funcionan y son claros). Los
> genéricos se pueden ir creando bajo `components/charts/` sin romper nada.

---

## 6. Resumen de decisiones

| Tema | Decisión | Por qué |
|------|----------|---------|
| Render de charts | `echarts-for-react` + resize explícito | El bug era el `resize()` sin dimensiones, no la librería |
| Tamaño de charts | `ResizeObserver` en `EChart` | Pinta al primer layout sin depender de timings |
| Tema | `useChartTheme()` hook | Un solo lugar; sin repetición en cada chart |
| Iconos | `components/icons.tsx` | Centralizados como funciones, sin SVG duplicado |
| Estilos | carpeta `styles/` | Todo junto, sin carpeta por archivo |
| Grilla | `GridItem` + `animate: true` | Menos boilerplate; los widgets se deslizan al reacomodarse |
