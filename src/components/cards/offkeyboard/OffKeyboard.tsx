import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, CircleArrowRight } from "lucide-react";
import { OffKeyboardTable } from "./OffKeyboardTable";

export function OffKeyboard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Off the Keyboard
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-[#FC4C02] text-white hover:bg-[#e04402] transition-colors text-xs font-bold"
          >
            Strava API
          </Badge>
        </div>
        <a
          href="https://www.strava.com/athletes/115133923"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="See more on Strava"
        >
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium leading-none">
              See more <span className="sr-only">Strava activities</span>
            </span>
            <CircleArrowRight className="w-4 h-4 stroke-[2] mt-[1px]" aria-hidden="true" />
          </div>
        </a>
      </CardHeader>

      <CardContent className="max-h-[400px] overflow-y-auto text-sm">
        <OffKeyboardTable />
      </CardContent>
    </Card>
  );
}
