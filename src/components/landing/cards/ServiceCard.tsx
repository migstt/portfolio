import { Service } from "@/data/landingData";
import { LandingCard } from "../ui/LandingCard";
import { TechTagList } from "../ui/TechTagList";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <LandingCard className="p-6 flex flex-col gap-3">
      <span className="text-xs font-mono text-muted-foreground">
        {service.number}
      </span>
      <h3 className="font-display text-xl font-semibold tracking-tight">
        {service.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {service.description}
      </p>
      <TechTagList items={service.tech} className="pt-2" />
    </LandingCard>
  );
}
