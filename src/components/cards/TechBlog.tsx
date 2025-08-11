import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Notebook, CircleArrowRight } from "lucide-react";
import { devLogEntries } from "@/data/portfolioData";

export function TechBlog() {
  return (
    <Card className="h-full flex flex-col bg-muted/30 border border-border">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Notebook className="w-4 h-4" />
          Tech Blog
        </CardTitle>

        <Link
          href="/blog"
          className="flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleArrowRight className="w-5 h-5 stroke-[2]" />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>See more</p>
            </TooltipContent>
          </Tooltip>
        </Link>
      </CardHeader>

      <CardContent className="flex-1 mt-1 space-y-4">
        {devLogEntries.slice(0, 3).map((entry) => (
          <a
            key={entry.title}
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group hover:transform hover:scale-[1.01]"
          >
            <div className="flex flex-col space-y-1">
              <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                {entry.title}
              </h3>

              <p className="text-xs text-muted-foreground line-clamp-2">
                {entry.description}
              </p>

              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>{entry.readTime}</span>
                <span className="mx-2">•</span>
                <span>{entry.date}</span>
              </div>
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
