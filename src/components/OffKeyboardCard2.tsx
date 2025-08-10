"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import stravaActivities from "@/data/stravaActivities.json";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";

type Activity = {
  id: number;
  date: string;
  type: string;
  distance: number;
  time: number;
};

interface StravaActivity {
  resource_state: number;
  athlete: {
    id: number;
    resource_state: number;
  };
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: number;
  id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  location_city: string | null;
  location_state: string | null;
  location_country: string | null;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: {
    id: string;
    summary_polyline: string;
    resource_state: number;
  };
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: string | null;
  start_latlng: number[];
  end_latlng: number[];
  average_speed: number;
  max_speed: number;
  has_heartrate: boolean;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
  upload_id: number;
  upload_id_str: string;
  external_id: string;
  from_accepted_tag: boolean;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
}

const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-left text-sm font-semibold">Date</div>,
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    },
    enableSorting: false,
  },
  {
    accessorKey: "type",
    header: () => <div className="text-center text-sm font-semibold">Type</div>,
    cell: ({ getValue }) => (
      <div className="flex justify-center">
        <Badge variant="secondary">{getValue() as string}</Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "distance",
    header: ({ column }) => (
      <div
        className="flex items-center justify-start cursor-pointer select-none gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="text-sm font-semibold">Distance</span>
        <ArrowUpDown className="h-3 w-3 opacity-70 text-[#FC4C02] dark:text-[#FF7F50]" />
      </div>
    ),
    cell: ({ getValue }) => {
      const meters = getValue() as number;
      return (meters / 1000).toFixed(1) + " km";
    },
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <div
        className="flex items-center justify-start cursor-pointer select-none gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="text-sm font-semibold">Time</span>
        <ArrowUpDown className="h-3 w-3 opacity-70 text-[#FC4C02] dark:text-[#FF7F50]" />
      </div>
    ),
    cell: ({ getValue }) => {
      const seconds = getValue() as number;
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
    },
  },
];

const data = stravaActivities.map(
  (activity: StravaActivity, index: number) =>
    ({
      id: index + 1,
      date: activity.start_date_local,
      type: activity.type,
      distance: activity.distance,
      time: activity.moving_time,
    } as Activity)
);

const customPagination = {
  pageIndex: 1,
  pageSize: 5,
};

const botLeftMessage = "Last 30 Activities";

export function OffKeyboardCard2() {
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
        <DataTable
          columns={columns}
          data={data}
          customPagination={customPagination}
          botLeftMessage={botLeftMessage}
        />
      </CardContent>
    </Card>
  );
}
