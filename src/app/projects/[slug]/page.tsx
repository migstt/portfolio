import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchGitHubRepos, getRepositoryWithReadme } from "@/lib/github";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  GitFork,
  ExternalLink,
  Calendar,
  FileText,
} from "lucide-react";
import { LanguageBadge } from "@/components/general/LanguageBadge";
import { formatDistanceToNow } from "date-fns";
import Article from "@/components/general/Article";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const repos = await fetchGitHubRepos();
    return repos.map((repo) => ({ slug: repo.name }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const repo = await getRepositoryWithReadme(slug);

    if (!repo) {
      return {
        title: "Project Not Found | Miguel Franco Trinidad",
        description: "The requested project could not be found.",
      };
    }

    return {
      title: `${repo.displayName} | Miguel Franco Trinidad`,
      description: repo.description,
      openGraph: {
        title: `${repo.displayName} | Miguel Franco Trinidad`,
        description: repo.description,
        type: "article",
      },
    };
  } catch (error) {
    return {
      title: "Project Not Found | Miguel Franco Trinidad",
      description: "The requested project could not be found.",
    };
  }
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;

  let repo;
  try {
    repo = await getRepositoryWithReadme(slug);
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    notFound();
  }

  if (!repo) {
    notFound();
  }

  const allRepos = await fetchGitHubRepos();
  const index = allRepos.findIndex((p) => p.name === slug);
  const prevProject = index < allRepos.length - 1 ? allRepos[index + 1] : null;
  const nextProject = index > 0 ? allRepos[index - 1] : null;

  return (
    <SubpageLayout pageTitle={repo.displayName}>
      <div className="animate-slide-up-1 w-full">
        <div className="w-full max-w-none">
          <header>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold leading-tight text-foreground">
                {repo.displayName}
              </h1>
              <Button asChild size="sm" className="flex-shrink-0">
                <Link
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">View on GitHub</span>
                  <span className="sm:hidden">GitHub</span>
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              {repo.language && <LanguageBadge language={repo.language} />}
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>{repo.stars} stars</span>
              </div>
              <div className="flex items-center gap-2">
                <GitFork className="h-4 w-4" />
                <span>{repo.forks} forks</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Updated{" "}
                  {formatDistanceToNow(new Date(repo.updatedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </header>

          {repo.hasReadme ? (
            <Article
              post={{
                contentHtml: repo.readme,
              }}
            />
          ) : (
            <div className="border rounded-lg p-8 bg-muted/50 text-center">
              <FileText className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold mb-2">
                No README available
              </h3>
              <p className="text-muted-foreground text-xs">
                This repository does not have a README file yet.
              </p>
            </div>
          )}

          {(prevProject || nextProject) && (
            <nav className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-row justify-between items-center gap-4">
                {prevProject ? (
                  <Link
                    href={`/projects/${prevProject.name}`}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 flex-1 max-w-[45%] py-2"
                  >
                    <ChevronLeft className="h-4 w-4 flex-shrink-0 group-hover:-translate-x-0.5 transition-transform duration-200" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors lg:hidden">
                        Previous Project
                      </p>
                      <div className="hidden lg:block">
                        <p className="text-xs uppercase tracking-wide font-medium">
                          Previous
                        </p>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                          {prevProject.displayName}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1 max-w-[45%]"></div>
                )}

                {nextProject ? (
                  <Link
                    href={`/projects/${nextProject.name}`}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 flex-1 max-w-[45%] py-2 justify-end"
                  >
                    <div className="min-w-0 flex-1 text-right order-1">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors lg:hidden">
                        Next Project
                      </p>
                      <div className="hidden lg:block">
                        <p className="text-xs uppercase tracking-wide font-medium">
                          Next
                        </p>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                          {nextProject.displayName}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200 order-2" />
                  </Link>
                ) : (
                  <div className="flex-1 max-w-[45%]"></div>
                )}
              </div>
            </nav>
          )}
        </div>
      </div>
    </SubpageLayout>
  );
}
