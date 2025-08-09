import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";

interface TechCategory {
  label: string;
  items: string[];
}

interface TechStackCardProps {
  categories: TechCategory[];
}

export function TechStackCard({ categories }: TechStackCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Tech Stack
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 mt-1">
        {categories.map(({ label, items }) => (
          <div key={label}>
            <h3 className="text-sm font-semibold mb-2">
              {label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
