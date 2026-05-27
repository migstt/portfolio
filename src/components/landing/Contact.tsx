import { ArrowRight, Github, Linkedin, MailPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/general/SocialLinks";
import { Section } from "./ui/Section";
import { Eyebrow } from "./ui/Eyebrow";

const findHref = (name: string) =>
  SocialLinks.find((s) => s.name === name)?.href || "#";

export function Contact() {
  const emailHref = findHref("Email");
  const linkedinHref = findHref("LinkedIn");
  const githubHref = findHref("GitHub");

  return (
    <Section
      id="contact"
      className="py-24 md:py-32 bg-gradient-to-b from-muted/30 to-muted/60 dark:from-muted/20 dark:to-muted/40"
    >
      <div className="max-w-4xl mx-auto text-center">
        <Eyebrow className="mb-6">Get in touch</Eyebrow>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
          Let&apos;s build
          <br />
          something <span className="text-primary">good.</span>
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={emailHref} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="cursor-pointer group">
              <MailPlus className="w-4 h-4" />
              mft.trinidad@gmail.com
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </a>
        </div>

        <div className="mt-10 pt-10 border-t border-border/60 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <Eyebrow>Or find me on</Eyebrow>
          <a
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  );
}
