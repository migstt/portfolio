import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Package, CircleArrowRight } from "lucide-react";
import { projects } from "@/data/portfolioData";

export function Projects() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Package className="w-4 h-4" />
          Projects
        </CardTitle>

        <Link
          href="/projects"
          className="flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleArrowRight className="w-5 h-5 stroke-[2] align-middle" />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>See more</p>
            </TooltipContent>
          </Tooltip>
        </Link>
      </CardHeader>

      <CardContent className="flex-1 mt-1">
        <div className="grid grid-cols-1 gap-2">
          {projects.slice(0, 4).map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform transform hover:scale-[1.01] border rounded-lg p-2 h-full"
            >
              <div className="flex flex-col space-y-1">
                <h3 className="text-sm font-semibold">{project.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
