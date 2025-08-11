import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BriefcaseBusiness } from "lucide-react";
import { experiences } from "@/data/portfolioData";

export function Experience() {
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
