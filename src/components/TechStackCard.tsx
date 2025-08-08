import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";

interface TechStackCardProps {
  stack: string[];
}

export function TechStackCard({ stack }: TechStackCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Tech Stack
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2 mt-1">
        {stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </CardContent>
    </Card>
  );
}
