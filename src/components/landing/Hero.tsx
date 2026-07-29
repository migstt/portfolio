import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./ui/Section";

export function Hero() {
  return (
    <Section
      bordered={false}
      padded={false}
      className="min-h-[calc(100svh-65px)] flex flex-col justify-center py-12 md:py-16"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] animate-slide-up-1">
          I build web apps
          <br />
          and keep them
          <br />
          <span className="text-primary">running.</span>
        </h1>

        <p className="mt-6 font-display italic text-xl md:text-2xl text-foreground/80 animate-slide-up-2">
          Full-stack. Frontend, backend, deployment.
        </p>

        <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed animate-slide-up-3">
          I&apos;m Miguel, a full-stack developer working on e-commerce sites,
          content sites, and internal tools.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-slide-up-4">
          <a href="#contact">
            <Button size="lg" className="cursor-pointer group">
              Get in touch
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </a>
          <Link href="/profile/">
            <Button variant="ghost" size="lg" className="cursor-pointer">
              See profile
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
