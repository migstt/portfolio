---
title: "Auto-Deploy to Vercel When a New Strava Activity Is Logged"
date: "2026-02-22"
description: "Use a Cloudflare Worker to listen for Strava webhook events and trigger a Vercel deployment whenever you log a new activity."
image: "/images/blog/strava-webhook-vercel-auto-deploy.jpg"
---

> **Update (July 2026) — this pipeline now requires a paid Strava subscription.**
>
> Strava has moved API access behind its subscription. If the account that owns the API application isn't subscribed, the app goes `Inactive` and the whole `/api/v3/*` surface returns `403`:
>
> ```json
> { "message": "Forbidden", "errors": [{ "resource": "Application", "field": "Status", "code": "Inactive" }] }
> ```
>
> That affects this setup in two places: the `push_subscriptions` calls in Steps 6–7 (registering the webhook), and the build-time activity fetch that the rebuild exists to refresh. The Cloudflare Worker itself is unaffected — it's just an HTTP relay — so if you already have a working subscription, existing webhook deliveries and the worker keep functioning. It's registering or re-registering that needs an active app.
>
> Worth noting the failure mode is quiet: a deploy still gets triggered, the build still succeeds, and the site just rebuilds with no new Strava data. See the **Notes** section for how to catch that.

## The Problem

My portfolio site fetches Strava activities at build time. The data is baked into the static export, so the site needs to rebuild whenever I log a new activity. I used to run a daily cron job with GitHub Actions, but that's unnecessary overhead for something that should be event-driven.

The goal: **log a Strava activity → site rebuilds automatically**.

## How It Works

```
New Strava Activity → Strava Webhook → Cloudflare Worker → Vercel Deploy Hook → Site Rebuilds
```

Strava sends a webhook event when you log an activity. A Cloudflare Worker receives it and triggers a Vercel deploy hook to rebuild the site.

### Why Not Connect Strava Directly to Vercel?

Vercel deploy hooks are simple POST endpoints — you hit the URL and it triggers a build. But Strava webhooks require your callback to:

1. Respond to a **GET request** with a challenge string during subscription setup
2. Accept **POST requests** with event data and respond with `200 OK`

A Vercel deploy hook can't do either of those. You need something in between. A Cloudflare Worker is the simplest option — it's free, lightweight, and takes minutes to set up.

## Prerequisites

You should have:

- A **Vercel project** with your site deployed
- A **Cloudflare account** (free tier works)
- A **Strava API application** ([create one here](https://www.strava.com/settings/api)) in **Active** status — as of 2026 this requires an active Strava subscription on the owning account
- **Wrangler CLI** available (`npx wrangler --version` to check)

## 1. Create a Vercel Deploy Hook

1. Go to **Vercel Dashboard → your project → Settings → Git → Deploy Hooks**
2. Name: `strava`, Branch: `main`
3. Click **Create Hook**
4. Copy the URL — it looks like `https://api.vercel.com/v1/integrations/deploy/prj_xxxx/xxxx`

## 2. Create the Cloudflare Worker

Create a new project with three files:

```
strava-webhook/
├── src/
│   └── index.js
├── wrangler.jsonc
└── package.json
```

`package.json`:

```json
{
  "name": "strava-webhook",
  "version": "1.0.0",
  "private": true
}
```

`wrangler.jsonc`:

```json
{
  "name": "strava-webhook",
  "main": "src/index.js",
  "compatibility_date": "2026-02-22"
}
```

`src/index.js`:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Strava subscription validation (GET)
    if (request.method === "GET") {
      const challenge = url.searchParams.get("hub.challenge");
      const verifyToken = url.searchParams.get("hub.verify_token");

      if (verifyToken === env.STRAVA_VERIFY_TOKEN) {
        return new Response(JSON.stringify({ "hub.challenge": challenge }), {
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response("Forbidden", { status: 403 });
    }

    // Strava event notification (POST)
    if (request.method === "POST") {
      const event = await request.json();

      if (event.object_type === "activity" && event.aspect_type === "create") {
        await fetch(env.VERCEL_DEPLOY_HOOK, { method: "POST" });
        return new Response("Deploy triggered", { status: 200 });
      }

      return new Response("Ignored", { status: 200 });
    }

    return new Response("Method not allowed", { status: 405 });
  },
};
```

The worker handles two things:

- **GET** — Strava sends this once during subscription setup. The worker echoes back the `hub.challenge` string to prove the callback URL is valid.
- **POST** — Strava sends this whenever an event occurs. The worker checks if it's a new activity (`object_type: "activity"` and `aspect_type: "create"`) and triggers the Vercel deploy hook. All other events (updates, deletes, athlete changes) are ignored.

## 3. Deploy the Worker

You need a [Cloudflare API token](https://dash.cloudflare.com/profile/api-tokens). Use the **Edit Cloudflare Workers** template when creating one.

```bash
CLOUDFLARE_API_TOKEN=your_token npx wrangler deploy
```

You'll get a URL like `https://strava-webhook.your-subdomain.workers.dev`.

## 4. Set Worker Secrets

```bash
CLOUDFLARE_API_TOKEN=your_token npx wrangler secret put STRAVA_VERIFY_TOKEN
CLOUDFLARE_API_TOKEN=your_token npx wrangler secret put VERCEL_DEPLOY_HOOK
```

| Secret | What to enter |
|--------|---------------|
| `STRAVA_VERIFY_TOKEN` | Any string you choose (e.g., `my-strava-webhook-2026`) |
| `VERCEL_DEPLOY_HOOK` | The deploy hook URL from Step 1 |

## 5. Test the Worker

Before registering with Strava, verify the worker responds correctly:

```bash
curl -s "https://strava-webhook.your-subdomain.workers.dev?hub.verify_token=my-strava-webhook-2026&hub.challenge=test123&hub.mode=subscribe"
```

Expected response:

```json
{"hub.challenge":"test123"}
```

## 6. Register the Strava Webhook

You need your Strava app's **Client ID** and **Client Secret** from [Strava API Settings](https://www.strava.com/settings/api).

```bash
curl -X POST https://www.strava.com/api/v3/push_subscriptions \
  -F client_id=YOUR_CLIENT_ID \
  -F client_secret=YOUR_CLIENT_SECRET \
  -F callback_url=https://strava-webhook.your-subdomain.workers.dev \
  -F verify_token=my-strava-webhook-2026
```

Strava will send a validation GET to your worker. If it passes, you get back a subscription ID:

```json
{
  "id": 331525
}
```

## 7. Verify the Subscription

Check that your subscription is active:

```bash
curl -G https://www.strava.com/api/v3/push_subscriptions \
  -d client_id=YOUR_CLIENT_ID \
  -d client_secret=YOUR_CLIENT_SECRET
```

To delete a subscription:

```bash
curl -X DELETE "https://www.strava.com/api/v3/push_subscriptions/SUBSCRIPTION_ID?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET"
```

## Notes

- Strava allows **one webhook subscription per API application**
- Only new activity events trigger a deploy — updates, deletes, and athlete events are ignored
- Strava retries failed webhook deliveries up to 3 times
- Cloudflare Workers free tier allows 100,000 requests per day — more than enough
- The Vercel deploy hook URL should be kept secret since anyone with it can trigger a build
- **Make the build fail loudly if the fetch dies.** Because the rebuild is triggered by a webhook rather than by you, a `403` from Strava produces a green deploy with stale data and nothing in your inbox. If your fetch helpers swallow errors and return an empty array, the site will quietly render "No activities found" indefinitely. Either let the build fail on an API error, or fall back to a committed snapshot so the page still shows real data
- If you stop subscribing, delete the push subscription (Step 7) rather than leaving it registered — otherwise Strava keeps attempting deliveries against an app that can no longer serve the data those deploys are fetching

## Resources

- [Strava Webhook Events API](https://developers.strava.com/docs/webhooks/)
- [Vercel Deploy Hooks](https://vercel.com/docs/deployments/deploy-hooks)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
