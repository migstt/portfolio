import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <CardContent>
        <div>
          <div className="space-y-3">
            {experiences.map((exp, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between relative"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex flex-col space-y-1">
                      <h2 className="font-semibold text-sm">{exp.title}</h2>
                      <p className="text-xs text-muted-foreground">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {exp.start} - {exp.end}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}