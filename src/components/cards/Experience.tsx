import { TerminalCard, TerminalCardContent } from "@/components/ui/terminal-card";
import { Badge } from "@/components/ui/badge";
import { SeemoreButton } from "@/components/general/SeemoreButton";
import { Briefcase } from "lucide-react";
import { experiences } from "@/data/portfolioData";
import Image from "next/image";

export function Experience() {
  return (
    <TerminalCard
      title="Experience"
      icon={<Briefcase className="w-3.5 h-3.5" />}
      headerRight={
        <SeemoreButton
          href="experience"
          label="View timeline"
          page="experience"
        />
      }
      className="h-full flex flex-col"
    >
      <TerminalCardContent>
        <div className="space-y-5">
          {experiences.map((exp, idx) => {
            const isCurrent = exp.end === "Present";
            return (
              <div
                key={idx}
                className="flex items-center justify-between relative"
              >
                <div className="flex items-center gap-3">
                  {exp.logo && (
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={32}
                      height={32}
                      className="rounded-full object-cover shrink-0"
                    />
                  )}
                  <div className="flex flex-col gap-0.5">
                    <h2 className="font-semibold text-sm">{exp.title}</h2>
                    <p className="text-xs text-muted-foreground">
                      {exp.company}
                    </p>
                  </div>
                </div>
                {isCurrent ? (
                  <Badge className="text-xs bg-primary text-primary-foreground hover:bg-primary/90">
                    Present
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    {exp.start} - {exp.end}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </TerminalCardContent>
    </TerminalCard>
  );
}
