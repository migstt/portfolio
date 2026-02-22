import { TerminalCard, TerminalCardContent } from "@/components/ui/terminal-card";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";
import { techCategories } from "@/data/portfolioData";

export function TechStack() {
  return (
    <TerminalCard
      title="Tech Stack"
      icon={<Layers className="w-3.5 h-3.5" />}
      className="h-full flex flex-col"
    >
      <TerminalCardContent className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-2">
          {techCategories.map(({ label, items }) => (
            <div key={label}>
              <h3 className="text-sm font-semibold mb-2">{label}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TerminalCardContent>
    </TerminalCard>
  );
}
