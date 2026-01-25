import { Profile, AboutText, TechCategory, Experience } from "@/app/types";
import React from "react";

export const profile: Profile = {
  name: "Miguel Trinidad",
  verified: true,
  location: "Cebu, Philippines",
  role: "Full Stack Web Developer",
  profileImage: "/images/migueltrinidad.jpg",
  achievement: "",
};

export const aboutText: AboutText =
  "Developer with experience building web applications using JavaScript, TypeScript, and PHP. I work on e-commerce platforms with MedusaJS and build marketing websites using Next.js, Sanity CMS, and Tailwind CSS. Previously, I maintained and developed internal business systems using Laravel and CodeIgniter. I enjoy exploring DevOps and finding ways to automate processes and improve development workflows.";

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
      "jQuery",
      "Bootstrap",
      "Tailwind CSS",
    ],
  },
  {
    label: "Databases & Storage",
    items: ["SQL", "MySQL", "PostgreSQL", "Google Cloud Firestore", "AWS S3"],
  },
  {
    label: "Cloud & Infrastructure",
    items: ["AWS EC2", "Linux (CLI)", "SSH"],
  },
  {
    label: "Tools & Workflow",
    items: ["Git", "GitHub Actions", "Bash"],
  },
];

export const experiences: Experience[] = [
  {
    title: "Full Stack Web Developer",
    company: "WebriQs Technologies Inc.",
    location: "Cebu City, Philippines",
    workType: "Remote/On-site",
    start: "2025",
    end: "Present",
    startMonth: "September 2025",
    endMonth: "Present",
    description:
      "Started by maintaining marketing and content websites for clients in the US and Netherlands using Next.js, TypeScript, Sanity CMS, and Tailwind CSS. After a couple of months, began working on a B2C e-commerce platform for a Dutch client, building features with MedusaJS, Supabase, Redis, and ZeptoMail for handling transactions and emails. Also worked with a teammate to create a MedusaJS storefront template for the team to use on future e-commerce projects.",
  },
  {
    title: "Full Stack Developer",
    company: "Web2 Inc.",
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
          className: "text-blue-600 dark:text-blue-400 hover:underline",
        },
        "weekly articles"
      ),
      " as part of the learning process. After completing academic requirements in December 2023, expressed interest to my manager to extend my internship duration. Joined a different team where I completed training by building a ",
      React.createElement(
        "a",
        {
          href: "/projects/boardgameplay",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-blue-600 dark:text-blue-400 hover:underline",
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
          className: "text-blue-600 dark:text-blue-400 hover:underline",
        },
        "blog post"
      ),
      " that was published on the company's official website."
    ),
  },
];
