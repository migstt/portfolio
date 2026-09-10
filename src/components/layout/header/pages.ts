export interface NavPage {
  name: string;
  href: string;
  description: string;
}

// "/" is the developer profile while the client landing page is parked at
// /landing, so there is no separate Profile entry here.
export const pages: NavPage[] = [
  { name: "Home", href: "/", description: "Developer profile" },
  { name: "Experience", href: "/experience/", description: "Career timeline" },
  { name: "Projects", href: "/projects/", description: "Browse projects" },
  { name: "Blog", href: "/blog/", description: "Read articles and guides" },
  { name: "Terminal", href: "/terminal/", description: "Interactive terminal" },
];
