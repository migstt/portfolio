import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * "See all projects →" style link. This exact markup — inline-flex, arrow, and
 * the nudge-on-hover transform — was repeated in four sections with slightly
 * different sizes and easing. One component keeps them identical.
 */

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

const STYLES =
  "group inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

const ARROW =
  "w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5";

export function ArrowLink({
  href,
  children,
  external = false,
  className,
}: ArrowLinkProps) {
  const content = (
    <>
      {children}
      <ArrowUpRight className={ARROW} />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(STYLES, className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(STYLES, className)}>
      {content}
    </Link>
  );
}
