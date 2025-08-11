import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import { OffKeyboardTable } from "./OffKeyboardTable";

export function OffKeyboard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Off the Keyboard
        </CardTitle>

        <Badge
          variant="secondary"
          className="bg-[#FC4C02] text-white hover:bg-[#e04402] transition-colors"
        >
          Strava
        </Badge>
      </CardHeader>

      <CardContent className="max-h-[400px] overflow-y-auto text-sm">
        <OffKeyboardTable />
      </CardContent>
    </Card>
  );
}
