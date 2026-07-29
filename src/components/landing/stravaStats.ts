import { StravaAthleteStats } from "@/app/types";

/*
 * Formatters and mock fixture for the Strava strip. Extracted so the section
 * component stays presentational — 60 of its 132 lines were this data.
 */

export function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h >= 100) return `${h}h`;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatDistance(meters: number) {
  const km = meters / 1000;
  return `${km.toLocaleString("en-US", { maximumFractionDigits: 0 })} km`;
}

/** Used when MOCK_API is enabled, so the section renders without a live API. */
export const mockStravaStats: StravaAthleteStats = {
  biggest_ride_distance: 80000,
  biggest_climb_elevation_gain: 1200,
  recent_run_totals: {
    count: 12,
    distance: 92500,
    moving_time: 28800,
    elapsed_time: 30000,
    elevation_gain: 320,
  },
  recent_ride_totals: "",
  recent_swim_totals: "",
  ytd_run_totals: {
    count: 142,
    distance: 1247000,
    moving_time: 403200,
    elapsed_time: 410000,
    elevation_gain: 3800,
  },
  ytd_ride_totals: "",
  ytd_swim_totals: "",
  all_run_totals: {
    count: 412,
    distance: 3840000,
    moving_time: 1224000,
    elapsed_time: 1300000,
    elevation_gain: 11500,
  },
  all_ride_totals: "",
  all_swim_totals: "",
};
