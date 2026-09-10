import { personalProjects } from "@/data/landingData";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { CardGrid } from "./ui/CardGrid";
import { ArrowLink } from "./ui/ArrowLink";
import { ProjectCard } from "./cards/ProjectCard";

export function PersonalProjects() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Side projects"
        title="Built to scratch my own itch"
        description="Small things I wanted to exist. Two of them ended up running this site."
        center
      />

      <CardGrid cols={2}>
        {personalProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </CardGrid>

      <div className="mt-10 flex justify-center">
        <ArrowLink href="/projects/">See all projects</ArrowLink>
      </div>
    </Section>
  );
}
