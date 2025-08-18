import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SeemoreButton } from "@/components/general/SeemoreButton";
import { Briefcase } from "lucide-react";
import { experiences } from "@/data/portfolioData";

export function Experience() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Experience
        </CardTitle>
        <SeemoreButton
          href="experience"
          label="View timeline"
          page="experience"
        />
      </CardHeader>
      <CardContent className="flex-1 mt-1">
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-semibold">{exp.title}</h3>
                <p className="text-xs text-muted-foreground">{exp.company}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {exp.start} - {exp.end}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
