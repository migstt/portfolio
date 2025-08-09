import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity as ActivityIcon, CircleChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
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
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function OffKeyboardCard() {

  return (
    <Card className="h-90">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ActivityIcon className="w-4 h-4" />
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
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-3 text-sm font-semibold">Date</th>
              <th className="text-left py-2 px-3 text-sm font-semibold">Type</th>
              <th className="text-left py-2 px-3 text-sm font-semibold">Distance</th>
              <th className="text-left py-2 px-3 text-sm font-semibold">Time</th>
              {/* <th className="py-2 px-3" /> */}
            </tr>
          </thead>
          <tbody>
            {stravaActivities.map((activity) => (
              <tr
                key={activity.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-orange-50 dark:hover:bg-orange-900"
              >
                <td className="py-2 px-3 text-muted-foreground">
                  {formatDate(activity.start_date_local)}
                </td>
                <td className="py-2 px-3">
                  <Badge className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    {activity.type}
                  </Badge>
                </td>
                <td className="py-2 px-3 text-left font-medium text-gray-900 dark:text-gray-100">
                  {formatDistance(activity.distance)}
                </td>
                <td className="py-2 px-3 text-left text-gray-700 dark:text-gray-300">
                  {formatTime(activity.moving_time)}
                </td>
                {/* <td className="py-2 px-3 text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={`https://www.strava.com/activities/${activity.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View details for ${
                          activity.type
                        } on ${formatDate(activity.start_date_local)}`}
                        className="text-[#FC4C02] hover:text-[#e04402] transition-colors inline-flex items-center"
                      >
                        <CircleChevronRight className="w-5 h-5 stroke-[2]" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>View full activity on Strava</p>
                    </TooltipContent>
                  </Tooltip>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
