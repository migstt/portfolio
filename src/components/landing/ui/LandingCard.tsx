import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * The single card surface for the landing page.
 *
 * Deliberately matches the profile page's TerminalCard treatment — same
 * rounded-lg radius, same border token, same shadow-sm to shadow-md lift — so
 * the two pages read as one site. Before this, the landing page mixed three
 * different box idioms: bordered rows, a `gap-px bg-border` hairline grid, and
 * an unbordered gradient band.
 *
 * Pass `href` to make it a link. Interactive cards also warm their border on
 * hover and carry a visible focus ring, which a plain shadow change does not
 * give keyboard users.
 */

interface LandingCardProps {
  children: ReactNode;
  className?: string;
  /** Internal route, or an external URL when `external` is set. */
  href?: string;
  external?: boolean;
}

const SURFACE =
  "bg-card text-card-foreground rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow";

const INTERACTIVE =
  "group hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

export function LandingCard({
  children,
  className,
  href,
  external = false,
}: LandingCardProps) {
  if (!href) {
    return <div className={cn(SURFACE, className)}>{children}</div>;
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(SURFACE, INTERACTIVE, className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(SURFACE, INTERACTIVE, className)}>
      {children}
    </Link>
  );
}
