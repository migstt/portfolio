"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface DynamicBreadcrumbProps {
  pageTitle?: string;
}

export function DynamicBreadcrumb({ pageTitle }: DynamicBreadcrumbProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const labelMap: Record<string, string> = {
    blog: "Blog",
    projects: "Projects",
    "scaling-with-docker": "Scaling with Docker",
    "ci-cd-best-practices": "CI/CD Best Practices",
    "nextjs-performance-tips": "Next.js Performance Tips",
  };

  return (
    <Breadcrumb className="px-4">
      <BreadcrumbList className="flex items-center">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/") + "/";
          const isLast = index === segments.length - 1;

          const displayText =
            isLast && pageTitle
              ? pageTitle
              : labelMap[segment] || decodeURIComponent(segment);

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator className="relative top-[1.4px]" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayText}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{displayText}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
