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
        title={
          <>
            Things I built for <span className="text-primary">myself.</span>
          </>
        }
        description="Usually to solve my own problem, sometimes just to try something."
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
