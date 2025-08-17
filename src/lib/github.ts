export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface ProcessedRepo {
  id: number;
  name: string;
  displayName: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
}

export const languageColors: Record<string, string> = {
  JavaScript: "#b7920a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#239120",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#fa7343",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#1572B6",
  Vue: "#4FC08D",
  React: "#61DAFB",
  Angular: "#DD0031",
  Svelte: "#ff3e00",
  Shell: "#3d802c",
  PowerShell: "#012456",
  Dockerfile: "#384d54",
  YAML: "#cb171e",
  JSON: "#292929",
  Markdown: "#083fa1",
};

export function formatRepoName(name: string): string {
  const formatted = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  console.log(`Formatted "${name}" -> "${formatted}"`);
  return formatted;
}

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
  };
}

export async function fetchGitHubRepos(): Promise<ProcessedRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  console.log(`Fetching repos for user: ${username}`);
  console.log(`Token available: ${token ? "Yes" : "No"}`);

  if (!token || !username) {
    const error =
      "GitHub token and username must be provided in environment variables";
    console.error(`${error}`);
    throw new Error(error);
  }

  try {
    const url = `https://api.github.com/users/${username}/repos?type=public&sort=updated&per_page=100`;
    console.log(`Fetching: ${url}`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "migstt",
      },
    });

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GitHub API error: ${response.status} - ${errorText}`);
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    console.log(`Fetched ${repos.length} repositories`);

    const processedRepos = repos.map(processRepo);
    console.log(`Processed ${processedRepos.length} repositories`);

    return processedRepos;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    throw error;
  }
}

export async function getFeaturedRepos(
  repoNames: string[]
): Promise<ProcessedRepo[]> {
  console.log(`Looking for featured repos: ${repoNames.join(", ")}`);

  const allRepos = await fetchGitHubRepos();
  console.log(
    `Available repo names: ${allRepos.map((r) => r.name).join(", ")}`
  );

  const featuredRepos = repoNames
    .map((name) => {
      const found = allRepos.find(
        (repo) => repo.name.toLowerCase() === name.toLowerCase()
      );
      console.log(`Looking for "${name}": ${found ? "Found" : "Not found"}`);
      return found;
    })
    .filter((repo): repo is ProcessedRepo => repo !== undefined);

  console.log(
    `Featured repos found: ${featuredRepos.length}/${repoNames.length}`
  );
  return featuredRepos;
}
