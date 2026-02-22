import { TerminalCard, TerminalCardContent } from "@/components/ui/terminal-card";
import { Award } from "lucide-react";

export function Certifications() {
  return (
    <TerminalCard
      title="Certifications"
      icon={<Award className="w-3.5 h-3.5" />}
      className="h-full flex flex-col"
    >
      <TerminalCardContent className="flex-1 flex items-center justify-center">
        <div className="font-mono text-xs space-y-1 text-muted-foreground">
          <p>
            <span className="text-primary">guest@miguel</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>$ </span>
            <span className="text-foreground">ls certifications/</span>
          </p>
          <p>No files found — check back soon.</p>
        </div>
      </TerminalCardContent>
    </TerminalCard>
  );
}
