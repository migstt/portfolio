import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchGitHubRepos, getRepositoryWithReadme } from "@/lib/github";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { Star, GitFork, ExternalLink, Calendar, FileText } from "lucide-react";
import { LanguageBadge } from "@/components/general/LanguageBadge";
import { format } from "date-fns";
import Article from "@/components/general/Article";
import PaginationNav from "@/components/general/PaginationNav";
import TableOfContents from "@/components/general/TableOfContents";
import { extractHeadings } from "@/lib/blog";
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
      return createPageMetadata.notFound(`/projects/${slug}`);
    }

    return createPageMetadata.project({
      title: repo.displayName,
      description: repo.description,
      slug,
      createdAt: repo.createdAt,
      updatedAt: repo.updatedAt,
    });
  } catch (error) {
    console.error("Error", error);
    return createPageMetadata.notFound(`/projects/${slug}`);
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
                  Updated {format(new Date(repo.updatedAt), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </header>

          {repo.hasReadme ? (
            <div className="flex gap-8">
              <div className="flex-1 min-w-0">
                <Article
                  post={{
                    contentHtml: repo.readme,
                  }}
                  repoName={repo.name}
                  hideCodeLang
                />

                <PaginationNav
                  prevItem={prevProject}
                  nextItem={nextProject}
                  basePath="/projects"
                  itemType="Project"
                />
              </div>

              {repo.readmeRaw && extractHeadings(repo.readmeRaw).length > 0 && (
                <aside className="hidden lg:block w-72 flex-shrink-0 relative">
                  <div className="sticky top-6">
                    <TableOfContents headings={extractHeadings(repo.readmeRaw)} />
                  </div>
                </aside>
              )}
            </div>
          ) : (
            <>
              <div className="border rounded-lg p-8 bg-muted/50 text-center mb-12">
                <FileText className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold mb-2">
                  No README available
                </h3>
                <p className="text-muted-foreground text-xs">
                  This repository does not have a README file yet.
                </p>
              </div>

              <PaginationNav
                prevItem={prevProject}
                nextItem={nextProject}
                basePath="/projects"
                itemType="Project"
              />
            </>
          )}
        </div>
      </div>
    </SubpageLayout>
  );
}
