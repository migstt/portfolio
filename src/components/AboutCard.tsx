import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";

interface AboutCardProps {
  about: string;
}

export function AboutCard({ about }: AboutCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleUserRound className="w-4 h-4" />
          About Me
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{about}</p>
      </CardContent>
    </Card>
  );
}
