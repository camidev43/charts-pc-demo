import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Modal.module.css';
import { CloseIcon } from './icons';

interface Props {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  /** Se llama al hacer clic en el fondo o en el botón de cerrar. */
  onClose: () => void;
  children: ReactNode;
}

/**
 * Modal centrado con fondo que se desvanece y un panel con entrada tipo resorte.
 * Se monta y desmonta vía `AnimatePresence` para que la animación de salida se
 * reproduzca. Lo usa el dashboard para mostrar un chart ampliado.
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
                  <CloseIcon />
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
