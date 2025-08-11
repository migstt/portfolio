import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "lucide-react";

const StravaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 75 75"
    fill="currentColor"
  >
    <path d="M41.5 45l-8.5-15H28l13.5 25L55 30h-5.1L41.5 45zM28.5 55l5.1-10h-4.3l-8.1 15h7.3L37 60l-3.5-5h-5z" />
  </svg>
);

export function Connect() {
  const email = "youremail@example.com";

  const socials = [
    {
      name: "LinkedIn",
      icon: <LinkedinIcon className="w-5 h-5" />,
      url: "https://linkedin.com/in/yourprofile",
      color: "#0A66C2",
    },
    {
      name: "GitHub",
      icon: <GithubIcon className="w-7 h-7" />,
      url: "https://github.com/yourusername",
      color: "#333",
    },
    {
      name: "Instagram",
      icon: <InstagramIcon className="w-7 h-7" />,
      url: "https://instagram.com/yourusername",
      color: "#E4405F",
    },
    {
      name: "Strava",
      icon: <StravaIcon className="w-7 h-7" />,
      url: "https://www.strava.com/athletes/yourid",
      color: "#FC4C02",
    },
  ];

  return (
    <Card className="h-full flex flex-col bg-muted/30 border border-border">
      <CardHeader className="pb-2">
        <CardTitle>Connect</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email */}
        <div className="flex items-center justify-center">
          <span className="text-sm sm:text-base font-medium text-foreground break-all">
            {email}
          </span>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-2 flex-wrap">
          {socials.map((social) => (
            <Tooltip key={social.name}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:[color:var(--hover-color)]"
                    style={{ "--hover-color": social.color } as React.CSSProperties}
                  >
                    {social.icon}
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">{social.name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
