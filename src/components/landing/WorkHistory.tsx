import { companies } from "@/data/landingData";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { CardGrid } from "./ui/CardGrid";
import { CompanyCard } from "./cards/CompanyCard";

export function WorkHistory() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Where I've worked"
        title="Three companies since 2023"
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
