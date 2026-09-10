import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardGridProps {
  children: ReactNode;
  /** Columns at the widest breakpoint. Always single-column on mobile. */
  cols?: 2 | 3;
  className?: string;
}

const BASIS: Record<2 | 3, string> = {
  2: "[&>*]:sm:basis-[calc(50%-0.5rem)]",
  3: "[&>*]:sm:basis-[calc(50%-0.5rem)] [&>*]:lg:basis-[calc(33.333%-0.667rem)]",
};

export function CardGrid({ children, cols = 2, className }: CardGridProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-4 [&>*]:basis-full",
        BASIS[cols],
        className
      )}
    >
      {children}
    </div>
  );
}
