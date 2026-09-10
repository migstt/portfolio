import { services } from "@/data/landingData";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { CardGrid } from "./ui/CardGrid";
import { ServiceCard } from "./cards/ServiceCard";

export function Services() {
  return (
    <Section>
      <SectionHeader
        eyebrow="What I build"
        title="Three kinds of work"
        description="Storefronts, content sites, internal tools. Almost everything I take on is one of these."
        center
      />

      <CardGrid cols={3}>
        {services.map((service) => (
          <ServiceCard key={service.number} service={service} />
        ))}
      </CardGrid>
    </Section>
  );
}
