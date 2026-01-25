"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/general/DataTable";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, SquareArrowUpRight } from "lucide-react";
import { ProcessedActivity } from "@/app/types";

const columns: ColumnDef<ProcessedActivity>[] = [
  {
    accessorKey: "start_date_local",
    header: () => <div className="text-left text-sm font-semibold">Date</div>,
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toLocaleDateString("en-US", {
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
    accessorKey: "moving_time",
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
          className="flex items-center justify-center text-[#FC4C02] hover:text-[#e04402] transition-colors text-xs"
        >
          View
          <SquareArrowUpRight className="w-4 h-4 ml-1" />
        </a>
      );
    },
  },
];

const customPagination = {
  pageIndex: 0,
  pageSize: 5,
};

const botLeftMessage = "Last 60 Activities";

interface StravaDataTableProps {
  data: ProcessedActivity[];
}

export function StravaDataTable({ data }: StravaDataTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      customPagination={customPagination}
      botLeftMessage={botLeftMessage}
    />
  );
}
