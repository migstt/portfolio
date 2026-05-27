import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  bordered?: boolean;
}

export function Section({
  children,
  id,
  className,
  bordered = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-6 lg:px-10",
        bordered && "border-t border-border",
        className
      )}
    >
      {children}
    </section>
  );
}
