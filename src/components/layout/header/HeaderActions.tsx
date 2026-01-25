"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MailPlus, ChevronDown } from "lucide-react";
import { SocialLinks } from "@/components/general/SocialLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const pages = [
  { name: "Home", href: "/", description: "Main page" },
  { name: "Experience", href: "/experience/", description: "Career timeline" },
  { name: "Projects", href: "/projects/", description: "Browse projects" },
  {
    name: "Tech Blog",
    href: "/blog/",
    description: "Read articles and guides",
  },
];

export function HeaderActions() {
  const emailLink = SocialLinks[0]?.href || "#";
  const pathname = usePathname();
  
  const selectedPage =
    pages.find((p) =>
      pathname === "/"
        ? p.href === "/"
        : pathname.startsWith(p.href) && p.href !== "/"
    )?.name || "Home";

  return (
    <div className="flex items-center gap-2">
      <a
        href={emailLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Send Email"
        className="w-full sm:w-auto"
      >
        <Button className="cursor-pointer" size={"sm"}>
          <MailPlus className="w-4 h-4" />
          <span className="truncate">Send email</span>
        </Button>
      </a>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="cursor-pointer" size={"sm"}>
            <span className="truncate">{selectedPage}</span>
            <ChevronDown className="w-4 h-4 lg:mt-1" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="w-56 max-w-[85vw] sm:w-48 p-1"
        >
          {pages.map((page) => (
            <DropdownMenuItem key={page.name} className="p-1">
              <Link href={page.href} className="flex flex-col w-full px-1 py-1">
                <span className="text-sm font-medium truncate">
                  {page.name}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {page.description}
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
