import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import styles from './LandingCard.module.css';

interface Props {
  onExplore: () => void;
  onToggleTheme: () => void;
}

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

const HeartPulseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.4 4.6a5.5 5.5 0 0 0-7.8 0L12 5.2l-.6-.6a5.5 5.5 0 0 0-7.8 7.8l.6.6L12 21l7.8-8 .6-.6a5.5 5.5 0 0 0 0-7.8z"/>
    <path d="M3.5 12.5h4l1.5-3 2.5 6 1.8-4 1.2 2h4.5"/>
  </svg>
);

const GaugeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17a9 9 0 1 1 18 0"/>
    <path d="M12 17l4.2-4.2"/>
    <circle cx="12" cy="17" r="1.6" fill="currentColor" stroke="none"/>
    <path d="M5.5 13.5l1.4.6M18.5 13.5l-1.4.6M12 6.5V8"/>
  </svg>
);

const DropletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.2c3.2 3.6 6.5 7.2 6.5 11.1A6.5 6.5 0 0 1 5.5 14.3C5.5 10.4 8.8 6.8 12 3.2z"/>
    <path d="M9 14.5a3 3 0 0 0 3 3"/>
  </svg>
);

interface ModuleCardProps {
  variant: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  onExplore: () => void;
}

function ModuleCard({ variant, title, description, icon, delay, onExplore }: ModuleCardProps) {
  const theme = useTheme();
  const dark = theme === 'dark';
  const gridStroke = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';

  return (
    <motion.button
      type="button"
      className={`${styles.card} ${styles[variant]}`}
      onClick={onExplore}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <div className={styles.hero}>
        <div className={styles.glow_a} />
        <div className={styles.glow_b} />
        <svg className={styles.hero_grid} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 24} x2="200" y2={i * 24} stroke={gridStroke} strokeWidth="0.5" />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={i * 24} y1="0" x2={i * 24} y2="200" stroke={gridStroke} strokeWidth="0.5" />
          ))}
        </svg>
        <div className={styles.icon_ring} />
        <div className={styles.icon}>{icon}</div>
      </div>

      <div className={styles.panel}>
        <h3 className={styles.card_title}>{title}</h3>
        <p className={styles.card_desc}>{description}</p>
        <span className={styles.cta}>
          Explorar
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </motion.button>
  );
}

export default function LandingCard({ onExplore, onToggleTheme }: Props) {
  const theme = useTheme();

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      <button className={styles.theme_btn} onClick={onToggleTheme} title="Cambiar tema">
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <motion.header
        className={styles.intro}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className={styles.eyebrow}>Informe clínico</p>
        <h1 className={styles.heading}>Síndrome metabólico</h1>
        <p className={styles.lede}>Selecciona un módulo para explorar los indicadores</p>
      </motion.header>

      <div className={styles.cards_wrapper}>
        <ModuleCard
          variant="mod_metabolico"
          title="Síndrome metabólico"
          description="Panel completo de factores de riesgo cardiovascular y marcadores clínicos."
          icon={<HeartPulseIcon />}
          delay={0.12}
          onExplore={onExplore}
        />
        <ModuleCard
          variant="mod_hipertension"
          title="Hipertensión arterial"
          description="Seguimiento de la presión arterial y su impacto en el riesgo metabólico."
          icon={<GaugeIcon />}
          delay={0.22}
          onExplore={onExplore}
        />
        <ModuleCard
          variant="mod_diabetes"
          title="Diabetes tipo 2"
          description="Control glucémico y evolución de la resistencia a la insulina."
          icon={<DropletIcon />}
          delay={0.32}
          onExplore={onExplore}
        />
      </div>
    </motion.div>
  );
}
