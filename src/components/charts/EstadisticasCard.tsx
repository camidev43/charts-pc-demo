import { estadisticas, patientStats } from '../../data/mockData';
import { useChartTheme } from '../../context/ThemeContext';
import styles from '../../styles/EstadisticasCard.module.css';

/** Tarjeta resumen: total de pacientes, chips de riesgo y barras de métricas clínicas. */
export default function EstadisticasCard() {
  const { theme, cc } = useChartTheme();
  const dark = theme === 'dark';

  const riskChips = [
    { label: 'Alto',  val: patientStats.riskHigh,   color: '#FF3B30', bg: dark ? 'rgba(255,59,48,0.15)'  : '#FEF2F2' },
    { label: 'Medio', val: patientStats.riskMedium, color: '#FBBF24', bg: dark ? 'rgba(251,191,36,0.15)' : '#FFF8ED' },
    { label: 'Bajo',  val: patientStats.riskLow,    color: '#30B0C7', bg: dark ? 'rgba(48,176,199,0.15)'  : '#ECFDF7' },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.total_header}>
        <div>
          <p className={styles.total_label}>Total pacientes</p>
          <p className={styles.total_value}>{patientStats.total}</p>
        </div>
        <div className={styles.total_right}>
          <p className={styles.total_month_label}>Este mes</p>
          <p className={styles.total_new}>+{patientStats.monthlyNew}</p>
        </div>
      </div>

      <div className={styles.risk_chips}>
        {riskChips.map(r => (
          <div key={r.label} className={styles.risk_chip} style={{ background: r.bg }}>
            <p className={styles.risk_val} style={{ color: r.color }}>{r.val}%</p>
            <p className={styles.risk_label} style={{ color: r.color }}>{r.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.metrics}>
        {estadisticas.map(stat => (
          <div key={stat.label} className={styles.metric}>
            <div className={styles.metric_row}>
              <span className={styles.metric_label} style={{ color: cc.legend }}>{stat.label}</span>
              <span className={styles.metric_value} style={{ color: stat.color }}>{stat.value}</span>
            </div>
            <div className={styles.bar_track} style={{ background: cc.barTrack }}>
              <div className={styles.bar_fill} style={{
                width: `${stat.pct}%`,
                background: `linear-gradient(90deg, ${stat.color}, ${stat.color}88)`,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
