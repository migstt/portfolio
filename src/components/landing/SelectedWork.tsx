import { selectedWork } from "@/data/landingData";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { CardGrid } from "./ui/CardGrid";
import { ArrowLink } from "./ui/ArrowLink";
import { WorkCard } from "./cards/WorkCard";

export function SelectedWork() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Recent work"
        title={
          <>
            A portal, an SSL tracker, and an{" "}
            <span className="text-primary">AI assistant</span>
          </>
        }
        description="Three from the last two years, and what each one actually changed."
        center
      />

      <CardGrid cols={2}>
        {selectedWork.map((item) => (
          <WorkCard key={item.title} item={item} />
        ))}
      </CardGrid>

      <div className="mt-10 flex justify-center">
        <ArrowLink href="/experience/">See the full timeline</ArrowLink>
      </div>
    </Section>
  );
}
