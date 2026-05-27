import { services } from "@/data/landingData";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { TechTag } from "./ui/TechTag";

export function Services() {
  return (
    <Section className="py-24">
      <SectionHeader
        eyebrow="What I build"
        title={
          <>
            Three things, done <span className="text-primary">well.</span>
          </>
        }
        center
      />

      <div className="space-y-px">
        {services.map((service) => (
          <div
            key={service.number}
            className="group grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-t border-border first:border-t-0"
          >
            <div className="col-span-12 md:col-span-2">
              <span className="text-sm font-mono text-muted-foreground">
                {service.number}
              </span>
            </div>
            <div className="col-span-12 md:col-span-6">
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-wrap gap-x-3 gap-y-1 md:justify-end md:items-start">
              {service.tech.map((t) => (
                <TechTag key={t}>{t}</TechTag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
