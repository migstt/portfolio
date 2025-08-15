import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/toggles/ThemeToggle";
import { HeaderActions } from "@/components/layout/header/HeaderActions";
import { profile } from "@/data/portfolioData";

export function SubpageHeader() {
  const { name } = profile;

  return (
    <header className="w-full py-4 px-4">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/m.png"
            alt="Logo"
            width={30}
            height={30}
            priority
            className="rounded-md"
          />
          <h1 className="hidden sm:block text-sm md:text-xl font-bold truncate">
            {name}
          </h1>
        </Link>

        {/* Actions and theme toggle */}
        <div className="flex items-center gap-3">
          <HeaderActions />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
