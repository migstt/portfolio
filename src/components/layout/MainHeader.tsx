import Image from "next/image";
import { MapPin, CircleCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/toggles/ThemeToggle";
import { profile } from "@/data/portfolioData";

export function MainHeader() {

  const { name, verified, location, role, profileImage, achievement } = profile;

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-4 pt-4">
      <div className="flex items-center gap-4">
        <Image
          src={profileImage}
          alt={`${name} profile photo`}
          width={150}
          height={150}
          className="rounded-xl object-cover"
        />
        <div className="gap-1 flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{name}</h1>
            {verified && <CircleCheck className="text-blue-500 w-5 h-5" />}
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <p className="text-muted-foreground">{role}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        {achievement && (
          <div className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-md">
            <Trophy className="w-4 h-4 mr-1" />
            {achievement}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button variant="default">Schedule a Call</Button>
          <Button variant="secondary">Send Email</Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
