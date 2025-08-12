import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Notebook, CircleArrowRight } from "lucide-react";
import { devLogEntries } from "@/data/portfolioData";

export function TechBlog() {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Notebook className="w-4 h-4" />
          Tech Blog
        </CardTitle>

        <Link
          href="/projects"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="See more projects"
        >
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium leading-none">See more</span>
            <CircleArrowRight
              className="w-4 h-4 stroke-[2] mt-[1px]"
              aria-hidden="true"
            />
          </div>
        </Link>
      </CardHeader>

      <CardContent className="flex-1 mt-1 space-y-4">
        {devLogEntries.map((entry) => (
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

              <div className="flex items-center text-xs text-muted-foreground">
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
