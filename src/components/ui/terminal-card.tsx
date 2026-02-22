import * as React from "react";
import { cn } from "@/lib/utils";

interface TerminalCardProps extends React.ComponentProps<"div"> {
  title?: string;
  icon?: React.ReactNode;
  headerRight?: React.ReactNode;
}

function TerminalCard({
  title,
  icon,
  headerRight,
  className,
  children,
  ...props
}: TerminalCardProps) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(icon || title) && (
            <span className="flex items-center gap-1.5 text-[0.9rem] font-semibold text-muted-foreground">
              {icon}
              {title}
            </span>
          )}
        </div>
        {headerRight && <div>{headerRight}</div>}
      </div>
      {children}
    </div>
  );
}

function TerminalCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("px-4 py-4", className)} {...props} />;
}

export { TerminalCard, TerminalCardContent };
