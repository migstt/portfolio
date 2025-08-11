import { Socials } from "@/components/socials/Socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto max-w-5xl px-5 pb-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="text-center md:text-left">
          © {year} Miguel Trinidad. All rights reserved.
        </p>

        <Socials button={false} className="gap-5" />
      </div>
    </footer>
  );
}
