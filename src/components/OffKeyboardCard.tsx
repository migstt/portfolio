import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function OffKeyboardCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Off the Keyboard
        </CardTitle>

        <Badge
          variant="secondary"
          className="bg-[#FC4C02] text-white hover:bg-[#e04402] transition-colors"
        >
          Strava API
        </Badge>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Strava activities will be displayed here.
      </CardContent>
    </Card>
  );
}
