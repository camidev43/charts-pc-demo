import { useEffect, useRef, useState, ReactNode } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

import styles from "./Dashboard.module.css";
import WidgetCard from "./WidgetCard";
import Modal from "./Modal";
import DistribucionChart from "./charts/DistribucionChart/DistribucionChart";
import IMCBarChart from "./charts/IMCBarChart/IMCBarChart";
import RadarChart from "./charts/RadarChart/RadarChart";
import EstadisticasCard from "./charts/EstadisticasCard/EstadisticasCard";
import EvolucionChart from "./charts/EvolucionChart/EvolucionChart";
import PacientesMes from "./charts/PacientesMes/PacientesMes";
import DiagnosticosTree from "./charts/DiagnosticosTree/DiagnosticosTree";
import RiesgoDonut from "./charts/RiesgoDonut/RiesgoDonut";
import ActividadChart from "./charts/ActividadChart/ActividadChart";
import FactoresLine from "./charts/FactoresLine/FactoresLine";
import CasosAnio from "./charts/CasosAnio/CasosAnio";
const gs = (
  x: number,
  y: number,
  w: number,
  h: number,
  opts: { maxW?: number; minW?: number; minH?: number } = {},
) => ({
  "gs-x": String(x),
  "gs-y": String(y),
  "gs-w": String(w),
  "gs-h": String(h),
  ...(opts.maxW ? { "gs-max-w": String(opts.maxW) } : {}),
  ...(opts.minW ? { "gs-min-w": String(opts.minW) } : {}),
  ...(opts.minH ? { "gs-min-h": String(opts.minH) } : {}),
});

interface ModalState {
  title: string;
  subtitle: string;
  content: ReactNode;
}

interface Props {
  onBack: () => void;
  onToggleTheme: () => void;
}

const SunIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

export default function Dashboard({ onBack, onToggleTheme }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<GridStack | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!containerRef.current || gridRef.current) return;
    gridRef.current = GridStack.init(
      {
        column: 12,
        cellHeight: 82,
        margin: 8,
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

  const open = (title: string, subtitle: string, content: ReactNode) =>
    setModal({ title, subtitle, content });

  const CHART_H = 400;

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.top_bar}>
        <div className={styles.float_left}>
          <button className={styles.glass_btn} onClick={onBack}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
        </div>
        <div className={styles.float_right}>
          <button
            className={`${styles.glass_btn} ${styles.theme_btn}`}
            onClick={onToggleTheme}
            title="Cambiar tema"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>

      <div className={styles.grid_wrapper}>
        <div ref={containerRef} className="grid-stack">
          {/* Row 1 */}
          <div className="grid-stack-item" {...gs(0, 0, 4, 3, { minH: 2 })}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Distribución regional"
                subtitle="Pacientes y riesgo por departamento"
                accentColor="#0A84FF"
                onExpand={() =>
                  open(
                    "Distribución regional",
                    "Pacientes y porcentaje de riesgo por región",
                    <div style={{ height: CHART_H }}>
                      <DistribucionChart expanded />
                    </div>,
                  )
                }
              >
                <DistribucionChart />
              </WidgetCard>
            </div>
          </div>

          <div
            className="grid-stack-item"
            {...gs(4, 0, 2, 3, { maxW: 4, minH: 2 })}
          >
            <div className="grid-stack-item-content">
              <WidgetCard
                title="IMC mensual"
                subtitle="Promedio 2024"
                accentColor="#FBBF24"
                onExpand={() =>
                  open(
                    "IMC mensual",
                    "Índice de masa corporal promedio mensual",
                    <div style={{ height: CHART_H }}>
                      <IMCBarChart expanded />
                    </div>,
                  )
                }
              >
                <IMCBarChart />
              </WidgetCard>
            </div>
          </div>

          <div
            className="grid-stack-item"
            {...gs(6, 0, 2, 3, { maxW: 4, minH: 2 })}
          >
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Indicadores"
                subtitle="Perfil metabólico"
                accentColor="#FF8A00"
                onExpand={() =>
                  open(
                    "Indicadores metabólicos",
                    "Comparación con valores de referencia",
                    <div style={{ height: CHART_H }}>
                      <RadarChart expanded />
                    </div>,
                  )
                }
              >
                <RadarChart />
              </WidgetCard>
            </div>
          </div>

          <div className="grid-stack-item" {...gs(8, 0, 4, 3, { minH: 2 })}>
            <div className="grid-stack-item-content">
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
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid-stack-item" {...gs(0, 3, 5, 3, { minH: 2 })}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Evolución metabólica"
                subtitle="Glucosa · Triglicéridos · HDL"
                accentColor="#FF8A00"
                onExpand={() =>
                  open(
                    "Evolución metabólica",
                    "Tendencia semanal y mensual de marcadores clave",
                    <div style={{ height: CHART_H }}>
                      <EvolucionChart expanded />
                    </div>,
                  )
                }
              >
                <EvolucionChart />
              </WidgetCard>
            </div>
          </div>

          <div
            className="grid-stack-item"
            {...gs(5, 3, 3, 3, { maxW: 5, minH: 2 })}
          >
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Total pacientes"
                subtitle="Distribución por nivel de riesgo"
                accentColor="#0A84FF"
              >
                <PacientesMes />
              </WidgetCard>
            </div>
          </div>

          <div className="grid-stack-item" {...gs(8, 3, 4, 3, { minH: 2 })}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Diagnósticos"
                subtitle="Distribución por patología"
                accentColor="#FBBF24"
                onExpand={() =>
                  open(
                    "Diagnósticos principales",
                    "Distribución por categoría diagnóstica",
                    <div style={{ height: CHART_H + 40 }}>
                      <DiagnosticosTree expanded />
                    </div>,
                  )
                }
              >
                <DiagnosticosTree />
              </WidgetCard>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid-stack-item" {...gs(0, 6, 3, 3, { minH: 2 })}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Distribución de riesgo"
                subtitle="Por nivel de severidad"
                accentColor="#FF3B30"
                onExpand={() =>
                  open(
                    "Distribución de riesgo",
                    "Porcentaje de pacientes por nivel de riesgo cardiovascular",
                    <div style={{ height: CHART_H }}>
                      <RiesgoDonut expanded />
                    </div>,
                  )
                }
              >
                <RiesgoDonut />
              </WidgetCard>
            </div>
          </div>

          <div
            className="grid-stack-item"
            {...gs(3, 6, 2, 3, { maxW: 4, minH: 2 })}
          >
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Actividad física"
                subtitle="Calorías semanales"
                accentColor="#30B0C7"
                onExpand={() =>
                  open(
                    "Actividad física",
                    "Consumo calórico semanal de los pacientes",
                    <div style={{ height: CHART_H }}>
                      <ActividadChart expanded />
                    </div>,
                  )
                }
              >
                <ActividadChart />
              </WidgetCard>
            </div>
          </div>

          <div className="grid-stack-item" {...gs(5, 6, 4, 3, { minH: 2 })}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Factores de riesgo"
                subtitle="Evolución anual de marcadores metabólicos"
                accentColor="#FF2D92"
                onExpand={() =>
                  open(
                    "Factores de riesgo",
                    "Evolución anual de todos los marcadores metabólicos",
                    <div style={{ height: CHART_H }}>
                      <FactoresLine expanded />
                    </div>,
                  )
                }
              >
                <FactoresLine />
              </WidgetCard>
            </div>
          </div>

          <div className="grid-stack-item" {...gs(9, 6, 3, 3, { minH: 2 })}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Casos por año"
                subtitle="Pacientes diagnosticados por año"
                accentColor="#0A84FF"
                onExpand={() =>
                  open(
                    "Casos por año",
                    "Pacientes diagnosticados con síndrome metabólico por año",
                    <div style={{ height: CHART_H }}>
                      <CasosAnio expanded />
                    </div>,
                  )
                }
              >
                <CasosAnio />
              </WidgetCard>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!modal}
        title={modal?.title ?? ""}
        subtitle={modal?.subtitle}
        onClose={() => setModal(null)}
      >
        {modal?.content}
      </Modal>
    </motion.div>
  );
}
