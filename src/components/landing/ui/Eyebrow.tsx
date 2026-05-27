import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[11px] font-mono uppercase tracking-widest text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}
