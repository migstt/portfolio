import { pages } from "@/components/layout/header/pages";
import { SocialLinks } from "@/components/general/SocialLinks";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { CardGrid } from "./ui/CardGrid";
import { NavCard, Destination } from "./cards/NavCard";

/*
 * Cross-links to the rest of the site. Built from the header's `pages` array
 * (minus Home) so adding a route updates the nav and this section together,
 * plus GitHub as an off-site destination.
 *
 * The GitHub card also rounds the count from 5 to 6, which fills two rows of
 * three exactly. CardGrid centres a short final row anyway, so this is for
 * tidiness rather than to avoid a hole.
 */

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
        title={
          <>
            Have a look <span className="text-primary">around.</span>
          </>
        }
        description="The rest of the site, if you want more detail."
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
