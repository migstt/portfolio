import { Metadata } from "next";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { SelectedWork } from "@/components/landing/SelectedWork";
import { PersonalProjects } from "@/components/landing/PersonalProjects";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { StravaStrip } from "@/components/landing/StravaStrip";
import { ExploreMore } from "@/components/landing/ExploreMore";
import { Contact } from "@/components/landing/Contact";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { RevealSections } from "@/components/landing/ui/RevealSections";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Full Stack Developer",
  description:
    "Full-stack developer building e-commerce sites, content sites, and internal tools, and keeping them running. Based in Cebu, Philippines.",
  path: "/",
  tags: [
    "full stack developer",
    "MedusaJS developer",
    "Next.js developer",
    "Laravel developer",
    "e-commerce developer",
    "web developer Cebu",
  ],
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl flex flex-col flex-1">
        <LandingHeader />
        <main className="flex-1">
          {/* Hero sits outside RevealSections — it is above the fold, so
              fading it in on scroll would just delay the first paint. */}
          <Hero />

          <RevealSections>
            <Services />
            <SelectedWork />
            <PersonalProjects />
            <TrustStrip />
            <StravaStrip />
            <ExploreMore />
            <Contact />
          </RevealSections>
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
