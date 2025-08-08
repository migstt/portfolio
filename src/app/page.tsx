import { Layout } from "@/components/Layout";
import { ProfileHeader } from "@/components/ProfileHeader";
import { AboutCard } from "@/components/AboutCard";
import { TechStackCard } from "@/components/TechStackCard";
import { ExperienceCard } from "@/components/ExperienceCard";

export default function Home() {
  return (
    <Layout>
      <section className="space-y-6">
        <ProfileHeader
          name="Miguel Trinidad"
          verified
          location="Cebu, Philippines"
          role="Full Stack Web Developer | Aspiring DevOps"
          profileImage="/images/migueltrinidad.jpg"
          achievement=""
        />

        <div className="space-y-2">
          {/* Row 1: About + Experience (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
            <div className="lg:col-span-3 flex flex-col gap-4">
              <AboutCard about="Developer with experience in JavaScript and PHP applications using Laravel and CodeIgniter. In my recent role, I maintained and developed internal systems to support company operations. I’m actively exploring DevOps and have a strong interest in automating processes and improving development workflows." />
            </div>
            <div className="lg:col-span-2 flex flex-col">
              <ExperienceCard
                experiences={[
                  {
                    title: "Web Developer",
                    company: "Web2 Inc.",
                    start: "2024",
                    end: "2025",
                  },
                  {
                    title: "Software Engineer Intern",
                    company: "Fullspeed Technologies Inc.",
                    start: "2023",
                    end: "2024",
                  },
                ]}
              />
            </div>
          </div>

          {/* Row 2: Tech Stack + Projects (6 cols, 3 + 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-3">
              <TechStackCard
                stack={[
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "PHP",
                  "Docker",
                  "AWS",
                ]}
              />
            </div>
            <div className="lg:col-span-3"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
