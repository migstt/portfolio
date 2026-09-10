import { pages } from "@/components/layout/header/pages";
import { SocialLinks } from "@/components/general/SocialLinks";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { CardGrid } from "./ui/CardGrid";
import { NavCard, Destination } from "./cards/NavCard";

const githubHref =
  SocialLinks.find((link) => link.name === "GitHub")?.href ||
  "https://github.com/migstt";

const destinations: Destination[] = [
  ...pages
    .filter((page) => page.href !== "/")
    .map(({ name, href, description }) => ({ name, href, description })),
  {
    name: "GitHub",
    href: githubHref,
    description: "Source for most of what is listed here",
    external: true,
  },
];

export function ExploreMore() {
  return (
    <Section>
      <SectionHeader
        eyebrow="More"
        title="The rest of the site"
        description="Longer versions of everything above."
        center
      />

      <CardGrid cols={3}>
        {destinations.map((destination) => (
          <NavCard key={destination.href} destination={destination} />
        ))}
      </CardGrid>
    </Section>
  );
}
