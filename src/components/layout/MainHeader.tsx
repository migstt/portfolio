import Image from "next/image";
import { MapPin, CircleCheck, Trophy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/toggles/ThemeToggle";
import { profile } from "@/data/portfolioData";

export function MainHeader() {
  const { name, verified, location, role, profileImage, achievement } = profile;

  const email = "mft.trinidad@gmail.com";
  const subject = encodeURIComponent("Inquiry from your portfolio");
  const body = encodeURIComponent(
    "Hello Miguel,\n\nI saw your portfolio and would like to connect regarding..."
  );

  const Actions = () => (
    <div className="flex items-center gap-2 w-full">
      <a
        href={`mailto:${email}?subject=${subject}&body=${body}`}
        className="inline-flex"
      >
        <Button variant="outline" size="sm" className="cursor-pointer">
          <Mail className="w-4 h-4 mr-1" />
          Send Email
        </Button>
      </a>
      <ThemeToggle />
    </div>
  );

  return (
    <header className="flex lg:flex-row lg:items-center md:flex-row md:items-center justify-between gap-6 px-4 pt-4">
      <div className="flex flex-row flex-wrap items-center xs:items-start gap-4 flex-1 min-w-0">
        <Image
          src={profileImage}
          alt={`${name} profile photo`}
          width={150}
          height={150}
          className="rounded-xl object-cover shrink-0"
        />
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold truncate">{name}</h1>
            {verified && <CircleCheck className="text-blue-500 w-5 h-5" />}
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <p className="text-muted-foreground text-sm font-semibold">{role}</p>

          <div className="mt-3 lg:hidden">
            <Actions />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-end gap-3">
        {achievement && (
          <div className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-md">
            <Trophy className="w-4 h-4 mr-1" />
            {achievement}
          </div>
        )}
        <Actions />
      </div>
    </header>
  );
}
