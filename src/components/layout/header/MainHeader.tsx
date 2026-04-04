import Image from "next/image";
import { Trophy } from "lucide-react";
import { ThemeToggle } from "@/components/general/ThemeToggle";
import { profile } from "@/data/portfolioData";
import { HeaderActions } from "@/components/layout/header/HeaderActions";

export function MainHeader() {
  const { name, location, role, profileImage, achievement } = profile;

  return (
    <header className="relative px-4 pt-4 transition-all duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-row flex-wrap items-center gap-4 flex-1 min-w-0">
          <Image
            src={profileImage}
            alt={`${name} profile photo`}
            width={150}
            height={150}
            className="rounded-lg object-cover shrink-0
              w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]
              transition-all duration-300"
          />
          <div className="flex flex-col gap-1 min-w-0 transition-all duration-300">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                  {name}
                </h1>
              </div>

              <p className="text-xs md:text-sm font-medium text-primary">
                {role}
              </p>

              <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                <span>{location}</span>
              </div>
            </div>

            <div className="lg:hidden mt-1">
              <HeaderActions />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end gap-3">
          {achievement && (
            <div className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-md text-xs md:text-sm transition-all duration-300">
              <Trophy className="w-4 h-4 mr-1" />
              {achievement}
            </div>
          )}
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}
