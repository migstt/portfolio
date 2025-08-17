import { LayoutContainer } from "./LayoutContainer";
import { SubpageHeader } from "./header/SubpageHeader";
import { Footer } from "@/components/layout/footer/Footer";
import { DynamicBreadcrumb } from "./DynamicBreadcrumb";
import { ReactNode, CSSProperties } from "react";

interface SubpageLayoutProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  pageTitle?: string;
}

export function SubpageLayout({
  children,
  className = "",
  style = {},
  pageTitle,
}: SubpageLayoutProps) {
  return (
    <div
      className="min-h-screen bg-background text-foreground flex flex-col"
      style={style}
    >
      <LayoutContainer className={`flex flex-col flex-1 w-full ${className}`}>
        <SubpageHeader />
        <DynamicBreadcrumb pageTitle={pageTitle} />
        <main className="p-4 flex-1">{children}</main>
        <Footer />
      </LayoutContainer>
    </div>
  );
}
