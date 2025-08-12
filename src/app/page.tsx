"use client";

import { Layout } from "@/components/layout/Layout";
import { About } from "@/components/cards/About";
import { TechStack } from "@/components/cards/TechStack";
import { Experience } from "@/components/cards/Experience";
import { Projects } from "@/components/cards/Projects";
import { OffKeyboard } from "@/components/cards/offkeyboard/OffKeyboard";
import { TechBlog } from "@/components/cards/TechBlog";
import { Certifications } from "@/components/cards/Certifications";
import { Connect } from "@/components/cards/Connect";

export default function Home() {
  return (
    <Layout>
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-2">
            <div className="lg:col-span-3 md:col-span-1 flex flex-col gap-4">
              <About />
            </div>
            <div className="lg:col-span-2 md:col-span-1 flex flex-col">
              <Experience />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 gap-2 items-stretch">
            <div className="lg:col-span-3 md:col-span-1 h-full min-h-0">
              <TechStack />
            </div>

            <div className="lg:col-span-3 md:col-span-1 h-full min-h-0">
              <Projects />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 md:grid-cols-2 gap-2">
            <div className="lg:col-span-3 md:col-span-1 flex flex-col gap-4">
              <OffKeyboard />
            </div>
            <div className="lg:col-span-4 md:col-span-1 flex flex-col">
              <TechBlog />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-3 gap-2">
            <div className="lg:col-span-2 md:col-span-1">
              <Connect />
            </div>
            <div className="lg:col-span-4 md:col-span-2">
              <Certifications />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
