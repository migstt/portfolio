"use client";

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";
import { GitHubIcon } from "./icons/GitHubIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import ResumeModal from "./ResumeModal";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "About",
    "Projects",
    "Articles",
    "Experience",
    "GitHub",
    "LinkedIn",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-xl md:text-2xl">miguel.dev</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="/" aria-current="page" color="secondary">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            Articles
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">

        {/* Theme Switcher */}
        {/* <NavbarItem className="lg:flex">
          < ThemeSwitcher />
        </NavbarItem> */}

        {/* Resume Modal Button */}
        <NavbarItem className="hidden md:block">
          <ResumeModal />
        </NavbarItem>

        {/* GitHub Icon Link */}
        <NavbarItem className="lg:flex">
          <Link color="foreground" href="https://github.com/migstt" target="_blank" rel="noopener noreferrer">
            < GitHubIcon />
          </Link>
        </NavbarItem>

        {/* Linkedin Icon Link */}
        <NavbarItem className="lg:flex">
          <Link color="foreground" href="https://www.linkedin.com/in/miguel-franco-trinidad-3a919b253/" target="_blank" rel="noopener noreferrer">
            < LinkedInIcon />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 0 ? "secondary" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
