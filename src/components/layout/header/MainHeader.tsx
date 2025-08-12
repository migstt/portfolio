import Image from "next/image";
import { MapPin, CircleCheck, Trophy } from "lucide-react";
import { ThemeToggle } from "@/components/toggles/ThemeToggle";
import { profile } from "@/data/portfolioData";
import { HeaderActions } from "@/components/layout/header/HeaderActions";

export function MainHeader() {
  const { name, verified, location, role, profileImage, achievement } = profile;

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
            className="rounded-xl object-cover shrink-0 
              w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] 
              transition-all duration-300"
          />
          <div className="flex flex-col gap-1 min-w-0 transition-all duration-300">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold truncate md:text-2xl transition-all duration-300">
                {name}
              </h1>
              {verified && (
                <CircleCheck className="text-blue-500 w-4 h-4 md:w-5 md:h-5 transition-all duration-300" />
              )}
            </div>
            <div className="flex items-center text-xs text-muted-foreground gap-1 md:text-sm transition-all duration-300">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 transition-all duration-300" />
              {location}
            </div>
            <p className="text-muted-foreground text-xs font-semibold md:text-sm transition-all duration-300">
              {role}
            </p>

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
