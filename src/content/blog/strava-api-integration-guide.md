---
title: "How to Fetch Your Strava Activities Using the Strava API"
date: "2026-01-25"
description: "A simple guide to integrate the Strava API and fetch your activities using OAuth2 authentication."
image: "/images/blog/strava-api-integration-guide.jpg"
---

## Prerequisites

You should have:

- A **Strava account** with some recorded activities
- Basic knowledge of **JavaScript/TypeScript**
- A project where you want to display your activities

## 1. Create a Strava API Application

1. Go to [Strava API Settings](https://www.strava.com/settings/api)
2. Click **Create an App**
3. Fill in the details:
   - **Application Name:** Your app name
   - **Category:** Choose what fits
   - **Website:** Your website URL
   - **Authorization Callback Domain:** `localhost` for development
4. After creation, note down your **Client ID** and **Client Secret**

## 2. Get Your Refresh Token

Strava uses OAuth2. You need a refresh token to get access tokens.

### Step 1: Authorize Your App

Open this URL in your browser (replace `YOUR_CLIENT_ID`):

```
https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost&scope=read,activity:read
```

### Step 2: Get the Authorization Code

After authorizing, you'll be redirected to:

```
http://localhost/?code=AUTHORIZATION_CODE&scope=read,activity:read
```

Copy the `code` value from the URL.

### Step 3: Exchange for Tokens

Make a POST request to get your tokens:

```bash
curl -X POST https://www.strava.com/oauth/token \
  -d client_id=YOUR_CLIENT_ID \
  -d client_secret=YOUR_CLIENT_SECRET \
  -d code=AUTHORIZATION_CODE \
  -d grant_type=authorization_code
```

Response:

```json
{
  "access_token": "abc123...",
  "refresh_token": "def456...",
  "expires_at": 1234567890
}
```

Save the `refresh_token`. You'll use this to get new access tokens.

## 3. Set Up Environment Variables

Create a `.env` file:

```env
STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
STRAVA_REFRESH_TOKEN=your_refresh_token
```

## 4. Refresh the Access Token

Access tokens expire. Use the refresh token to get a new one:

```typescript
async function refreshStravaToken() {
  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const tokens = await response.json();
  return tokens.access_token;
}
```

## 5. Fetch Your Activities

With a valid access token, fetch your activities:

```typescript
async function fetchStravaActivities(limit = 10) {
  const accessToken = await refreshStravaToken();

  const response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=${limit}&page=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const activities = await response.json();
  return activities;
}
```

## 6. Activity Data Structure

Each activity includes useful fields:

```typescript
interface StravaActivity {
  id: number;
  name: string;
  type: string; // "Run", "Ride", "Swim", etc.
  distance: number; // in meters
  moving_time: number; // in seconds
  start_date_local: string;
  average_speed: number;
  total_elevation_gain: number;
}
```

## 7. Display the Data

Process and display your activities:

```typescript
const activities = await fetchStravaActivities(10);

activities.forEach((activity) => {
  const distance = (activity.distance / 1000).toFixed(2); // km
  const minutes = Math.floor(activity.moving_time / 60);

  console.log(`${activity.type}: ${distance}km in ${minutes} mins`);
});
```

## Tips

- **Rate Limits:** 200 requests per 15 minutes (2,000 daily) for overall, 100 requests per 15 minutes (1,000 daily) for read operations
- **Scopes:** Use `activity:read_all` if you want private activities
- **Caching:** Cache the access token until it expires to reduce API calls
- **Static Sites:** Fetch at build time if you don't need real-time data

## Resources

- [Strava API Documentation](https://developers.strava.com/docs/reference/)
- [Strava Authentication Guide](https://developers.strava.com/docs/authentication/)
