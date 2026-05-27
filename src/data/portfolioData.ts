import { Profile, AboutText, TechCategory, Experience } from "@/app/types";
import React from "react";

export const profile: Profile = {
  name: "Miguel Trinidad",
  verified: true,
  location: "Cebu, Philippines",
  role: "Full Stack Developer",
  profileImage: "/images/migueltrinidad.jpg",
  achievement: "",
};

export const aboutText: AboutText =
  "Started with Laravel and Next.js as an intern, then moved to Web2 building internal HR, sales, and inventory systems in CodeIgniter and Laravel — also automated their AWS EC2 deployments with Git hooks and Bash scripts. Now at Webriqs shipping multi-role portals with HubSpot CRM integration, B2C e-commerce on MedusaJS, and content sites with Next.js and Sanity. Heading toward DevOps — automation and deployment workflows.";

export const techCategories: TechCategory[] = [
  {
    label: "Languages",
    items: ["PHP", "JavaScript", "TypeScript"],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      "Laravel",
      "CodeIgniter",
      "Next.js",
      "React",
      "MedusaJS",
      "jQuery",
      "Bootstrap",
      "Tailwind CSS",
      "Sanity CMS",
    ],
  },
  {
    label: "Databases & Storage",
    items: ["MySQL", "PostgreSQL", "Google Cloud Firestore", "AWS S3", "Supabase", "Redis"],
  },
  {
    label: "APIs & Services",
    items: ["OpenAI API", "HubSpot API", "Mollie", "ZeptoMail"],
  },
  {
    label: "Infrastructure & Tools",
    items: ["AWS EC2", "Vercel", "Netlify", "Linux (CLI)", "SSH", "Git", "GitHub Actions", "Bash"],
  },
];

export const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Webriqs Technologies Inc.",
    logo: "/images/companies/webriq.png",
    location: "Cebu City, Philippines",
    workType: "Remote/On-site",
    start: "2025",
    end: "Present",
    startMonth: "September 2025",
    endMonth: "Present",
    description:
      "Built a multi-role portal for a US building products manufacturer where contractors manage homeowner leads and submit quotes, and distributors get scoped access. Integrated HubSpot CRM via API workflows for lead assignment automation, deal stage updates, and portal-to-CRM activity sync, with role-based access control across all three user types. Also shipped a B2C e-commerce platform on MedusaJS with Supabase, Redis, Mollie for payments, and ZeptoMail for transactional emails, plus marketing and content sites using Next.js, TypeScript, Sanity CMS, and Tailwind CSS deployed via Vercel and Netlify.",
  },
  {
    title: "Full Stack Developer",
    company: "Web2 Inc.",
    logo: "/images/companies/web2.jpg",
    location: "Cebu City, Philippines",
    workType: "On-site",
    start: "2024",
    end: "2025",
    startMonth: "June 2024",
    endMonth: "July 2025",
    description:
      "Maintained internal HR, sales, and inventory systems built on CodeIgniter, jQuery, Bootstrap, and MySQL. Built an SSL certificate monitoring tool that tracked expiration across 500+ client sites with automated renewal reminders and task assignments. Co-developed an AI content and code assistant using Laravel, React, DynamoDB, and OpenAI API for writing, proofreading, email drafting, and debugging. Also automated deployment of two Laravel apps to AWS EC2 via Git hooks and Bash scripts on a self-hosted Git server.",
  },
  {
    title: "Software Engineer Intern",
    company: "Fullspeed Technologies Inc.",
    logo: "/images/companies/fullspeed.jpg",
    location: "Cebu City, Philippines",
    workType: "Remote/On-site",
    start: "2023",
    end: "2024",
    startMonth: "July 2023",
    endMonth: "March 2024",
    description:
      "Built a real-time multiplayer board game using Next.js, TypeScript, and Cloud Firestore. Built admin features for an artist-fan platform (Next.js, TypeScript, Firebase) for managing social links and subscription cancellation in the mobile app. Contributed technical blog posts during the internship; final article published on the company blog.",
    descriptionJSX: React.createElement(
      React.Fragment,
      null,
      "Built a real-time multiplayer ",
      React.createElement(
        "a",
        {
          href: "/projects/boardgameplay/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary underline hover:opacity-75 transition-opacity",
        },
        "board game"
      ),
      " using Next.js, TypeScript, and Cloud Firestore. Built admin features for an artist-fan platform (Next.js, TypeScript, Firebase) for managing social links and subscription cancellation in the mobile app. Contributed ",
      React.createElement(
        "a",
        {
          href: "https://ardiesan.github.io/engineers-log/author/mtrinidad/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary underline hover:opacity-75 transition-opacity",
        },
        "technical blog posts"
      ),
      " during the internship; final article ",
      React.createElement(
        "a",
        {
          href: "https://techblog.fullspeedtechnologies.com/2024/03/27/internship-a-story-of-growth-and-gratitude.html",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary underline hover:opacity-75 transition-opacity",
        },
        "published on the company blog"
      ),
      "."
    ),
  },
];
