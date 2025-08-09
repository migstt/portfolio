import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import stravaActivities from "@/data/stravaActivities.json";

function formatDistance(meters: number) {
  return (meters / 1000).toFixed(1) + " km";
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function OffKeyboardCard() {
  // Take 30 activities
  const activities = stravaActivities.slice(0, 30);

  // Fill up to 36 cubes with null for empty cubes
  const totalCubes = 36;
  const cubes = [...activities];
  while (cubes.length < totalCubes) cubes.push(null);

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
          Strava
        </Badge>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-6 gap-2">
          {cubes.map((activity, idx) =>
            activity ? (
              <Tooltip key={activity.id}>
                <TooltipTrigger asChild>
                  <div
                    className="w-10 h-10 rounded-sm cursor-pointer"
                    style={{
                      backgroundColor: "#FC4C02",
                      border: "2px solid #E04302",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontWeight: "600",
                      userSelect: "none",
                      fontSize: "0.75rem",
                    }}
                  >
                    {new Date(activity.start_date_local).getDate()}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-1">
                    <p className="font-semibold">{activity.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(activity.start_date_local)} • {activity.type}
                    </p>
                    <p className="text-xs">
                      Distance: {formatDistance(activity.distance)}
                    </p>
                    <p className="text-xs">
                      Moving time: {formatTime(activity.moving_time)}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ) : (
              <div
                key={`empty-${idx}`}
                className="w-10 h-10 rounded-sm bg-gray-200 border border-gray-300"
              />
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
