"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity as ActivityIcon } from "lucide-react";
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
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-200 dark:border-gray-700">
              <TableHead className="text-left text-sm font-semibold">
                Date
              </TableHead>
              <TableHead className="text-center text-sm font-semibold">
                Type
              </TableHead>
              <TableHead className="text-left text-sm font-semibold">
                Distance
              </TableHead>
              <TableHead className="text-left text-sm font-semibold">
                Time
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {stravaActivities.map((activity) => (
              <TableRow
                key={activity.id}
                onClick={() =>
                  window.open(
                    `https://www.strava.com/activities/${activity.id}`,
                    "_blank"
                  )
                }
                className="border-b border-gray-100 dark:border-gray-800 cursor-pointer 
                  hover:bg-[rgba(252,76,2,0.1)] dark:hover:bg-[rgba(252,76,2,0.3)] transition-colors"
                // Accessible: keyboard focus + screen readers
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    window.open(
                      `https://www.strava.com/activities/${activity.id}`,
                      "_blank"
                    );
                  }
                }}
                role="link"
                aria-label={`View Strava activity ${
                  activity.type
                } on ${formatDate(activity.start_date_local)}`}
              >
                <TableCell className="py-2 px-3 text-muted-foreground">
                  {formatDate(activity.start_date_local)}
                </TableCell>

                <TableCell className="py-2 px-3">
                  <Badge className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    {activity.type}
                  </Badge>
                </TableCell>

                <TableCell className="py-2 px-3 font-medium text-gray-900 dark:text-gray-100">
                  {formatDistance(activity.distance)}
                </TableCell>

                <TableCell className="py-2 px-3 text-gray-700 dark:text-gray-300">
                  {formatTime(activity.moving_time)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
