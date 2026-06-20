import { ReactNode } from "react";

interface Props {
  /** Column (0-11) where the widget starts. */
  x: number;
  /** Row where the widget starts. */
  y: number;
  /** Width in columns. */
  w: number;
  /** Height in grid cells. */
  h: number;
  /** Optional max width in columns. */
  maxW?: number;
  /** Optional min width in columns. */
  minW?: number;
  /** Optional min height in cells. */
  minH?: number;
  children: ReactNode;
}

/**
 * One cell in the GridStack layout. GridStack reads the `gs-*` attributes to
 * place and size the widget, and requires the exact `.grid-stack-item >
 * .grid-stack-item-content` structure, so those class names are part of its
 * contract and must stay as `div`s. This component just removes the repetitive
 * double-wrapper boilerplate from the dashboard.
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
