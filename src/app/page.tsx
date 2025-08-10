import { Layout } from "@/components/Layout";
import { ProfileHeader } from "@/components/ProfileHeader";
import { AboutCard } from "@/components/AboutCard";
import { TechStackCard } from "@/components/TechStackCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ProjectsCard } from "@/components/ProjectsCard";
import { OffKeyboardCard } from "@/components/OffKeyboardCard";
import { DevLogCard } from "@/components/DevLogCard";

import {
  aboutText,
  techCategories,
  experiences,
  profile,
  projects,
  devLogEntries
} from "@/data/portfolioData";

export default function Home() {
  return (
    <Layout>
      <section className="space-y-6">
        <ProfileHeader {...profile} />

        <div className="space-y-2">
          <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-2">
            <div className="lg:col-span-3 md:col-span-1 flex flex-col gap-4">
              <AboutCard about={aboutText} />
            </div>
            <div className="lg:col-span-2 md:col-span-1 flex flex-col">
              <ExperienceCard experiences={experiences} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 gap-2 items-stretch">
            <div className="lg:col-span-3 md:col-span-1 h-full min-h-0">
              <TechStackCard categories={techCategories} />
            </div>

            <div className="lg:col-span-3 md:col-span-1 h-full min-h-0">
              <ProjectsCard projects={projects} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-2">
            <div className="lg:col-span-2 md:col-span-1 flex flex-col gap-4">
              <OffKeyboardCard />
            </div>
            <div className="lg:col-span-3 md:col-span-1 flex flex-col">
              <DevLogCard
                devLogEntries={devLogEntries}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
