import { TerminalCard, TerminalCardContent } from "@/components/ui/terminal-card";
import { CircleUserRound } from "lucide-react";
import { aboutText } from "@/data/portfolioData";

export function About() {
  return (
    <TerminalCard title="About" icon={<CircleUserRound className="w-3.5 h-3.5" />} className="h-full">
      <TerminalCardContent>
        <p className="text-sm leading-relaxed">{aboutText}</p>
      </TerminalCardContent>
    </TerminalCard>
  );
}
