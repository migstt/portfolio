import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Package } from "lucide-react";
import { SeemoreButton } from "@/components/general/SeemoreButton";
import { LanguageBadge } from "@/components/general/LanguageBadge";
import { getFeaturedRepos } from "@/lib/github";
import { ProcessedRepo } from "@/app/types";

const FEATURED_REPO_NAMES = ["portfolio", "tech-feed", "inventory-system"];

export async function Projects() {
  let featuredRepos: Array<ProcessedRepo>;
  try {
    featuredRepos = await getFeaturedRepos(FEATURED_REPO_NAMES);
  } catch (error) {
    console.error("Failed to fetch repositories:", error);
    featuredRepos = [];
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Projects
          </CardTitle>
          <Badge className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 text-xs font-bold">
            GitHub API
          </Badge>
        </div>
        <SeemoreButton href="projects" label="Projects" page="projects" />
      </CardHeader>
      <CardContent className="flex-1 mt-1">
        <div className="grid grid-cols-1 gap-2">
          {featuredRepos.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">No repositories found.</div>
          )}
          {featuredRepos.slice(0, 3).map((repo) => (
            <Link
              key={repo.id}
              href={`/projects/${repo.name}/`}
              className="block transition-transform transform hover:scale-[1.01] border rounded-lg p-2 h-full"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold">{repo.displayName}</h3>
                  <LanguageBadge language={repo.language} />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {repo.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
