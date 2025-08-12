"use client";
import { SubpageLayout } from "@/components/layout/SubpageLayout";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A personal portfolio built with Next.js, Tailwind CSS, and TypeScript to showcase my projects and blogs.",
  },
  {
    id: 2,
    title: "CI/CD Pipeline Automation",
    description:
      "Automated build, test, and deployment workflows using GitHub Actions for a production web app.",
  },
  {
    id: 3,
    title: "Cloud Infrastructure Setup",
    description:
      "Provisioned scalable infrastructure on AWS using Terraform and Dockerized services for deployment.",
  },
];

export default function ProjectsPage() {
  return (
    <SubpageLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </SubpageLayout>
  );
}
