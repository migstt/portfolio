import { LayoutContainer } from "./LayoutContainer";
import { SubpageHeader } from "./header/SubpageHeader";
import { Footer } from "@/components/layout/footer/Footer";
import { DynamicBreadcrumb } from "./DynamicBreadcrumb";
import { ReactNode, CSSProperties } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function SubpageLayout({
  children,
  className = "",
  style = {},
}: LayoutProps) {
  return (
    <div
      className="min-h-screen bg-background text-foreground flex flex-col"
      style={style}
    >
      <LayoutContainer className={`flex flex-col flex-1 ${className}`}>
        <SubpageHeader />
        <DynamicBreadcrumb />
        <main className="p-4 flex-1">{children}</main>
        <Footer />
      </LayoutContainer>
    </div>
  );
}
