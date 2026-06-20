import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { HeartPulseIcon, GaugeIcon, DropletIcon, ArrowRightIcon } from './icons';
import styles from '../styles/LandingCard.module.css';

interface Props {
  /** Entrar al dashboard. */
  onExplore: () => void;
  /** Alternar entre tema claro y oscuro. */
  onToggleTheme: () => void;
}

interface ModuleCardProps {
  /** Clase del CSS-module que da color/glow a la tarjeta. */
  variant: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  /** Retraso de la animación de entrada para que las tarjetas aparezcan escalonadas. */
  delay: number;
  onExplore: () => void;
}

/** Una tarjeta de módulo clicable de la pantalla de inicio. */
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
          <ArrowRightIcon />
        </span>
      </div>
    </motion.button>
  );
}

/** Pantalla de inicio: un título y tres tarjetas de módulo que llevan al dashboard. */
export default function LandingCard({ onExplore, onToggleTheme }: Props) {
  return (
    <motion.main
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      <ThemeToggle onToggle={onToggleTheme} className={styles.theme_btn} />

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

      <section className={styles.cards_wrapper} aria-label="Módulos disponibles">
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
      </section>
    </motion.main>
  );
}
