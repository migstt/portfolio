export interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  type: string;
  sport_type: string;
  start_date: string;
  start_date_local: string;
  average_speed: number;
  max_speed: number;
  total_elevation_gain: number;
  kudos_count: number;
  achievement_count: number;
}

export type ProcessedActivity = {
  id: number;
  activityId: number;
  start_date_local: string;
  type: string;
  distance: number;
  moving_time: number;
};

export type StravaTokens = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
};

export interface StravaSportTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
  achievement_count?: number;
}

// Strava returns "" when a sport has no activity in a window
export type StravaSportField = StravaSportTotals | "";

export interface StravaAthleteStats {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_run_totals: StravaSportField;
  recent_ride_totals: StravaSportField;
  recent_swim_totals: StravaSportField;
  ytd_run_totals: StravaSportField;
  ytd_ride_totals: StravaSportField;
  ytd_swim_totals: StravaSportField;
  all_run_totals: StravaSportField;
  all_ride_totals: StravaSportField;
  all_swim_totals: StravaSportField;
}

export function isSportTotals(
  field: StravaSportField
): field is StravaSportTotals {
  return typeof field === "object" && field !== null;
}
