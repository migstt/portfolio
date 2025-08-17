import {
  Profile,
  AboutText,
  TechCategory,
  Experience,
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
