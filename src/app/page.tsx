import { Metadata } from "next";
import { Layout } from "@/components/layout/MainLayout";
import { About } from "@/components/cards/About";
import { TechStack } from "@/components/cards/TechStack";
import { Experience } from "@/components/cards/Experience";
import { Projects } from "@/components/cards/Projects";
import { OffKeyboard } from "@/components/cards/offkeyboard/OffKeyboard";
import { TechBlog } from "@/components/cards/TechBlog";
import { Certifications } from "@/components/cards/Certifications";
import { Connect } from "@/components/cards/Connect";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Miguel Franco Trinidad",
  description:
    "Full-stack web developer with experience in PHP and JavaScript, actively exploring DevOps.",
  path: "/",
  tags: [
    "full stack web developer",
    "PHP developer",
    "JavaScript developer",
    "web development",
    "DevOps",
    "frontend",
    "backend",
  ],
});

export default async function Home() {
  return (
    <Layout>
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-2">
            <div className="lg:col-span-3 md:col-span-1 flex flex-col gap-4 animate-slide-up-1">
              <About />
            </div>
            <div className="lg:col-span-2 md:col-span-1 flex flex-col animate-slide-up-2">
              <Experience />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 gap-2 items-stretch">
            <div className="lg:col-span-3 md:col-span-1 h-full min-h-0 animate-slide-up-3">
              <TechStack />
            </div>
            <div className="lg:col-span-3 md:col-span-1 h-full min-h-0 animate-slide-up-4">
              <Projects />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-7 md:grid-cols-2 gap-2">
            <div className="lg:col-span-3 md:col-span-1 flex flex-col gap-4 animate-slide-up-5">
              <OffKeyboard />
            </div>
            <div className="lg:col-span-4 md:col-span-1 flex flex-col animate-slide-up-6">
              <TechBlog />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-3 gap-2">
            <div className="lg:col-span-2 md:col-span-1 animate-slide-up-7">
              <Connect />
            </div>
            <div className="lg:col-span-4 md:col-span-2 animate-slide-up-8">
              <Certifications />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
