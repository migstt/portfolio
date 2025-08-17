// app/projects/page.tsx
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { LanguageBadge } from "@/components/general/LanguageBadge";
import { fetchGitHubRepos } from "@/lib/github";
import { ProcessedRepo } from "@/lib/github";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function ProjectsPage() {
  let repos: Array<ProcessedRepo>;

  try {
    repos = await fetchGitHubRepos();
  } catch (error) {
    console.error("Failed to fetch repositories:", error);
    repos = [];
  }

  return (
    <SubpageLayout>
      {repos.length === 0 ? (
        <div className="text-center py-12 animate-slide-up-1 pt-[-4]">
          <p className="text-muted-foreground">No repositories found.</p>
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 animate-slide-up-1 pt-[-4]">
          {repos.map((repo) => (
            <Link
              key={repo.id}
              href={`/projects/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="p-4 hover:border-muted h-full flex flex-col">
                <CardHeader className="p-0 flex flex-row items-start justify-start gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">
                      {repo.displayName}
                    </CardTitle>
                    <CardDescription>
                      <span className="text-xs text-muted-foreground">
                        Updated{" "}
                        {formatDistanceToNow(new Date(repo.updatedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </CardDescription>
                  </div>
                  <LanguageBadge language={repo.language} />
                </CardHeader>

                {repo.description && (
                  <CardContent className="p-0">
                    <p className="text-sm/5 text-muted-foreground">
                      {repo.description}
                    </p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </SubpageLayout>
  );
}
