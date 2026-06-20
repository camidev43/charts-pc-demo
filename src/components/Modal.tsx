import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Modal.module.css';

interface Props {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  /** Called on backdrop click or the close button. */
  onClose: () => void;
  children: ReactNode;
}

/**
 * Centered modal with a fading backdrop and a spring-scaled panel. Mounts and
 * unmounts through `AnimatePresence` so the exit animation can play. Used by the
 * dashboard to show an expanded chart.
 */
export default function Modal({ isOpen, title, subtitle, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          <motion.div
            key="modal"
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              className={styles.panel}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 8 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            >
              <header className={styles.header}>
                <div className={styles.header_left}>
                  <h2 className={styles.title}>{title}</h2>
                  {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
                <button className={styles.close_btn} onClick={onClose} aria-label="Cerrar">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 1l12 12M13 1L1 13"/>
                  </svg>
                </button>
              </header>

              <div className={styles.body}>{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
