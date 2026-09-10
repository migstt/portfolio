import { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { fetchGitHubRepos } from "@/lib/github";
import { ProcessedRepo } from "@/app/types";
import { SocialLinks } from "@/components/general/SocialLinks";

export const metadata: Metadata = createPageMetadata.projectListing();

const FEATURED = [
  "portfolio",
  "shell-scripts",
  "strava-webhook",
  "github-actions-workflows",
  "boardgameplay",
  "tech-feed",
];

const githubHref =
  SocialLinks.find((link) => link.name === "GitHub")?.href ||
  "https://github.com/migstt";

export default async function ProjectsPage() {
  let repos: Array<ProcessedRepo>;

  try {
    repos = await fetchGitHubRepos();
  } catch (error) {
    console.error("Failed to fetch repositories:", error);
    repos = [];
  }

  const featured = FEATURED.map((name) =>
    repos.find((repo) => repo.name === name)
  ).filter((repo): repo is ProcessedRepo => Boolean(repo));

  const rest = repos.filter((repo) => !FEATURED.includes(repo.name));

  if (repos.length === 0) {
    return (
      <SubpageLayout pageTitle="Projects">
        <div className="text-center py-16 animate-slide-up-1">
          <p className="font-sans text-muted-foreground">
            Could not load repositories from GitHub right now.
          </p>
          <a
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-primary underline underline-offset-4 hover:opacity-75 transition-opacity"
          >
            Browse them on GitHub instead
          </a>
        </div>
      </SubpageLayout>
    );
  }

  return (
    <SubpageLayout pageTitle="Projects">
      <div className="flex flex-col gap-10 animate-slide-up-1">
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
            Featured
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {featured.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>

        {rest.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">
              Everything else
            </h2>
            <ul className="divide-y divide-border border-t border-b border-border">
              {rest.map((repo) => (
                <li key={repo.id}>
                  <Link
                    href={`/projects/${repo.name}/`}
                    className="flex items-baseline justify-between gap-4 py-2.5 group"
                  >
                    <span className="text-sm group-hover:text-primary transition-colors">
                      {repo.displayName}
                    </span>
                    <span className="font-sans text-xs text-muted-foreground truncate hidden sm:block flex-1 text-right">
                      {repo.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </SubpageLayout>
  );
}
