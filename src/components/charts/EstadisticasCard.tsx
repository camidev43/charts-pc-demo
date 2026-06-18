import { estadisticas, patientStats } from '../../data/mockData';

export default function EstadisticasCard() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* Total header */}
      <div style={{
        background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
        borderRadius: 12, padding: '10px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 500, marginBottom: 2 }}>
            Total pacientes
          </p>
          <p style={{ color: 'white', fontSize: 24, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
            {patientStats.total}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginBottom: 2 }}>Este mes</p>
          <p style={{ color: '#A7F3D0', fontSize: 16, fontWeight: 700 }}>+{patientStats.monthlyNew}</p>
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {[
          { label: 'Alto', val: patientStats.riskHigh, color: '#EF4444', bg: '#FEF2F2' },
          { label: 'Medio', val: patientStats.riskMedium, color: '#F59E0B', bg: '#FFFBEB' },
          { label: 'Bajo', val: patientStats.riskLow, color: '#10B981', bg: '#ECFDF5' },
        ].map(r => (
          <div key={r.label} style={{
            flex: 1, background: r.bg, borderRadius: 10, padding: '7px 8px', textAlign: 'center',
          }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: r.color }}>{r.val}%</p>
            <p style={{ fontSize: 10, color: r.color, opacity: 0.8, fontWeight: 500 }}>{r.label}</p>
          </div>
        ))}
      </div>

      {/* Metrics list */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
        {estadisticas.map(stat => (
          <div key={stat.label} style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>{stat.label}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: stat.color }}>{stat.value}</span>
            </div>
            <div style={{ height: 5, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${stat.pct}%`,
                background: `linear-gradient(90deg, ${stat.color}, ${stat.color}88)`,
                borderRadius: 3,
                transition: 'width 1s cubic-bezier(.22,1,.36,1)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
