import { ReactNode, useState } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onExpand?: () => void;
  accentColor?: string;
  noPadding?: boolean;
}

export default function WidgetCard({ title, subtitle, children, onExpand, accentColor = '#7C3AED', noPadding }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', height: '100%',
        background: '#FFFFFF',
        borderRadius: 18,
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)'
          : '0 2px 12px rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '14px 16px 8px',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        flexShrink: 0,
        cursor: 'grab',
      }}
        className="widget-handle"
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: accentColor, flexShrink: 0,
            }} />
            <h3 style={{
              fontSize: 13, fontWeight: 600, color: '#1E293B',
              letterSpacing: '0.01em', lineHeight: 1,
            }}>
              {title}
            </h3>
          </div>
          {subtitle && (
            <p style={{ fontSize: 11, color: '#94A3B8', marginLeft: 15 }}>{subtitle}</p>
          )}
        </div>

        {onExpand && (
          <button
            onClick={onExpand}
            title="Ver detalle"
            style={{
              background: hovered ? 'rgba(124,58,237,0.08)' : 'transparent',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              padding: '4px 6px', color: '#94A3B8',
              transition: 'all 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#7C3AED'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: noPadding ? 0 : '0 12px 12px',
        overflow: 'hidden', minHeight: 0,
      }}>
        {children}
      </div>
    </div>
  );
}
