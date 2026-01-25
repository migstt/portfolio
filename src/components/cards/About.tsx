import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";
import { aboutText } from "@/data/portfolioData";

export function About() {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CircleUserRound className="w-4 h-4" />
          About
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">{aboutText}</p>
      </CardContent>
    </Card>
  );
}
