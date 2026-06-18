import { useEffect, useRef, useState, ReactNode } from 'react';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack-extra.min.css';
import { motion } from 'framer-motion';

import WidgetCard from './WidgetCard';
import Drawer from './Drawer';
import DistribucionChart from './charts/DistribucionChart';
import IMCBarChart from './charts/IMCBarChart';
import RadarChart from './charts/RadarChart';
import EstadisticasCard from './charts/EstadisticasCard';
import EvolucionChart from './charts/EvolucionChart';
import PacientesMes from './charts/PacientesMes';
import DiagnosticosTree from './charts/DiagnosticosTree';
import RiesgoDonut from './charts/RiesgoDonut';
import ActividadChart from './charts/ActividadChart';
import FactoresLine from './charts/FactoresLine';

const gs = (x: number, y: number, w: number, h: number) => ({
  'gs-x': String(x), 'gs-y': String(y), 'gs-w': String(w), 'gs-h': String(h),
});

interface DrawerState { title: string; subtitle: string; content: ReactNode }

export default function Dashboard({ onBack }: { onBack: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<GridStack | null>(null);
  const [drawer, setDrawer] = useState<DrawerState | null>(null);

  useEffect(() => {
    if (!containerRef.current || gridRef.current) return;
    gridRef.current = GridStack.init(
      {
        column: 12,
        cellHeight: 82,
        margin: 8,
        animate: true,
        draggable: { handle: '.widget-handle' },
        resizable: { handles: 'se,sw,ne,nw,e,w,n,s' },
        float: false,
      },
      containerRef.current
    );
    return () => {
      gridRef.current?.destroy(false);
      gridRef.current = null;
    };
  }, []);

  const open = (title: string, subtitle: string, content: ReactNode) =>
    setDrawer({ title, subtitle, content });

  const now = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F0F2F8', overflow: 'hidden' }}
    >
      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #1e3a5f 100%)',
        padding: '0 20px',
        height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
        boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
      }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(124,58,237,0.3)',
            border: '1.5px solid rgba(167,139,250,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 500, letterSpacing: '0.1em' }}>INFORME CLÍNICO</p>
            <p style={{
              color: 'white', fontSize: 15, fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
            }}>
              Síndrome Metabólico
            </p>
          </div>
        </div>

        {/* Center */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 500 }}>
            Dr. Carlos Rivera · Bogotá, Colombia
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>{now}</p>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(16,185,129,0.15)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 20, padding: '5px 12px',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ color: '#6EE7B7', fontSize: 11, fontWeight: 600 }}>En línea</span>
          </div>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10, padding: '6px 14px', color: 'rgba(255,255,255,0.7)',
              fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
          >
            ← Volver
          </button>
        </div>
      </div>

      {/* GRID */}
      <div style={{ flex: 1, overflow: 'auto', padding: '10px 10px 14px' }}>
        <div ref={containerRef} className="grid-stack">

          {/* ROW 1 */}
          <div className="grid-stack-item" {...gs(0, 0, 4, 3)}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Distribución Regional"
                subtitle="Pacientes y riesgo por departamento"
                accentColor="#7C3AED"
                onExpand={() => open('Distribución Regional', 'Pacientes y porcentaje de riesgo por región', <div style={{ height: 420 }}><DistribucionChart expanded /></div>)}
              >
                <DistribucionChart />
              </WidgetCard>
            </div>
          </div>

          <div className="grid-stack-item" {...gs(4, 0, 2, 3)}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="IMC Mensual"
                subtitle="Promedio 2024"
                accentColor="#F59E0B"
                onExpand={() => open('IMC Mensual', 'Índice de masa corporal promedio mensual', <div style={{ height: 380 }}><IMCBarChart expanded /></div>)}
              >
                <IMCBarChart />
              </WidgetCard>
            </div>
          </div>

          <div className="grid-stack-item" {...gs(6, 0, 2, 3)}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Indicadores"
                subtitle="Perfil metabólico"
                accentColor="#0EA5E9"
                onExpand={() => open('Indicadores Metabólicos', 'Comparación con valores de referencia', <div style={{ height: 400 }}><RadarChart expanded /></div>)}
              >
                <RadarChart />
              </WidgetCard>
            </div>
          </div>

          <div className="grid-stack-item" {...gs(8, 0, 4, 3)}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Estadísticas Clínicas"
                subtitle="Resumen y distribución de riesgo"
                accentColor="#10B981"
                noPadding
              >
                <div style={{ padding: '0 12px 12px', height: '100%', boxSizing: 'border-box' }}>
                  <EstadisticasCard />
                </div>
              </WidgetCard>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid-stack-item" {...gs(0, 3, 5, 3)}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Evolución Metabólica"
                subtitle="Glucosa · Triglicéridos · HDL"
                accentColor="#7C3AED"
                onExpand={() => open('Evolución Metabólica', 'Tendencia semanal y mensual de marcadores clave', <div style={{ height: 420 }}><EvolucionChart expanded /></div>)}
              >
                <EvolucionChart />
              </WidgetCard>
            </div>
          </div>

          <div className="grid-stack-item" {...gs(5, 3, 3, 3)}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Total Pacientes"
                subtitle="Distribución por nivel de riesgo"
                accentColor="#0EA5E9"
              >
                <PacientesMes />
              </WidgetCard>
            </div>
          </div>

          <div className="grid-stack-item" {...gs(8, 3, 4, 3)}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Diagnósticos"
                subtitle="Distribución por patología"
                accentColor="#84CC16"
                onExpand={() => open('Diagnósticos Principales', 'Distribución por categoría diagnóstica', <div style={{ height: 440 }}><DiagnosticosTree expanded /></div>)}
              >
                <DiagnosticosTree />
              </WidgetCard>
            </div>
          </div>

          {/* ROW 3 */}
          <div className="grid-stack-item" {...gs(0, 6, 3, 3)}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Distribución de Riesgo"
                subtitle="Por nivel de severidad"
                accentColor="#EF4444"
                onExpand={() => open('Distribución de Riesgo', 'Porcentaje de pacientes por nivel de riesgo cardiovascular', <div style={{ height: 400 }}><RiesgoDonut expanded /></div>)}
              >
                <RiesgoDonut />
              </WidgetCard>
            </div>
          </div>

          <div className="grid-stack-item" {...gs(3, 6, 2, 3)}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Actividad Física"
                subtitle="Calorías semanales"
                accentColor="#7C3AED"
                onExpand={() => open('Actividad Física', 'Consumo calórico semanal de los pacientes', <div style={{ height: 380 }}><ActividadChart expanded /></div>)}
              >
                <ActividadChart />
              </WidgetCard>
            </div>
          </div>

          <div className="grid-stack-item" {...gs(5, 6, 7, 3)}>
            <div className="grid-stack-item-content">
              <WidgetCard
                title="Factores de Riesgo"
                subtitle="Evolución anual de marcadores metabólicos"
                accentColor="#EC4899"
                onExpand={() => open('Factores de Riesgo', 'Evolución anual de todos los marcadores metabólicos', <div style={{ height: 420 }}><FactoresLine expanded /></div>)}
              >
                <FactoresLine />
              </WidgetCard>
            </div>
          </div>

        </div>
      </div>

      {/* DRAWER */}
      <Drawer
        isOpen={!!drawer}
        title={drawer?.title ?? ''}
        subtitle={drawer?.subtitle}
        onClose={() => setDrawer(null)}
      >
        {drawer?.content}
      </Drawer>
    </motion.div>
  );
}
