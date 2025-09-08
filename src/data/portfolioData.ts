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
  "Developer with experience in JavaScript and PHP applications using Laravel and CodeIgniter. In my recent role, I maintained and developed internal systems to support company operations. I’m actively exploring DevOps and have a strong interest in automating processes and improving development workflows.";

export const techCategories: TechCategory[] = [
  {
    label: "Languages",
    items: ["PHP", "JavaScript"],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      "Laravel",
      "CodeIgniter",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    label: "Databases & Storage",
    items: ["MySQL", "SQL", "Google Cloud Firestore"],
  },
  {
    label: "DevOps & Tools",
    items: ["Git", "GitHub Actions", "Bash", "Linux CLI", "SSH"],
  },
];

export const experiences: Experience[] = [
  {
    title: "Full Stack Web Developer",
    company: "Web2 Inc.",
    location: "Cebu City, Philippines",
    workType: "On-site",
    start: "2024",
    end: "2025",
    startMonth: "June 2024",
    endMonth: "July 2025",
    description:
      "Joined the internal systems team to develop and maintain business applications. Built an SSL certificate tracking module that automated manual processes for 1,000+ client websites, enabling automated task assignments and renewal reminders for client care teams. Co-developed a content generation tool using Laravel, React, DynamoDB, and OpenAI API to streamline email drafting, social media posts creation, and content proofreading for internal teams. Maintained and enhanced HR, Sales, and Inventory systems by resolving bugs and implementing new features using CodeIgniter, jQuery, Bootstrap, and MySQL.",
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
