import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { personalProjects } from "@/data/landingData";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { TechTag } from "./ui/TechTag";

export function PersonalProjects() {
  return (
    <Section className="py-24">
      <SectionHeader
        eyebrow="Side projects"
        title={
          <>
            Built out of <span className="text-primary">curiosity.</span>
          </>
        }
        center
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {personalProjects.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="group bg-background p-8 md:p-10 flex flex-col gap-4 hover:bg-muted/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 pt-2">
              {p.tech.map((t) => (
                <TechTag key={t}>{t}</TechTag>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
        >
          See all projects
          <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>
    </Section>
  );
}
