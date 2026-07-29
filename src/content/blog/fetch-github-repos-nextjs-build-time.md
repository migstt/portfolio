---
title: "Fetching GitHub Repos and READMEs at Build Time in Next.js"
date: "2026-07-29"
description: "Pull your public repositories and their READMEs from the GitHub API during a static build — rate limits, the raw-README trick, and keeping your token server-side."
image: "/images/blog/fetch-github-repos-nextjs-build-time.jpg"
---

My portfolio lists my projects. Maintaining that list by hand meant it was wrong within a month — a renamed repo, a new one I forgot to add, a description I'd only updated on GitHub.

So the site fetches it from the GitHub API at build time instead. The data gets baked into the static output, which means no API calls from the browser, no token shipped to the client, and no loading spinner.

## Do You Even Need a Token?

For public repository data: **no**. This works unauthenticated:

```bash
curl https://api.github.com/users/migstt/repos
```

But you almost certainly want one anyway, and the reason is rate limits:

| | Limit |
|---|---|
| Unauthenticated | **60 requests/hour**, per IP |
| Authenticated | **5,000 requests/hour**, per token |

That "per IP" is the part that bites. On Vercel, GitHub Actions, or any hosted CI, your build shares an outbound IP with strangers. You aren't rationing 60 requests — you're sharing them with everyone else building on that runner. I've seen builds fail on the first API call with nothing changed on my end.

An authenticated token gets its own bucket, so your limit is actually yours.

**Use a minimal token.** For reading public repos you need *no scopes at all* — a fine-grained token with read-only access to public repositories, or a classic token with every checkbox unticked. Do not reach for a broad PAT out of convenience; if it leaks, the blast radius is whatever you granted it.

## 1. Environment Variable

```env
GITHUB_TOKEN=your_token_here
```

The name matters here. In Next.js, only variables prefixed `NEXT_PUBLIC_` are inlined into the client bundle. `GITHUB_TOKEN` has no prefix, so it stays server-side — available during the build and in server components, absent from anything the browser downloads.

Name it `NEXT_PUBLIC_GITHUB_TOKEN` and you will ship your token to every visitor. That is the whole difference.

## 2. Fetching the Repo List

```typescript
const USERNAME = "migstt";

export async function fetchGitHubRepos(): Promise<ProcessedRepo[]> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN must be set");
  }

  const url = `https://api.github.com/users/${USERNAME}/repos?type=public&sort=updated&per_page=100`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": USERNAME,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`GitHub API error: ${response.status} - ${errorText}`);
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const repos: GitHubRepo[] = await response.json();
  return repos.map(processRepo);
}
```

Three details in those headers:

- **`User-Agent`** — GitHub's API expects one and can reject requests that arrive without it. Server-side `fetch` doesn't always set a useful default, so send it explicitly.
- **`X-GitHub-Api-Version`** — pins the API version. Without it you're implicitly on whatever's current, and breaking changes arrive on GitHub's schedule rather than yours.
- **`Authorization: Bearer`** — `token` also works, but `Bearer` is what GitHub documents now.

And on the query string: `per_page=100` is the **maximum**. If you cross 100 repos this silently truncates — you don't get an error, you get an incomplete list. Past that you need to follow the `Link` header for pagination.

## 3. Reshaping the Response

The repo object GitHub returns has well over 100 fields. Almost none of them are useful to a portfolio card, and passing the whole thing into a component means the shape of your UI is coupled to GitHub's payload.

```typescript
export function processRepo(repo: GitHubRepo): ProcessedRepo {
  return {
    id: repo.id,
    name: repo.name,
    displayName: formatRepoName(repo.name),
    description: repo.description || "No description available",
    url: repo.html_url,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    createdAt: repo.created_at,
  };
}
```

`description` is `null` for repos where you never set one, so it needs a fallback — otherwise `null` renders as nothing and the card collapses.

`formatRepoName` turns slugs into something readable:

```typescript
export function formatRepoName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
```

`shell-scripts` becomes `Shell Scripts`.

## 4. Featured Repos, In Your Order

I don't want every repo on the landing page, and I don't want GitHub deciding the order. So I keep a curated list of names and look them up:

```typescript
export async function getFeaturedRepos(
  repoNames: string[]
): Promise<ProcessedRepo[]> {
  const allRepos = await fetchGitHubRepos();

  return repoNames
    .map((name) =>
      allRepos.find((repo) => repo.name.toLowerCase() === name.toLowerCase())
    )
    .filter((repo): repo is ProcessedRepo => repo !== undefined);
}
```

The direction of the iteration is the point. Mapping over `repoNames` — not over `allRepos` — means the output follows **my** ordering, so the array in my config file is the display order. Filtering `allRepos` instead would hand ordering back to GitHub's `sort=updated`.

The `filter` predicate is a type guard, which is what narrows `(ProcessedRepo | undefined)[]` down to `ProcessedRepo[]`. A plain `.filter(Boolean)` doesn't narrow the type, and you'd be fighting TypeScript downstream.

A renamed or deleted repo silently drops out of the list rather than breaking the build. Whether that's right depends on you — log a warning if you'd rather notice.

## 5. Pulling the README

This is the part with a genuinely useful trick. By default, GitHub's README endpoint returns JSON with the content **base64-encoded**:

```json
{
  "name": "README.md",
  "encoding": "base64",
  "content": "IyBTaGVsbCBTY3JpcHRzCgpBIGNvbGxlY3Rpb24..."
}
```

Which you'd then have to decode. But one header skips all of that:

```typescript
const readmeResponse = await fetch(
  `https://api.github.com/repos/${USERNAME}/${repoName}/readme`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": USERNAME,
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github.raw",
    },
  }
);

if (readmeResponse.ok) {
  const readmeText = await readmeResponse.text();
  const processedReadme = await processMarkdown(readmeText);
  // ...
}
```

`Accept: application/vnd.github.raw` returns the file as plain text. No JSON wrapper, no base64 decode — the markdown goes straight into whatever renderer you already have.

There's also `application/vnd.github.html`, which returns GitHub's own rendered HTML. Convenient, but you inherit their markup and classes; raw markdown through your own pipeline keeps the styling yours.

### Missing READMEs Aren't Errors

A repo without a README returns `404`. That's a normal state, not a failure:

```typescript
let readme = "";
let hasReadme = false;

try {
  const readmeResponse = await fetch(/* ... */);

  if (readmeResponse.ok) {
    readme = (await processMarkdown(await readmeResponse.text())).toString();
    hasReadme = true;
  } else {
    console.log(`No README for ${repoName} (${readmeResponse.status})`);
  }
} catch (readmeError) {
  console.log(`Error fetching README for ${repoName}:`, readmeError);
}
```

The README fetch sits in its own `try` block, nested inside the repo fetch. A missing README degrades to `hasReadme: false` and the page still renders everything else; only a failed *repo* fetch is worth propagating.

Same idea one level up — a missing repo is a `null`, not a throw:

```typescript
if (!repoResponse.ok) {
  if (repoResponse.status === 404) {
    return null;
  }
  throw new Error(`GitHub API error: ${repoResponse.status}`);
}
```

`404` means "you asked for something that isn't there." `500` means GitHub is broken. Conflating them turns a typo into a build failure that reads like an outage.

## 6. Language Colors

GitHub gives you `language` as a bare string. The colored dot next to it is theirs, so if you want it you map it yourself:

```typescript
export const languageColors: Record<string, string> = {
  JavaScript: "#b7920a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  Shell: "#3d802c",
  PHP: "#4F5D95",
  // ...
};
```

`language` is `null` for empty repos and ones GitHub can't classify, so handle the miss:

```tsx
<span style={{ backgroundColor: languageColors[repo.language ?? ""] ?? "#8b8b8b" }} />
```

## Rate Limits in Practice

Check where you stand — this endpoint doesn't count against your own limit:

```bash
curl -H "Authorization: Bearer $GITHUB_TOKEN" https://api.github.com/rate_limit
```

```json
{
  "resources": {
    "core": {
      "limit": 5000,
      "remaining": 4998,
      "reset": 1753800000
    }
  }
}
```

A build like mine makes one call for the repo list plus one or two per featured repo — a handful total, nowhere near the ceiling. It's worth knowing the command anyway, because `403` from the GitHub API is ambiguous: it's returned both for rate limiting and for permissions. `remaining: 0` tells you which one you're looking at in one request.

## Tips

- **Rebuild on a schedule or a webhook.** Build-time data is frozen at build time. A repo you push today won't appear until the site rebuilds — a cron or a `repository_dispatch` from a GitHub Action handles it.
- **Don't fetch this from the client.** It would mean shipping a token to the browser. Build-time or a server route, never a client component.
- **Watch the 100-repo ceiling.** `per_page=100` is the max and it truncates quietly.
- **`sort=updated` is not `pushed`.** `updated` moves on metadata changes too — description edits, stars, settings. If you want "recently worked on", use `sort=pushed`.
- **Fork noise.** `/users/{user}/repos` includes forks. Filter on `repo.fork` if you'd rather only show your own work.

## Resources

- [GitHub REST API — Repositories](https://docs.github.com/en/rest/repos/repos)
- [GitHub REST API — README](https://docs.github.com/en/rest/repos/contents#get-a-repository-readme)
- [Rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- [Next.js environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
