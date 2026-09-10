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
    return <div className="p-4 text-center text-sm text-muted-foreground">No activities found.</div>;
  }

  return (
    <>
      <p className="font-sans text-sm text-muted-foreground mb-3">{summarize(data)}</p>
      <StravaDataTable data={data} />
    </>
  );
}

function summarize(activities: ProcessedActivity[]) {
  const totalKm = activities.reduce((sum, a) => sum + a.distance, 0) / 1000;
  const runs = activities.filter((a) => a.type === "Run").length;
  const avgKm = totalKm / activities.length;

  const noun = activities.length === 1 ? "activity" : "activities";
  const runNote = runs === activities.length ? "all runs" : `${runs} of them runs`;

  return `Last ${activities.length} ${noun}: ${totalKm.toFixed(0)} km logged, ${runNote}, averaging ${avgKm.toFixed(1)} km a session.`;
}