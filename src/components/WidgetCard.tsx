import { ReactNode, useState } from "react";
import styles from "../styles/WidgetCard.module.css";
import { ExpandIcon } from "./icons";

interface Props {
  /** Título mostrado en la cabecera de la tarjeta. */
  title: string;
  /** Segunda línea opcional bajo el título. */
  subtitle?: string;
  children: ReactNode;
  /** Si se pasa, renderiza un botón de expandir que abre el chart en un modal. */
  onExpand?: () => void;
  /** Color del punto junto al título. */
  accentColor?: string;
  /** Quita el padding por defecto del cuerpo (para tarjetas que pad su contenido). */
  noPadding?: boolean;
}

/** Los 2×2 puntos que marcan la zona arrastrable de la cabecera. */
const GripDots = () => (
  <div className={styles.grip}>
    {[0, 1].map((r) => (
      <div key={r} className={styles.grip_row}>
        {[0, 1].map((c) => (
          <div key={c} className={styles.grip_dot} />
        ))}
      </div>
    ))}
  </div>
);

/**
 * Tarjeta "glass" que enmarca un chart dentro de la grilla. Su cabecera hace de
 * handle de arrastre de GridStack (`.widget_handle`) y opcionalmente muestra un
 * botón de expandir. Se renderiza como `<article>` por ser autocontenida.
 */
export default function WidgetCard({
  title,
  subtitle,
  children,
  onExpand,
  accentColor = "#5E5CE6",
  noPadding,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={`${styles.card} ${hovered ? styles.card_hovered : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <header className={`${styles.header} widget_handle`}>
        <GripDots />

        <div className={styles.title_area}>
          <div className={styles.title_row}>
            <span
              className={styles.accent_dot}
              style={{ background: accentColor }}
            />
            <h3 className={styles.title}>{title}</h3>
          </div>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {onExpand && (
          <button
            className={styles.expand_btn}
            onClick={onExpand}
            title="Expandir"
            aria-label="Expandir"
          >
            <ExpandIcon />
          </button>
        )}
      </header>

      <div className={`${styles.body} ${noPadding ? "" : styles.body_padded}`}>
        {children}
      </div>
    </article>
  );
}
