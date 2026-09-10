import { fetchStravaActivities } from "@/lib/strava";
import { ProcessedActivity } from "@/app/types";
import { NeuPreview } from "./NeuPreview";

const fallbackActivities: ProcessedActivity[] = [
  { id: 1, activityId: 1, start_date_local: "2026-07-27T06:12:00Z", type: "Run", distance: 5054, moving_time: 2633 },
  { id: 2, activityId: 2, start_date_local: "2026-07-24T06:05:00Z", type: "Run", distance: 8021, moving_time: 4102 },
  { id: 3, activityId: 3, start_date_local: "2026-07-21T17:40:00Z", type: "Walk", distance: 3210, moving_time: 2450 },
  { id: 4, activityId: 4, start_date_local: "2026-07-19T06:20:00Z", type: "Run", distance: 10480, moving_time: 5330 },
  { id: 5, activityId: 5, start_date_local: "2026-07-16T06:00:00Z", type: "Run", distance: 6002, moving_time: 3120 },
  { id: 6, activityId: 6, start_date_local: "2026-07-13T16:30:00Z", type: "Ride", distance: 18400, moving_time: 3900 },
  { id: 7, activityId: 7, start_date_local: "2026-07-11T06:15:00Z", type: "Run", distance: 4980, moving_time: 2590 },
];

export default async function ThemeNeuPage() {
  let activities: ProcessedActivity[] = [];
  let isLiveData = false;

  try {
    activities = await fetchStravaActivities(60);
    isLiveData = activities.length > 0;
  } catch {
    isLiveData = false;
  }

  if (activities.length === 0) {
    activities = fallbackActivities;
  }

  return <NeuPreview activities={activities} isLiveData={isLiveData} />;
}
