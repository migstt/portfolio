import React from "react";
import { SocialLinks } from "@/components/general/SocialLinks";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type SocialsProps = {
  button?: boolean;
  size?: "sm" | "default" | "lg" | null | undefined;
  className?: string;
};

export function Socials({
  button = true,
  size = "sm",
  className = "",
}: SocialsProps) {
  if (!button) {
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
                  <Icon
                    className={`w-5 h-5 ${
                      iconClass ?? "hover:text-primary transition-colors"
                    }`}
                  />
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

  return (
    <div
      className={`grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 gap-2 w-full ${className}`}
    >
      {SocialLinks.map(({ name, href, Icon, className: iconClass }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button
            size={size}
            variant="outline"
            className={`w-full gap-2 flex items-left justify-center transition-all duration-200 cursor-pointer`}
          >
            <Icon className={`w-4 h-4 ${iconClass ?? ""}`} />
            <span className={`text-xs ${name === "LinkedIn" ? "mt-1" : "mt-0.5"}`}>
              {name === "Email" ? "Send email" : name}
            </span>
          </Button>
        </a>
      ))}
    </div>
  );
}
