import Link from "next/link";
import { format } from "date-fns";
import { ArrowUpRight, Github, Star, GitFork } from "lucide-react";
import { LanguageBadge } from "@/components/general/LanguageBadge";
import { ProcessedRepo } from "@/app/types";

export function ProjectCard({ repo }: { repo: ProcessedRepo }) {
  return (
    <div className="relative group rounded-lg border bg-card p-4 h-full flex flex-col gap-2 transition-colors hover:border-primary/50">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold leading-tight">
          <Link
            href={`/projects/${repo.name}/`}
            className="after:absolute after:inset-0 group-hover:text-primary transition-colors"
          >
            {repo.displayName}
          </Link>
        </h2>
        <LanguageBadge language={repo.language} />
      </div>

      <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
        {repo.description}
      </p>

      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span>Updated {format(new Date(repo.updatedAt), "MMM d, yyyy")}</span>
        {repo.stars > 0 && (
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {repo.stars}
          </span>
        )}
        {repo.forks > 0 && (
          <span className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            {repo.forks}
          </span>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-3 text-xs pt-1">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          Code
        </a>
        {repo.liveUrl && (
          <a
            href={repo.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Live
          </a>
        )}
      </div>
    </div>
  );
}
