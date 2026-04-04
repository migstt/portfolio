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
        <p className="text-sm text-muted-foreground">No certifications found.</p>
      </TerminalCardContent>
    </TerminalCard>
  );
}
