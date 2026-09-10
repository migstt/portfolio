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

/*
 * One value for both gaps around the breadcrumb, so the space above it matches
 * the space below it. SubpageHeader deliberately carries no bottom padding —
 * the gap under it is owned here, otherwise the two sides drift apart.
 */
const BREADCRUMB_GAP = "mt-8";

export function SubpageLayout({
  children,
  className = "",
  style = {},
  pageTitle,
}: SubpageLayoutProps) {
  return (
    <div
      className="min-h-screen text-foreground flex flex-col"
      style={style}
    >
      <LayoutContainer className={`flex flex-col flex-1 w-full ${className}`}>
        <SubpageHeader />
        <DynamicBreadcrumb pageTitle={pageTitle} className={BREADCRUMB_GAP} />
        <main className={`px-4 pb-2 flex-1 ${BREADCRUMB_GAP}`}>{children}</main>
        <Footer />
      </LayoutContainer>
    </div>
  );
}
