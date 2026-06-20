import { ReactNode, useState } from "react";
import styles from "../styles/WidgetCard.module.css";

interface Props {
  /** Heading shown in the card header. */
  title: string;
  /** Optional second line under the title. */
  subtitle?: string;
  children: ReactNode;
  /** When provided, renders an expand button that opens the chart in a modal. */
  onExpand?: () => void;
  /** Colour of the dot next to the title. */
  accentColor?: string;
  /** Drop the default body padding (e.g. for cards that pad their own content). */
  noPadding?: boolean;
}

/** The 2×2 dot grip that marks the draggable area of the card header. */
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
 * Glass card that frames a chart inside the grid. Its header doubles as the
 * GridStack drag handle (`.widget_handle`) and optionally shows an expand
 * button. Rendered as an `<article>` since each widget is self-contained.
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
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
        )}
      </header>

      <div className={`${styles.body} ${noPadding ? "" : styles.body_padded}`}>
        {children}
      </div>
    </article>
  );
}
