import { ArrowUpRight } from "lucide-react";
import { PersonalProject } from "@/data/landingData";
import { LandingCard } from "../ui/LandingCard";
import { TechTagList } from "../ui/TechTagList";

export function ProjectCard({ project }: { project: PersonalProject }) {
  return (
    <LandingCard href={project.href} className="p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {project.description}
      </p>
      <TechTagList items={project.tech} className="pt-2" />
    </LandingCard>
  );
}
