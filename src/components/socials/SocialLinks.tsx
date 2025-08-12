import React from "react";
import { Github, Linkedin, Instagram, MailPlus } from "lucide-react";
import { SocialLink } from "@/app/types/social";

export const StravaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
  </svg>
);

const emailHref = `mailto:mft.trinidad@gmail.com?subject=${encodeURIComponent(
  "Inquiry from your portfolio"
)}&body=${encodeURIComponent(
  "Hello Miguel,\n\nI saw your portfolio and would like to connect regarding..."
)}`;

export const SocialLinks: SocialLink[] = [
  {
    name: "Email",
    href: emailHref,
    Icon: MailPlus,
    ariaLabel: "Send email to Miguel",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/mfttrinidad",
    Icon: Linkedin,
    ariaLabel: "LinkedIn profile",
    className: "",
  },
  {
    name: "GitHub",
    href: "https://github.com/migstt",
    Icon: Github,
    ariaLabel: "GitHub profile",
    className: "",
  },
  // {
  //   name: "Instagram",
  //   href: "https://instagram.com/miguelftt",
  //   Icon: Instagram,
  //   ariaLabel: "Instagram profile",
  //   className: "",
  // },
  {
    name: "Strava",
    href: "https://www.strava.com/athletes/115133923",
    Icon: StravaIcon,
    ariaLabel: "Strava profile",
    className: "",
  },
];
