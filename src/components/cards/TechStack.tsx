import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";
import { techCategories } from "@/data/portfolioData";

export function TechStack() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Tech Stack
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto">
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
      </CardContent>
    </Card>
  );
}
