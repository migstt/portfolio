import { LucideIcon } from "lucide-react";
import { Eyebrow } from "../ui/Eyebrow";

interface Social {
  name: string;
  href: string;
  icon: LucideIcon;
}

/*
 * Secondary social row under the contact CTA. Driven by an array so adding a
 * link is one entry rather than another copy-pasted anchor.
 */

export function ContactSocials({ socials }: { socials: Social[] }) {
  return (
    <div className="mt-10 pt-10 border-t border-border/60 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
      <Eyebrow>Or find me on</Eyebrow>
      {socials.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <Icon className="w-4 h-4" />
          {name}
        </a>
      ))}
    </div>
  );
}
