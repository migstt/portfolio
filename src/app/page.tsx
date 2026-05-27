import { Metadata } from "next";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { SelectedWork } from "@/components/landing/SelectedWork";
import { PersonalProjects } from "@/components/landing/PersonalProjects";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { StravaStrip } from "@/components/landing/StravaStrip";
import { Contact } from "@/components/landing/Contact";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Reveal } from "@/components/landing/ui/Reveal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Full Stack Developer",
  description:
    "Full-stack developer building e-commerce storefronts, content sites, and internal tools. Based in Cebu, Philippines.",
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
          <Hero />
          <Reveal>
            <Services />
          </Reveal>
          <Reveal>
            <SelectedWork />
          </Reveal>
          <Reveal>
            <PersonalProjects />
          </Reveal>
          <Reveal>
            <TrustStrip />
          </Reveal>
          <Reveal>
            <StravaStrip />
          </Reveal>
          <Reveal>
            <Contact />
          </Reveal>
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
