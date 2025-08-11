import type { ComponentType, SVGProps } from "react";

export type SocialLink = {
  name: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  ariaLabel?: string;
  className?: string;
};
