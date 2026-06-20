import { ReactNode } from "react";

interface Props {
  /** Columna (0-11) donde empieza el widget. */
  x: number;
  /** Fila donde empieza el widget. */
  y: number;
  /** Ancho en columnas. */
  w: number;
  /** Alto en celdas de la grilla. */
  h: number;
  /** Ancho máximo opcional en columnas. */
  maxW?: number;
  /** Ancho mínimo opcional en columnas. */
  minW?: number;
  /** Alto mínimo opcional en celdas. */
  minH?: number;
  children: ReactNode;
}

/**
 * Una celda del layout de GridStack. GridStack lee los atributos `gs-*` para
 * ubicar y dimensionar el widget, y exige la estructura exacta `.grid-stack-item
 * > .grid-stack-item-content`, por eso esas clases son parte de su contrato y
 * deben seguir siendo `div`s. Este componente solo elimina el doble-envoltorio
 * repetitivo del dashboard.
 */
export default function GridItem({ x, y, w, h, maxW, minW, minH, children }: Props) {
  return (
    <div
      className="grid-stack-item"
      gs-x={String(x)}
      gs-y={String(y)}
      gs-w={String(w)}
      gs-h={String(h)}
      {...(maxW ? { "gs-max-w": String(maxW) } : {})}
      {...(minW ? { "gs-min-w": String(minW) } : {})}
      {...(minH ? { "gs-min-h": String(minH) } : {})}
    >
      <div className="grid-stack-item-content">{children}</div>
    </div>
  );
}
