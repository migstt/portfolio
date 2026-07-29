import { ArrowUpRight } from "lucide-react";
import { LandingCard } from "../ui/LandingCard";

/*
 * Card linking somewhere else. Takes plain props rather than a NavPage so the
 * same card works for internal routes and for off-site links.
 */

export interface Destination {
  name: string;
  href: string;
  description: string;
  external?: boolean;
}

export function NavCard({ destination }: { destination: Destination }) {
  return (
    <LandingCard
      href={destination.href}
      external={destination.external}
      className="p-6 flex flex-col gap-2"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
          {destination.name}
        </h3>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {destination.description}
      </p>
    </LandingCard>
  );
}
