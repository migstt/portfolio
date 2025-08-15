import {
  Profile,
  AboutText,
  TechCategory,
  Experience,
  Project,
  DevLogEntry,
} from "@/app/types/portfolio";

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
    items: ["Laravel", "CodeIgniter", "React", "Tailwind CSS", "Bootstrap"],
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
    title: "Web Developer",
    company: "Web2 Inc.",
    start: "2024",
    end: "2025",
  },
  {
    title: "Software Engineer Intern",
    company: "Fullspeed Technologies Inc.",
    start: "2023",
    end: "2024",
  },
];

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "Built with Next.js, TypeScript, and shadcn/ui.",
    link: "https://github.com/migstt/portfolio",
  },
  {
    title: "Tech Article Platform",
    description:
      "Platform for publishing tech articles with Firebase auth and NewsData.io API.",
    link: "https://github.com/migstt/tech_content_platform",
  },
  {
    title: "Inventory Management System",
    description: "For stock, suppliers, and office location transfers.",
    link: "https://github.com/migstt/ci_system",
  },
];

export const devLogEntries: DevLogEntry[] = [
  {
    date: "Aug 10, 2025",
    title: "Automate GitHub Releases with GitHub Actions",
    link: "/dev-log/github-releases-actions",
    description:
      "Learn how to streamline your release workflow using GitHub Actions automation.",
    readTime: "5 min read",
  },
  {
    date: "Aug 8, 2025",
    title: "Deploying Laravel App to Shared Hosting Using GitHub Actions",
    link: "/dev-log/deploy-laravel-shared-hosting",
    description:
      "Step-by-step guide to deploying Laravel applications to shared hosting without manual FTP uploads.",
    readTime: "7 min read",
  },
  {
    date: "Aug 3, 2025",
    title: "PHPStan & PHPUnit GitHub Actions Workflow",
    link: "/dev-log/phpstan-phpunit-actions",
    description:
      "Set up automated PHPStan and PHPUnit tests in GitHub Actions for robust PHP projects.",
    readTime: "6 min read",
  },
];
