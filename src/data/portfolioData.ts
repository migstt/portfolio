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
  "Got started with Laravel and Next.js during my internship, then moved into my first job building and maintaining internal business systems in PHP, CodeIgniter, and Laravel. Now at my current role working on e-commerce platforms with MedusaJS and content sites with Next.js and Sanity CMS. Moving toward DevOps, particularly around automation and deployment workflows.";

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
    items: ["OpenAI API", "ZeptoMail", "Mollie"],
  },
  {
    label: "Infrastructure & Tools",
    items: ["AWS EC2", "Vercel", "Netlify", "Linux (CLI)", "SSH", "Git", "GitHub Actions", "Bash"],
  },
];

export const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "WebriQs Technologies Inc.",
    logo: "/images/companies/webriq.png",
    location: "Cebu City, Philippines",
    workType: "Remote/On-site",
    start: "2025",
    end: "Present",
    startMonth: "September 2025",
    endMonth: "Present",
    description:
      "Working on B2B and B2C e-commerce projects for US and Netherlands-based clients with MedusaJS, building out core storefront features including cart, checkout, order management, and transactional emails via ZeptoMail. Implemented a custom Mollie payment integration on MedusaJS v1, with Supabase and Redis handling data and caching. Also maintaining marketing and content websites using Next.js, TypeScript, Sanity CMS, and Tailwind CSS, with a focus on performance and Lighthouse score optimization.",
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
      "Joined the internal systems team to help build and maintain business applications. Created an SSL certificate tracking module that automated manual work for over 500 client websites, making it easier for the client care team to manage renewals. Worked with a teammate to build a content generation tool using Laravel, React, DynamoDB, and OpenAI API to help teams draft emails, social media posts, and assist with code generation and debugging. Also maintained HR, Sales, and Inventory systems by fixing bugs and adding new features using CodeIgniter, jQuery, Bootstrap, and MySQL.",
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
      "Started as one of three interns working with Laravel framework, maintaining an internal ticketing system previously developed by former interns. Contributed weekly blog posts and reflections as part of the learning process. After completing academic requirements in December 2023, expressed interest to my manager to extend my internship duration. Joined a different team where I completed training by building a board game application using Next.js with TypeScript. Subsequently worked on implementing CRUD functionalities in a Next.js TypeScript project. Before concluding my internship, contributed a final blog post that was published on the company's official website.",
    descriptionJSX: React.createElement(
      React.Fragment,
      null,
      "Started as one of three interns working with Laravel framework, maintaining an internal ticketing system previously developed by former interns. Contributed ",
      React.createElement(
        "a",
        {
          href: "https://ardiesan.github.io/engineers-log/author/mtrinidad/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary underline hover:opacity-75 transition-opacity",
        },
        "weekly articles"
      ),
      " as part of the learning process. After completing academic requirements in December 2023, expressed interest to my manager to extend my internship duration. Joined a different team where I completed training by building a ",
      React.createElement(
        "a",
        {
          href: "/projects/boardgameplay/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary underline hover:opacity-75 transition-opacity",
        },
        "board game app"
      ),
      " using Next.js with TypeScript. Subsequently worked on implementing CRUD functionalities in a Next.js TypeScript project. Before concluding my internship, contributed a ",
      React.createElement(
        "a",
        {
          href: "https://techblog.fullspeedtechnologies.com/2024/03/27/internship-a-story-of-growth-and-gratitude.html",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary underline hover:opacity-75 transition-opacity",
        },
        "blog post"
      ),
      " that was published on the company's official website."
    ),
  },
];
