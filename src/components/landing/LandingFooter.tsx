import { Socials } from "@/components/general/Socials";

export function LandingFooter() {
  return (
    <footer className="px-6 lg:px-10 py-10 mt-8 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="text-center md:text-left">
          © 2026 Miguel Franco Trinidad. All rights reserved.
        </p>
        <Socials button={false} className="gap-5" />
      </div>
    </footer>
  );
}
