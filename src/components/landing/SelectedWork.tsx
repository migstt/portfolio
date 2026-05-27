import { ArrowUpRight } from "lucide-react";
import { selectedWork } from "@/data/landingData";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { TechTag } from "./ui/TechTag";

export function SelectedWork() {
  return (
    <Section className="py-24">
      <SectionHeader
        eyebrow="Recent outcomes"
        title={
          <>
            Selected <span className="text-primary">work.</span>
          </>
        }
        center
      />

      <div className="space-y-px">
        {selectedWork.map((item, idx) => (
          <div
            key={idx}
            className="group grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-t border-border first:border-t-0"
          >
            <div className="col-span-12 md:col-span-1 pt-1">
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="col-span-12 md:col-span-7">
              <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight leading-snug mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-2 md:items-end md:text-right">
              <span className="text-sm font-medium">{item.company}</span>
              <div className="flex flex-wrap gap-x-2 gap-y-1 md:justify-end">
                {item.tech.map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
