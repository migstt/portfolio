import { companies } from "@/data/landingData";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { CardGrid } from "./ui/CardGrid";
import { CompanyCard } from "./cards/CompanyCard";

export function TrustStrip() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Worked with"
        title={
          <>
            Where I&apos;ve <span className="text-primary">worked.</span>
          </>
        }
        center
      />

      <CardGrid cols={3} className="max-w-4xl mx-auto">
        {companies.map((company) => (
          <CompanyCard key={company.name} company={company} />
        ))}
      </CardGrid>
    </Section>
  );
}
