import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";
import { aboutText } from "@/data/portfolioData";

export function About() {
  const email = "mft.trinidad@gmail.com";

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CircleUserRound className="w-4 h-4" />
          About
        </CardTitle>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">{email}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{aboutText}</p>
      </CardContent>
    </Card>
  );
}
