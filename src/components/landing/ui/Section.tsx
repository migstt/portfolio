import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Section wrapper. Vertical rhythm lives here rather than in every section, so
 * spacing stays consistent — previously each section repeated `py-24` and any
 * change meant editing six files.
 */

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  bordered?: boolean;
  /** Set false when the section supplies its own vertical padding (e.g. Hero). */
  padded?: boolean;
}

export function Section({
  children,
  id,
  className,
  bordered = true,
  padded = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-6 lg:px-10",
        padded && "py-20 md:py-24",
        bordered && "border-t border-border",
        className
      )}
    >
      {children}
    </section>
  );
}
