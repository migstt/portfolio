import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/general/ThemeToggle";
import { HeaderActions } from "@/components/layout/header/HeaderActions";
import { pages } from "@/components/layout/header/pages";
import { SocialLinks } from "@/components/general/SocialLinks";

export function LandingHeader() {
  const emailHref = SocialLinks[0]?.href || "#";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60 px-6 lg:px-10 py-4 flex items-center justify-between gap-6">
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <Image
          src="/images/m.png"
          alt="Logo"
          width={28}
          height={28}
          priority
          className="rounded-sm"
        />
        <span className="text-sm font-semibold tracking-tight hidden sm:inline">
          Miguel Trinidad
        </span>
      </Link>

      <nav className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
        {pages.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className="hover:text-foreground transition-colors whitespace-nowrap"
          >
            {page.name}
          </Link>
        ))}
      </nav>

      <div className="hidden lg:flex items-center gap-2">
        <ThemeToggle />
        <a href={emailHref} target="_blank" rel="noopener noreferrer">
          <Button size="sm" className="cursor-pointer">
            <Mail className="w-4 h-4" />
            Contact
          </Button>
        </a>
      </div>

      <div className="lg:hidden flex items-center gap-3">
        <HeaderActions />
        <ThemeToggle />
      </div>
    </header>
  );
}
