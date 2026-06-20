import { useEffect, useRef, useState, ReactNode } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { motion } from "framer-motion";

import styles from "../styles/Dashboard.module.css";
import WidgetCard from "./WidgetCard";
import GridItem from "./GridItem";
import ThemeToggle from "./ThemeToggle";
import Modal from "./Modal";
import { BackIcon } from "./icons";
import DistribucionChart from "./charts/DistribucionChart";
import IMCBarChart from "./charts/IMCBarChart";
import RadarChart from "./charts/RadarChart";
import EstadisticasCard from "./charts/EstadisticasCard";
import EvolucionChart from "./charts/EvolucionChart";
import PacientesMes from "./charts/PacientesMes";
import DiagnosticosTree from "./charts/DiagnosticosTree";
import RiesgoDonut from "./charts/RiesgoDonut";
import ActividadChart from "./charts/ActividadChart";
import FactoresLine from "./charts/FactoresLine";
import CasosAnio from "./charts/CasosAnio";

interface ModalState {
  title: string;
  subtitle: string;
  content: ReactNode;
}

interface Props {
  onBack: () => void;
  onToggleTheme: () => void;
}

/** Alto (px) del chart mostrado dentro del modal expandido. */
const MODAL_CHART_H = 400;

/**
 * Vista del dashboard: una grilla GridStack de tarjetas-widget arrastrables y
 * redimensionables, cada una con un chart. El botón de expandir de una tarjeta
 * abre ese chart en grande en un modal. La grilla se inicializa una vez al
 * montar; los charts se dimensionan solos vía su ResizeObserver (ver EChart.tsx).
 */
export default function Dashboard({ onBack, onToggleTheme }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<GridStack | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);

  useEffect(() => {
    if (!containerRef.current || gridRef.current) return;
    gridRef.current = GridStack.init(
      {
        column: 12,
        cellHeight: 82,
        margin: 8,
        // Con animate los widgets vecinos se deslizan al hueco liberado al
        // arrastrar o redimensionar (en vez de saltar de golpe).
        animate: true,
        draggable: { handle: ".widget_handle" },
        resizable: { handles: "se" },
        float: false,
        columnOpts: {
          breakpointForWindow: true,
          breakpoints: [
            { w: 768, c: 6 },
            { w: 520, c: 1 },
          ],
        },
      },
      containerRef.current,
    );
    return () => {
      gridRef.current?.destroy(false);
      gridRef.current = null;
    };
  }, []);

  /** Abre el modal con el chart dado ampliado a {@link MODAL_CHART_H}. */
  const open = (title: string, subtitle: string, chart: ReactNode, height = MODAL_CHART_H) =>
    setModal({ title, subtitle, content: <div style={{ height }}>{chart}</div> });

  return (
    <motion.main
      className={styles.page}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className={styles.top_bar}>
        <div className={styles.float_left}>
          <button className={styles.glass_btn} onClick={onBack}>
            <BackIcon />
            Volver
          </button>
        </div>
        <div className={styles.float_right}>
          <ThemeToggle
            onToggle={onToggleTheme}
            className={`${styles.glass_btn} ${styles.theme_btn}`}
          />
        </div>
      </header>

      <section className={styles.grid_wrapper} aria-label="Panel de indicadores">
        <div ref={containerRef} className="grid-stack">
          {/* Row 1 */}
          <GridItem x={0} y={0} w={4} h={3} minH={2}>
            <WidgetCard
              title="Distribución regional"
              subtitle="Pacientes y riesgo por departamento"
              accentColor="#0A84FF"
              onExpand={() =>
                open(
                  "Distribución regional",
                  "Pacientes y porcentaje de riesgo por región",
                  <DistribucionChart expanded />,
                )
              }
            >
              <DistribucionChart />
            </WidgetCard>
          </GridItem>

          <GridItem x={4} y={0} w={2} h={3} maxW={4} minH={2}>
            <WidgetCard
              title="IMC mensual"
              subtitle="Promedio 2024"
              accentColor="#FBBF24"
              onExpand={() =>
                open(
                  "IMC mensual",
                  "Índice de masa corporal promedio mensual",
                  <IMCBarChart expanded />,
                )
              }
            >
              <IMCBarChart />
            </WidgetCard>
          </GridItem>

          <GridItem x={6} y={0} w={2} h={3} maxW={4} minH={2}>
            <WidgetCard
              title="Indicadores"
              subtitle="Perfil metabólico"
              accentColor="#FF8A00"
              onExpand={() =>
                open(
                  "Indicadores metabólicos",
                  "Comparación con valores de referencia",
                  <RadarChart expanded />,
                )
              }
            >
              <RadarChart />
            </WidgetCard>
          </GridItem>

          <GridItem x={8} y={0} w={4} h={3} minH={2}>
            <WidgetCard
              title="Estadísticas clínicas"
              subtitle="Resumen y distribución de riesgo"
              accentColor="#30B0C7"
              noPadding
            >
              <div
                style={{
                  padding: "0 12px 12px",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <EstadisticasCard />
              </div>
            </WidgetCard>
          </GridItem>

          {/* Row 2 */}
          <GridItem x={0} y={3} w={5} h={3} minH={2}>
            <WidgetCard
              title="Evolución metabólica"
              subtitle="Glucosa · Triglicéridos · HDL"
              accentColor="#FF8A00"
              onExpand={() =>
                open(
                  "Evolución metabólica",
                  "Tendencia semanal y mensual de marcadores clave",
                  <EvolucionChart expanded />,
                )
              }
            >
              <EvolucionChart />
            </WidgetCard>
          </GridItem>

          <GridItem x={5} y={3} w={3} h={3} maxW={5} minH={2}>
            <WidgetCard
              title="Total pacientes"
              subtitle="Distribución por nivel de riesgo"
              accentColor="#0A84FF"
            >
              <PacientesMes />
            </WidgetCard>
          </GridItem>

          <GridItem x={8} y={3} w={4} h={3} minH={2}>
            <WidgetCard
              title="Diagnósticos"
              subtitle="Distribución por patología"
              accentColor="#FBBF24"
              onExpand={() =>
                open(
                  "Diagnósticos principales",
                  "Distribución por categoría diagnóstica",
                  <DiagnosticosTree expanded />,
                  MODAL_CHART_H + 40,
                )
              }
            >
              <DiagnosticosTree />
            </WidgetCard>
          </GridItem>

          {/* Row 3 */}
          <GridItem x={0} y={6} w={3} h={3} minH={2}>
            <WidgetCard
              title="Distribución de riesgo"
              subtitle="Por nivel de severidad"
              accentColor="#FF3B30"
              onExpand={() =>
                open(
                  "Distribución de riesgo",
                  "Porcentaje de pacientes por nivel de riesgo cardiovascular",
                  <RiesgoDonut expanded />,
                )
              }
            >
              <RiesgoDonut />
            </WidgetCard>
          </GridItem>

          <GridItem x={3} y={6} w={2} h={3} maxW={4} minH={2}>
            <WidgetCard
              title="Actividad física"
              subtitle="Calorías semanales"
              accentColor="#30B0C7"
              onExpand={() =>
                open(
                  "Actividad física",
                  "Consumo calórico semanal de los pacientes",
                  <ActividadChart expanded />,
                )
              }
            >
              <ActividadChart />
            </WidgetCard>
          </GridItem>

          <GridItem x={5} y={6} w={4} h={3} minH={2}>
            <WidgetCard
              title="Factores de riesgo"
              subtitle="Evolución anual de marcadores metabólicos"
              accentColor="#FF2D92"
              onExpand={() =>
                open(
                  "Factores de riesgo",
                  "Evolución anual de todos los marcadores metabólicos",
                  <FactoresLine expanded />,
                )
              }
            >
              <FactoresLine />
            </WidgetCard>
          </GridItem>

          <GridItem x={9} y={6} w={3} h={3} minH={2}>
            <WidgetCard
              title="Casos por año"
              subtitle="Pacientes diagnosticados por año"
              accentColor="#0A84FF"
              onExpand={() =>
                open(
                  "Casos por año",
                  "Pacientes diagnosticados con síndrome metabólico por año",
                  <CasosAnio expanded />,
                )
              }
            >
              <CasosAnio />
            </WidgetCard>
          </GridItem>
        </div>
      </section>

      <Modal
        isOpen={!!modal}
        title={modal?.title ?? ""}
        subtitle={modal?.subtitle}
        onClose={() => setModal(null)}
      >
        {modal?.content}
      </Modal>
    </motion.main>
  );
}
