import { ThemeToggle } from "@/components/toggles/ThemeToggle";
import { profile } from "@/data/portfolioData";
import { HeaderActions } from "@/components/layout/header/HeaderActions";

export function SubpageHeader() {
  const { name } = profile;
  return (
    <header className="w-full py-4 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold truncate md:text-2xl">{name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <HeaderActions />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
