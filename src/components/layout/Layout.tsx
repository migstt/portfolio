import { ReactNode, CSSProperties } from "react";
import { MainHeader } from "./MainHeader";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Layout({ children, className = "", style }: LayoutProps) {
  return (
    <div
      className={`min-h-screen bg-background text-foreground flex flex-col`}
      style={style}
    >
      <div className={`mx-auto max-w-5xl sm:px-12 lg:px-20 ${className}`}>
        <MainHeader />
        <main className="lg:py-6 p-4">{children}</main>
      </div>
    </div>
  );
}
