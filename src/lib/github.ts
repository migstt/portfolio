import { processMarkdown } from "@/lib/blog";
import { GitHubRepo, ProcessedRepo, DetailedRepo } from "@/app/types";

const USERNAME = "migstt";

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
    createdAt: repo.created_at,
  };
}

export async function fetchGitHubRepos(): Promise<ProcessedRepo[]> {
  if (process.env.MOCK_API === "true") {
    console.log("MOCK_API enabled, skipping GitHub fetch");
    return [];
  }

  const token = process.env.GITHUB_TOKEN;
  console.log(`Fetching repos for user: ${USERNAME}`);
  console.log(`Token available: ${token ? "Yes" : "No"}`);

  if (!token || !USERNAME) {
    const error =
      "GitHub token and username must be provided in environment variables";
    console.error(`${error}`);
    throw new Error(error);
  }

  try {
    const url = `https://api.github.com/users/${USERNAME}/repos?type=public&sort=updated&per_page=100`;
    console.log(`Fetching: ${url}`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": USERNAME
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

export async function getRepositoryWithReadme(
  repoName: string
): Promise<DetailedRepo | null> {
  if (process.env.MOCK_API === "true") {
    console.log("MOCK_API enabled, skipping GitHub README fetch");
    return null;
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token || !USERNAME) {
    throw new Error(
      "GitHub token and username must be provided in environment variables"
    );
  }

  try {
    const repoResponse = await fetch(
      `https://api.github.com/repos/${USERNAME}/${repoName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": USERNAME,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!repoResponse.ok) {
      if (repoResponse.status === 404) {
        console.log(`Repository ${repoName} not found`);
        return null;
      }
      throw new Error(`GitHub API error: ${repoResponse.status}`);
    }

    const repoData: GitHubRepo = await repoResponse.json();
    const processedRepo = processRepo(repoData);

    let readme = "";
    let readmeRaw = "";
    let hasReadme = false;

    try {
      console.log(`Fetching README for ${repoName}...`);
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
        readmeRaw = readmeText;
        const processedReadme = await processMarkdown(readmeText);
        readme = processedReadme.toString();
        hasReadme = true;
        console.log(
          `README found for ${repoName} (${readme.length} characters)`
        );
      } else {
        console.log(
          `No README found for ${repoName} (${readmeResponse.status})`
        );
      }
    } catch (readmeError) {
      console.log(`Error fetching README for ${repoName}:`, readmeError);
    }

    return {
      ...processedRepo,
      readme,
      readmeRaw,
      hasReadme,
    };
  } catch (error) {
    console.error(`Error fetching repository details for ${repoName}:`, error);
    throw error;
  }
}
