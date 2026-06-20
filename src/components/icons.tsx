/**
 * Iconos SVG de la app, centralizados como funciones para no repetir el markup
 * inline en cada componente. Todos heredan el color vía `currentColor`.
 */

/** Sol — se muestra en modo oscuro (clic para pasar a claro). */
export const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

/** Luna — se muestra en modo claro (clic para pasar a oscuro). */
export const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

/** Flecha izquierda — botón "Volver" del dashboard. */
export const BackIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

/** Flecha derecha — CTA "Explorar" de la landing. */
export const ArrowRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/** Expandir — botón de la cabecera de cada widget para abrir el modal. */
export const ExpandIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

/** Cerrar (✕) — botón de cierre del modal. */
export const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M1 1l12 12M13 1L1 13" />
  </svg>
);

/** Corazón con pulso — módulo "Síndrome metabólico" (se dimensiona por CSS). */
export const HeartPulseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.4 4.6a5.5 5.5 0 0 0-7.8 0L12 5.2l-.6-.6a5.5 5.5 0 0 0-7.8 7.8l.6.6L12 21l7.8-8 .6-.6a5.5 5.5 0 0 0 0-7.8z" />
    <path d="M3.5 12.5h4l1.5-3 2.5 6 1.8-4 1.2 2h4.5" />
  </svg>
);

/** Manómetro — módulo "Hipertensión arterial". */
export const GaugeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17a9 9 0 1 1 18 0" />
    <path d="M12 17l4.2-4.2" />
    <circle cx="12" cy="17" r="1.6" fill="currentColor" stroke="none" />
    <path d="M5.5 13.5l1.4.6M18.5 13.5l-1.4.6M12 6.5V8" />
  </svg>
);

/** Gota — módulo "Diabetes tipo 2". */
export const DropletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.2c3.2 3.6 6.5 7.2 6.5 11.1A6.5 6.5 0 0 1 5.5 14.3C5.5 10.4 8.8 6.8 12 3.2z" />
    <path d="M9 14.5a3 3 0 0 0 3 3" />
  </svg>
);
