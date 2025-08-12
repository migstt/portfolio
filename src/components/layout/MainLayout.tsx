import { LayoutContainer } from "./LayoutContainer";
import { MainHeader } from "@/components/layout/header/MainHeader";
import { Footer } from "@/components/layout/footer/Footer";
import { ReactNode, CSSProperties } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Layout({ children, className = "", style = {} }: LayoutProps) {
  return (
    <div
      className="min-h-screen bg-background text-foreground flex flex-col"
      style={style}
    >
      <LayoutContainer className={className}>
        <MainHeader />
        <main className="p-4">{children}</main>
        <Footer />
      </LayoutContainer>
    </div>
  );
}
