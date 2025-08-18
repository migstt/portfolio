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
