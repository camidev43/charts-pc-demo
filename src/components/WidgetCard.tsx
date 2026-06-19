import { ReactNode, useState } from "react";
import styles from "./WidgetCard.module.css";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onExpand?: () => void;
  accentColor?: string;
  noPadding?: boolean;
}

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
    <div
      className={`${styles.card} ${hovered ? styles.card_hovered : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`${styles.header} widget_handle`}>
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
      </div>

      <div className={`${styles.body} ${noPadding ? "" : styles.body_padded}`}>
        {children}
      </div>
    </div>
  );
}
