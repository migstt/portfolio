import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

/*
 * Section heading. `description` is optional and gives sections a plain-language
 * line under the title without each one inventing its own paragraph styling.
 */

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
  center?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  center = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn("mb-12 max-w-3xl", center && "mx-auto text-center", className)}
    >
      <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
