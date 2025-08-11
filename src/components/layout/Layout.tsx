import { ReactNode, CSSProperties } from "react";
import { MainHeader } from "./MainHeader";
import { MainFooter } from "./MainFooter";

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
        <main className="p-4">{children}</main>
        <MainFooter />
      </div>
    </div>
  );
}
