import Image from "next/image";
import {
  MapPin,
  CircleCheck,
  Trophy,
  Mail,
  MailPlus,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";
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

  const SocialLink = ({
    href,
    icon,
  }: {
    href: string;
    icon: React.ReactNode;
  }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button
        size="sm"
        variant="outline"
        className="w-7 h-7 md:w-8 md:h-8 transition-all duration-300"
      >
        {icon}
      </Button>
    </a>
  );

  const Actions = () => (
    <div className="flex flex-wrap items-center gap-2 w-full transition-all duration-300">
      {/* Email Button */}
      <a
        href={`mailto:${email}?subject=${subject}&body=${body}`}
        className="inline-flex"
      >
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs md:h-9 md:text-sm transition-all duration-300"
        >
          <MailPlus className="w-4 h-4 mr-1" />
          Email
        </Button>
      </a>

      <SocialLink
        href="https://linkedin.com/in/mfttrinidad"
        icon={<Linkedin className="w-4 h-4 text-[#0A66C2]" />} // LinkedIn Blue
      />

      <SocialLink
        href="https://github.com/migstt"
        icon={<Github className="w-4 h-4 text-[#181717] dark:text-white" />} // GitHub Black
      />

      <SocialLink
        href="https://instagram.com/miguelftt"
        icon={
          <Instagram className="w-4 h-4 text-[#E4405F]" /> // Instagram Pink
        }
      />

      <SocialLink
        href="https://www.strava.com/athletes/115133923"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-[#FC4C02]" // Strava Orange
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15.9 0L12 8.4 8.1 0H0l12 24L24 0h-8.1z" />
          </svg>
        }
      />
    </div>
  );

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

            <div className="lg:hidden mt-2">
              <Actions />
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
          <Actions />
        </div>
      </div>
    </header>
  );
}
