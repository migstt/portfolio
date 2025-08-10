import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Notebook, CircleChevronRight } from "lucide-react";

interface DevLogEntry {
  date: string;
  title: string;
  link: string;
  description: string;
  readTime: string;
}

interface DevLogCardProps {
  devLogEntries: DevLogEntry[];
}

export function DevLogCard({ devLogEntries }: DevLogCardProps) {
  return (
    <Card className="h-full flex flex-col bg-muted/30 border border-border">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Notebook className="w-4 h-4" />
          Dev Log
        </CardTitle>

        <a
          href="/dev-log"
          className="flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleChevronRight className="w-4 h-4 stroke-[2]" />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>See more</p>
            </TooltipContent>
          </Tooltip>
        </a>
      </CardHeader>

      <CardContent className="flex-1 mt-1 space-y-4">
        {devLogEntries.slice(0, 3).map((entry) => (
          <a
            key={entry.title}
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="flex flex-col space-y-1">
              {/* Title */}
              <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                {entry.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-muted-foreground line-clamp-2">
                {entry.description}
              </p>

              {/* Meta info */}
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
