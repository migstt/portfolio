import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

export function Certifications() {
  return (
    <Card className="h-full flex flex-col bg-muted/30 border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-4 h-4" />
          Certifications
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex items-center justify-center">
        <p className="text-xs text-muted-foreground">
          No certifications yet — check back soon.
        </p>
      </CardContent>
    </Card>
  );
}
