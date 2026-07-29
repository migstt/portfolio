import { WorkItem } from "@/data/landingData";
import { LandingCard } from "../ui/LandingCard";
import { TechTagList } from "../ui/TechTagList";

export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <LandingCard className="p-6 flex flex-col gap-3">
      <span className="text-xs font-mono text-muted-foreground">
        {item.company}
      </span>
      <h3 className="font-display text-xl font-semibold tracking-tight leading-snug">
        {item.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {item.description}
      </p>
      <TechTagList items={item.tech} className="pt-2" />
    </LandingCard>
  );
}
