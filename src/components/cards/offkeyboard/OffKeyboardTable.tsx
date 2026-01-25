import { fetchStravaActivities } from "@/lib/strava";
import { ProcessedActivity } from "@/app/types";
import { StravaDataTable } from "@/components/cards/offkeyboard/StravaDataTable";

export async function OffKeyboardTable() {
  let data: ProcessedActivity[] = [];
  let error: string | null = null;

  try {
    const activities = await fetchStravaActivities(60);
    
    data = activities.map((activity, index) => ({
      ...activity,
      id: index + 1,
    }));
  } catch (e) {
    console.error("Failed to load Strava activities", e);
    error = "Failed to load Strava activities. Please try again later.";
  }

  if (error) {
    return (
      <div className="p-4 text-center text-sm text-red-500">
        {error}
      </div>
    );
  }

  if (!data.length) {
    return <div className="p-4 text-center text-sm">No activities found.</div>;
  }

  return <StravaDataTable data={data} />;
}