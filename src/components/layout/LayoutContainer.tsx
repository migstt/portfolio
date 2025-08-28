import { ReactNode, CSSProperties } from "react";

interface LayoutContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function LayoutContainer({
  children,
  className = "",
  style,
}: LayoutContainerProps) {
  return (
    <div
      className={`mx-auto max-w-5xl sm:px-12 lg:px-2 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
