import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TechTagProps {
  children: ReactNode;
  className?: string;
}

export function TechTag({ children, className }: TechTagProps) {
  return (
    <span className={cn("text-xs font-mono text-muted-foreground", className)}>
      {children}
    </span>
  );
}
