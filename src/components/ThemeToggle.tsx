import { useTheme } from "../context/ThemeContext";

const SunIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

interface Props {
  /** Called when the user clicks the toggle. */
  onToggle: () => void;
  /** Visual styling — differs between the landing and the dashboard top bar. */
  className?: string;
}

/**
 * Shared light/dark theme switch. Shows a sun while in dark mode (click to go
 * light) and a moon while in light mode. Used by both the landing and the
 * dashboard, which is why the markup lives here instead of being duplicated.
 */
export default function ThemeToggle({ onToggle, className }: Props) {
  const theme = useTheme();
  const label = theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro";

  return (
    <button className={className} onClick={onToggle} title="Cambiar tema" aria-label={label}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
