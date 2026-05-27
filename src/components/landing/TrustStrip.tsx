import Image from "next/image";
import { companies } from "@/data/landingData";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";

export function TrustStrip() {
  return (
    <Section className="py-24">
      <SectionHeader
        eyebrow="Worked with"
        title={
          <>
            Where I&apos;ve shipped <span className="text-primary">code.</span>
          </>
        }
        center
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border max-w-4xl mx-auto">
        {companies.map((c) => (
          <div
            key={c.name}
            className="group bg-background p-8 flex flex-col items-center text-center gap-4 hover:bg-muted/40 transition-colors"
          >
            <Image
              src={c.logo}
              alt={`${c.name} logo`}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col items-center gap-1.5">
              <span className="font-medium text-sm md:text-base">{c.name}</span>
              <span className="text-xs font-mono text-muted-foreground">
                {c.period}
              </span>
              {c.current && (
                <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-primary">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                  </span>
                  Current
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
