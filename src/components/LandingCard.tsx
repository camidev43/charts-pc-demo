import { motion } from 'framer-motion';

interface Props {
  onExplore: () => void;
}

const Orb = ({ cx, cy, r, color, delay }: { cx: string; cy: string; r: number; color: string; delay: number }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: cx, top: cy,
      width: r * 2, height: r * 2,
      borderRadius: '50%',
      background: color,
      filter: `blur(${r * 0.7}px)`,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
    }}
    animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.8, 0.55] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const ECGLine = () => (
  <svg
    viewBox="0 0 360 60"
    style={{ position: 'absolute', bottom: 180, left: 0, right: 0, width: '100%', opacity: 0.35 }}
    preserveAspectRatio="none"
  >
    <motion.polyline
      points="0,30 40,30 55,30 65,8 75,52 85,30 120,30 135,30 145,14 150,46 155,30 180,30 200,30 215,10 222,50 228,30 260,30 275,30 285,16 290,44 295,30 330,30 360,30"
      fill="none"
      stroke="url(#ecgGrad)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }}
    />
    <defs>
      <linearGradient id="ecgGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#7C3AED" stopOpacity="0" />
        <stop offset="40%"  stopColor="#7C3AED" />
        <stop offset="60%"  stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default function LandingCard({ onExplore }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: '100vw', height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#080410',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Page background orbs */}
      <Orb cx="15%"  cy="20%" r={180} color="rgba(124,58,237,0.18)"  delay={0} />
      <Orb cx="85%"  cy="75%" r={200} color="rgba(14,165,233,0.15)"  delay={1.5} />
      <Orb cx="50%"  cy="90%" r={120} color="rgba(132,204,22,0.10)"  delay={2.8} />

      {/* THE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{
          width: 360, height: 580,
          borderRadius: 32,
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(145deg, #1a0b3b 0%, #0d1a3e 45%, #0a0f1e 100%)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
          cursor: 'pointer',
        }}
      >
        {/* Card inner orbs */}
        <Orb cx="25%"  cy="30%" r={90}  color="rgba(124,58,237,0.45)" delay={0.3} />
        <Orb cx="78%"  cy="20%" r={70}  color="rgba(14,165,233,0.35)" delay={1.2} />
        <Orb cx="60%"  cy="65%" r={60}  color="rgba(132,204,22,0.2)"  delay={2.0} />

        {/* Subtle dot grid */}
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.08 }} width="360" height="580">
          {Array.from({ length: 12 }, (_, col) =>
            Array.from({ length: 19 }, (_, row) => (
              <circle key={`${col}-${row}`} cx={col * 30 + 15} cy={row * 30 + 15} r={1.5} fill="white" />
            ))
          )}
        </svg>

        {/* ECG animation */}
        <ECGLine />

        {/* Gradient overlay bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,4,16,0.97) 0%, rgba(8,4,16,0.6) 42%, transparent 65%)',
        }} />

        {/* TOP BAR */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 22px',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'rgba(124,58,237,0.25)',
              border: '1px solid rgba(124,58,237,0.5)',
              borderRadius: 20, padding: '5px 13px',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={{ color: '#C4B5FD', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em' }}>
              INFORME CLÍNICO
            </span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
            </svg>
          </motion.button>
        </div>

        {/* CENTER VISUAL — pulsing ring */}
        <motion.div
          style={{
            position: 'absolute', top: 130, left: '50%',
            transform: 'translateX(-50%)',
            width: 80, height: 80,
            borderRadius: '50%',
            border: '2px solid rgba(124,58,237,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(124,58,237,0.2)', border: '1.5px solid rgba(124,58,237,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* BOTTOM CONTENT */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 28px' }}>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', marginBottom: 6 }}>
              ANÁLISIS INTEGRAL · 2024
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 42, fontWeight: 700, lineHeight: 1.05,
              color: 'white', marginBottom: 8,
            }}>
              Síndrome<br />
              <span style={{ color: '#A78BFA' }}>Metabólico</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 22 }}>
              Factores de riesgo cardiovascular
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ display: 'flex', gap: 10, marginBottom: 20 }}
          >
            {[
              { icon: '👥', label: '247 pacientes' },
              { icon: '⚠️', label: '34% riesgo alto' },
              { icon: '📊', label: 'IMC 28.4' },
            ].map((s) => (
              <div key={s.label} style={{
                flex: 1, background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12, padding: '8px 10px',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ fontSize: 13 }}>{s.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.025, background: 'rgba(255,255,255,0.97)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onExplore}
            style={{
              width: '100%', padding: '15px 0',
              background: 'rgba(255,255,255,0.92)',
              border: 'none', borderRadius: 16,
              fontSize: 15, fontWeight: 600, color: '#1E1B4B',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8,
              fontFamily: "'Inter', sans-serif",
              transition: 'background 0.2s',
            }}
          >
            Explorar Informe
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
