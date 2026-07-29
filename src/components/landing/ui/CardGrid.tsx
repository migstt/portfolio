import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Uniform card layout. One gap value everywhere, so sections cannot drift
 * apart visually the way they did when each defined its own grid.
 *
 * Flex rather than CSS grid, deliberately: with a real grid, a row that isn't
 * full leaves a hole on one side — 5 items across 3 columns puts 2 cards
 * left-aligned with a visible gap. Flex with `justify-center` centres any
 * short final row instead, so the layout stays balanced at any item count and
 * nobody has to keep the data length a multiple of the column count.
 *
 * Cards in the same row still stretch to equal height, since flex items
 * default to `stretch`.
 */

interface CardGridProps {
  children: ReactNode;
  /** Columns at the widest breakpoint. Always single-column on mobile. */
  cols?: 2 | 3;
  className?: string;
}

/*
 * Basis accounts for the 1rem gap: with 3 per row there are 2 gaps to share
 * across 3 items (2rem / 3 = 0.667rem each); with 2 per row, 1 gap across 2
 * items (0.5rem each).
 */
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
