import { StravaActivity, ProcessedActivity, StravaTokens } from "@/app/types";

// refreshes the strava access token using the refresh token
async function refreshStravaToken(): Promise<StravaTokens> {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("missing strava credentials in environment variables");
  }

  console.log("refreshing strava access token...");

  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `strava token refresh error: ${response.status} - ${errorText}`
    );
    throw new Error(`failed to refresh strava token: ${response.status}`);
  }

  const tokens: StravaTokens = await response.json();
  console.log("strava token refreshed successfully");
  console.log(
    `new token expires at: ${new Date(tokens.expires_at * 1000).toISOString()}`
  );

  return tokens;
}

async function getValidAccessToken(): Promise<string> {
  const tokens = await refreshStravaToken();
  return tokens.access_token;
}

export async function fetchStravaActivities(
  limit: number = 30
): Promise<ProcessedActivity[]> {
  if (process.env.MOCK_API === "true") {
    console.log("MOCK_API enabled, skipping Strava fetch");
    return [];
  }

  console.log(`fetching last ${limit} strava activities...`);

  try {
    const accessToken = await getValidAccessToken();

    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=${limit}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`strava API error: ${response.status} - ${errorText}`);
      throw new Error(`strava API error: ${response.status}`);
    }

    const activities: StravaActivity[] = await response.json();
    console.log(`fetched ${activities.length} activities from strava`);

    const processedActivities: ProcessedActivity[] = activities.map(
      (activity) => ({
        id: activity.id,
        activityId: activity.id,
        start_date_local: activity.start_date_local,
        type: activity.type,
        distance: activity.distance,
        moving_time: activity.moving_time,
      })
    );

    console.log(`processed ${processedActivities.length} strava activities`);
    return processedActivities;
  } catch (error) {
    console.error("error fetching Ssrava activities:", error);
    throw error;
  }
}

export async function getFeaturedStravaActivities(): Promise<
  ProcessedActivity[]
> {
  const activities = await fetchStravaActivities(10);
  return activities;
}
