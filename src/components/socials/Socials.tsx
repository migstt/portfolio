import React from "react";
import { SocialLinks } from "@/components/socials/SocialLinks";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type SocialsProps = {
  button?: boolean;
  size?: "sm" | "default" | "lg" | "icon" | null | undefined;
  className?: string;
};

export function Socials({
  button = true,
  size = "sm",
  className = "",
}: SocialsProps) {
  const btnSizeClass =
    size === "sm" ? "w-7 h-7 md:w-8 md:h-8" : "w-9 h-9 md:w-10 md:h-10";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {SocialLinks.map(
        ({ name, href, Icon, ariaLabel, className: iconClass }) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel ?? name}
              >
                {button ? (
                  <Button
                    size={size}
                    variant="outline"
                    className={`${btnSizeClass} transition-all duration-200 flex items-center justify-center cursor-pointer`}
                  >
                    <Icon className={`w-4 h-4 ${iconClass ?? ""}`} />
                  </Button>
                ) : (
                  <Icon
                    className={`w-5 h-5 ${
                      iconClass ?? "hover:text-primary transition-colors"
                    }`}
                  />
                )}
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name === "Email" ? "Send Email" : name}</p>
            </TooltipContent>
          </Tooltip>
        )
      )}
    </div>
  );
}
