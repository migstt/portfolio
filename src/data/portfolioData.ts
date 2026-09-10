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
  "I started as an intern at Fullspeed, building a real-time multiplayer board game in Next.js. At Web2 Inc. I looked after the internal HR, sales, and inventory systems the company ran on, and built an SSL monitor that tracked expiry across 500+ client sites so the client care team could stop chasing renewals in a spreadsheet. At Webriqs Technologies I built a multi-role portal wired into HubSpot, a B2C storefront on Medusa, and content sites on Next.js and Sanity. The part I keep coming back to is deployment: Git hooks, Bash, and GitHub Actions that get code onto a server without anyone touching it. Currently open to what's next.";

export const techCategories: TechCategory[] = [
  {
    label: "Languages",
    items: ["PHP", "JavaScript", "TypeScript", "Bash"],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      "Laravel",
      "CodeIgniter",
      "Next.js",
      "React",
      "Medusa",
      "jQuery",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    label: "Databases & Caching",
    items: ["MySQL", "PostgreSQL", "Cloud Firestore", "DynamoDB", "Redis"],
  },
  {
    label: "Platforms & APIs",
    items: ["Supabase", "Firebase", "Sanity", "HubSpot", "OpenAI", "Mollie", "ZeptoMail"],
  },
  {
    label: "Infrastructure & Tools",
    items: [
      "Amazon EC2",
      "Amazon S3",
      "Vercel",
      "Netlify",
      "Linux",
      "SSH",
      "Git",
      "GitHub Actions",
    ],
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
    end: "2026",
    startMonth: "September 2025",
    endMonth: "September 2026",
    description:
      "Built a multi-role portal for a US building products manufacturer where contractors manage homeowner leads and submit quotes, and distributors get scoped access. Integrated HubSpot CRM via API workflows for lead assignment automation, deal stage updates, and portal-to-CRM activity sync, with role-based access control across all three user types. Also shipped a B2C e-commerce platform on Medusa with Supabase, Redis, Mollie for payments, and ZeptoMail for transactional emails, plus marketing and content sites using Next.js, TypeScript, Sanity, and Tailwind CSS deployed via Vercel and Netlify.",
    highlights: [
      {
        title: "Multi-role portal for a US building products manufacturer",
        detail:
          "Three user types in one app: contractors work their homeowner leads and submit quotes, distributors see only their own accounts, and staff see everything. Access is enforced per role rather than hidden in the UI, so a contractor cannot reach another contractor's leads by guessing a URL.",
        tech: ["Next.js", "TypeScript", "PostgreSQL"],
      },
      {
        title: "HubSpot CRM integration",
        detail:
          "Lead assignment, deal stage updates, and portal activity all sync back into HubSpot through API workflows. Sales stopped keeping a second copy of the pipeline: what happens in the portal is what the CRM shows.",
        tech: ["HubSpot API", "Webhooks"],
      },
      {
        title: "B2C storefront on Medusa",
        detail:
          "Storefront and checkout on Medusa, with Postgres on Supabase, Redis for caching, Mollie handling payments, and ZeptoMail sending order confirmations and shipping updates.",
        tech: ["Medusa", "Supabase", "Redis", "Mollie", "ZeptoMail"],
      },
      {
        title: "Marketing and content sites",
        detail:
          "Next.js front ends with Sanity behind them, deployed on Vercel and Netlify. Content is modelled so the people who own the copy can change it without a deploy or a developer.",
        tech: ["Next.js", "Sanity", "Tailwind CSS", "Vercel", "Netlify"],
      },
    ],
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
      "Maintained internal HR, sales, and inventory systems built on CodeIgniter, jQuery, Bootstrap, and MySQL. Built an SSL certificate monitoring tool that tracked expiration across 500+ client sites with automated renewal reminders and task assignments. Co-developed an AI content and code assistant using Laravel, React, DynamoDB, and OpenAI API for writing, proofreading, email drafting, and debugging. Also automated deployment of two Laravel apps to Amazon EC2 via Git hooks and Bash scripts on a self-hosted Git server.",
    highlights: [
      {
        title: "SSL monitoring across 500+ client sites",
        detail:
          "The client care team tracked certificate expiry in a spreadsheet and chased renewals by hand. Replaced it with a tool that checks expiry dates, sends reminders on a schedule, and assigns the renewal as a task to whoever owns the account.",
        tech: ["Laravel", "MySQL", "Cron"],
      },
      {
        title: "AI content and code assistant",
        detail:
          "Co-built an internal assistant for writing, proofreading, drafting emails, and working through bugs. Used across teams, not just engineering.",
        tech: ["Laravel", "React", "DynamoDB", "OpenAI"],
      },
      {
        title: "Internal HR, sales, and inventory systems",
        detail:
          "Kept the systems the company ran on day to day working and changing: bug fixes, new reports, and features on a long-lived CodeIgniter and jQuery codebase.",
        tech: ["CodeIgniter", "jQuery", "Bootstrap", "MySQL"],
      },
      {
        title: "Deployment automation",
        detail:
          "Two Laravel apps were being deployed by hand. Wrote Git hooks and Bash scripts on the self-hosted Git server so a push to the deploy branch pulls, installs, and restarts on Amazon EC2 by itself.",
        tech: ["Bash", "Git hooks", "Amazon EC2"],
      },
    ],
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
    highlights: [
      {
        title: "Real-time multiplayer board game",
        detail:
          "Built solo. Game state lives in Cloud Firestore and syncs between players as they move, which meant working out how to keep several browsers agreeing on one board.",
        detailJSX: React.createElement(
          React.Fragment,
          null,
          "Built solo. Game state lives in Cloud Firestore and syncs between players as they move, which meant working out how to keep several browsers agreeing on one board. ",
          React.createElement(
            "a",
            {
              href: "/projects/boardgameplay/",
              className: "text-primary underline hover:opacity-75 transition-opacity",
            },
            "See the project"
          ),
          "."
        ),
        tech: ["Next.js", "TypeScript", "Cloud Firestore"],
      },
      {
        title: "Admin features for an artist-fan platform",
        detail:
          "Added social link management and subscription cancellation to the admin side of a mobile product.",
        tech: ["Next.js", "TypeScript", "Firebase"],
      },
      {
        title: "Technical writing",
        detail:
          "Wrote technical posts through the internship. The final one was published on the company blog.",
        detailJSX: React.createElement(
          React.Fragment,
          null,
          "Wrote ",
          React.createElement(
            "a",
            {
              href: "https://ardiesan.github.io/engineers-log/author/mtrinidad/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary underline hover:opacity-75 transition-opacity",
            },
            "technical posts"
          ),
          " through the internship. The final one was ",
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
    ],
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
