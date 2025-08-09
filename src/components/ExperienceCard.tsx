import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BriefcaseBusiness } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  start: string;
  end: string;
}

interface ExperienceCardProps {
  experiences: Experience[];
}

export function ExperienceCard({ experiences }: ExperienceCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <BriefcaseBusiness className="w-4 h-4" />
          Experience
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div>
          <div className="space-y-2">
            {experiences.map((exp, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between relative"
                >
                  <div className="flex items-start gap-5">
                    <div>
                      <h3 className="font-semibold text-sm">{exp.title}</h3>
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
