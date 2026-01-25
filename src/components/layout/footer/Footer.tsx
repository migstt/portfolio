import { Socials } from "@/components/general/Socials";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-5xl px-5 pb-5 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="text-center md:text-left">
          © 2026 Miguel Franco Trinidad. All rights reserved.
        </p>

        <Socials button={false} className="gap-5" />
      </div>
    </footer>
  );
}
