import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, SquareArrowUpRight } from "lucide-react";
import { Loader2 } from "lucide-react";

type Activity = {
  id: number;
  activityId: number;
  start_date_local: string;
  type: string;
  distance: number;
  moving_time: number;
};

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
        <span className="text-sm font-semibold">Km</span>
        <ArrowUpDown className="h-3 w-3 opacity-70 text-[#FC4C02] dark:text-[#FF7F50]" />
      </div>
    ),
    cell: ({ getValue }) => {
      const meters = getValue() as number;
      return (meters / 1000).toFixed(1);
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
  {
    id: "link",
    header: () => <div className="text-left text-sm font-semibold"></div>,
    cell: ({ row }) => {
      const activity = row.original;
      return (
        <a
          href={`https://www.strava.com/activities/${activity.activityId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-[#FC4C02] hover:text-[#e04402] transition-colors"
        >
          <SquareArrowUpRight className="w-4 h-4" />
        </a>
      );
    },
  },
];

const customPagination = {
  pageIndex: 0,
  pageSize: 5,
};

const Loader = () => (
  <div className="flex items-center justify-center h-full p-5 text-lg">
    <Loader2
      className="strava-spinner"
      size={24}
      aria-label="Loading spinner"
    />
  </div>
);

const botLeftMessage = "Last 30 Activities";

export function OffKeyboardTable() {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/stravaActivities.json")
      .then((res) => res.json())
      .then((activities) => {
        const mapped = activities.map((activity: Activity, index: number) => ({
          id: index + 1,
          activityId: activity.id,
          date: activity.start_date_local,
          type: activity.type,
          distance: activity.distance,
          time: activity.moving_time,
        }));
        setData(mapped);
      })
      .catch((e) => {
        console.error("Failed to load Strava activities", e);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!data.length) {
    return <div className="p-4 text-center text-sm">No activities found.</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      customPagination={customPagination}
      botLeftMessage={botLeftMessage}
    />
  );
}
