export interface NavPage {
  name: string;
  href: string;
  description: string;
}

export const pages: NavPage[] = [
  { name: "Home", href: "/", description: "Landing page" },
  { name: "Profile", href: "/profile/", description: "Full developer profile" },
  { name: "Experience", href: "/experience/", description: "Career timeline" },
  { name: "Projects", href: "/projects/", description: "Browse projects" },
  { name: "Tech Blog", href: "/blog/", description: "Read articles and guides" },
  { name: "Terminal", href: "/terminal/", description: "Interactive terminal" },
];
