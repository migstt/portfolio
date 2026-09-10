export interface Service {
  number: string;
  title: string;
  description: string;
  tech: string[];
}

export interface WorkItem {
  title: string;
  description: string;
  company: string;
  tech: string[];
}

export interface PersonalProject {
  title: string;
  description: string;
  tech: string[];
  href: string;
}

import { experiences } from "./portfolioData";

export interface Company {
  name: string;
  logo: string;
  period: string;
  current?: boolean;
}

export const services: Service[] = [
  {
    number: "01",
    title: "E-commerce storefronts",
    description:
      "B2C storefronts on Medusa: custom checkout, Mollie for payments, ZeptoMail for order emails, Postgres on Supabase with Redis in front of it.",
    tech: ["Medusa", "Mollie", "Supabase", "Redis"],
  },
  {
    number: "02",
    title: "Content & marketing sites",
    description:
      "Next.js front ends with Sanity behind them, so whoever owns the copy can change it without a deploy or a developer.",
    tech: ["Next.js", "Sanity", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "03",
    title: "HubSpot portals & CRM integrations",
    description:
      "Multi-role portals with per-role dashboards and role-based access. HubSpot CRM integrations for lead assignment, deal sync, and workflow automation. Also internal tools — SSL trackers, AI assistants, admin dashboards.",
    tech: ["Next.js", "Laravel", "HubSpot", "OpenAI"],
  },
];

export const selectedWork: WorkItem[] = [
  {
    title: "Multi-role portal with HubSpot CRM integration",
    description:
      "Built for a US building products manufacturer: contractors manage homeowner leads and submit quotes, distributors get scoped access, and HubSpot stays in sync with portal activity via API workflows for lead assignment and deal updates.",
    company: "Webriqs Technologies Inc.",
    tech: ["Next.js", "TypeScript", "HubSpot", "PostgreSQL"],
  },
  {
    title: "Automated SSL tracking for 500+ client websites",
    description:
      "Tracked expiration across 500+ client sites with automated renewal reminders and task assignments. Replaced the spreadsheet the client care team used to chase manually.",
    company: "Web2 Inc.",
    tech: ["Laravel", "MySQL", "CodeIgniter"],
  },
  {
    title: "AI content & code assistant used across teams",
    description:
      "Co-built with Laravel, React, DynamoDB, and OpenAI. Used internally for writing, proofreading, email drafting, and debugging code.",
    company: "Web2 Inc.",
    tech: ["Laravel", "React", "DynamoDB", "OpenAI"],
  },
];

export const personalProjects: PersonalProject[] = [
  {
    title: "Strava Webhook",
    description:
      "Cloudflare Worker that catches Strava's webhook when I log a run and fires a Vercel deploy hook, so this site rebuilds with the new activity on its own.",
    tech: ["Cloudflare Workers", "JavaScript", "Vercel"],
    href: "/projects/strava-webhook/",
  },
  {
    title: "This portfolio",
    description:
      "Statically exported Next.js site with GitHub and Strava API integrations. Blog posts are markdown with custom syntax highlighting.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "/projects/portfolio/",
  },
  {
    title: "Boardgameplay",
    description:
      "Real-time multiplayer board game platform built during my internship. Built solo using Next.js with Firebase for realtime sync.",
    tech: ["Next.js", "TypeScript", "Firebase"],
    href: "/projects/boardgameplay/",
  },
  {
    title: "Tech Feed",
    description:
      "Article-sharing platform with auth and news aggregation via NewsData.io. Deployed through GitHub Actions CI/CD.",
    tech: ["Laravel", "Firebase", "Tailwind CSS"],
    href: "/projects/tech-feed/",
  },
];

export const companies: Company[] = experiences.map((exp) => ({
  name: exp.company,
  logo: exp.logo ?? "",
  period: `${exp.start} — ${exp.end}`,
  current: exp.end === "Present",
}));
