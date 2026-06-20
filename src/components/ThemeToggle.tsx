import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "./icons";

interface Props {
  /** Se llama al hacer clic en el botón. */
  onToggle: () => void;
  /** Estilos — difieren entre la landing y la barra superior del dashboard. */
  className?: string;
}

/**
 * Botón compartido de cambio de tema. Muestra un sol en modo oscuro (clic para
 * pasar a claro) y una luna en modo claro. Lo usan tanto la landing como el
 * dashboard, por eso el markup vive aquí en vez de estar duplicado.
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
