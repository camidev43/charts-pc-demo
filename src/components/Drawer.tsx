import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Drawer({ isOpen, title, subtitle, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(8,4,16,0.55)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 35 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
              width: 'min(580px, 90vw)',
              background: '#FFFFFF',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.2)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '28px 28px 20px',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              background: 'linear-gradient(135deg, #faf8ff 0%, #f0f8ff 100%)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
                    borderRadius: 20, padding: '3px 10px', marginBottom: 10,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#7C3AED', letterSpacing: '0.06em' }}>
                      DETALLE
                    </span>
                  </div>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22, fontWeight: 700, color: '#1E293B', marginBottom: 4,
                  }}>
                    {title}
                  </h2>
                  {subtitle && (
                    <p style={{ fontSize: 13, color: '#64748B' }}>{subtitle}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  style={{
                    background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: '50%',
                    width: 36, height: 36, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#64748B', flexShrink: 0, marginTop: 4,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.12)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflow: 'auto', padding: '24px 28px' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
