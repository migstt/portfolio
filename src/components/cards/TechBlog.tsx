import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Notebook } from "lucide-react";
import { devLogEntries } from "@/data/portfolioData";
import { SeemoreButton } from "@/components/general/SeemoreButton";

export function TechBlog() {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Notebook className="w-4 h-4" />
          Tech Blog
        </CardTitle>
        <SeemoreButton href="blog" label="Tech Blog" page="blog post" />
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
