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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
          <div className="lg:col-span-3 flex flex-col gap-2">
            <AboutCard about="I’m a web developer with experience in building scalable applications and a growing focus on DevOps practices." />
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
          <div className="lg:col-span-2 flex flex-col gap-2">
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

        
      </section>
    </Layout>
  );
}
