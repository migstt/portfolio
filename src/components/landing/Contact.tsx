import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/general/SocialLinks";
import { Section } from "./ui/Section";
import { Eyebrow } from "./ui/Eyebrow";
import { ContactSocials } from "./cards/ContactSocials";

const findHref = (name: string) =>
  SocialLinks.find((s) => s.name === name)?.href || "#";

export function Contact() {
  const emailHref = findHref("Email");

  const socials = [
    { name: "GitHub", href: findHref("GitHub"), icon: Github },
    { name: "LinkedIn", href: findHref("LinkedIn"), icon: Linkedin },
  ];

  return (
    <Section
      id="contact"
      className="md:py-32 bg-gradient-to-b from-muted/30 to-muted/60 dark:from-muted/20 dark:to-muted/40"
    >
      <div className="max-w-4xl mx-auto text-center">
        <Eyebrow className="mb-6">Contact</Eyebrow>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
          Got something
          <br />
          you need <span className="text-primary">built?</span>
        </h2>

        <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed">
          Happy to talk through it, whether it&apos;s a new project or an
          existing one that needs picking up.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={emailHref} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="cursor-pointer group">
              <Mail className="w-4 h-4" />
              Send a message
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </a>
        </div>

        <ContactSocials socials={socials} />
      </div>
    </Section>
  );
}
