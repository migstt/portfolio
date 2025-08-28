import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { experiences } from "@/data/portfolioData";

export const metadata: Metadata = createPageMetadata.experience();

export default function ExperiencePage() {
  return (
    <SubpageLayout pageTitle="Experience">
      <div className="animate-slide-up-1">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {experiences.map((exp, index) => (
            <li
              key={index}
              className={`mb-8 ms-6 ${
                index === experiences.length - 1 ? "mb-0" : ""
              }`}
            >
              <div
                className={`absolute w-3.5 h-3.5 rounded-full mt-4 -start-[7px] border-2 border-white dark:border-gray-900 ${
                  index === 0
                    ? "bg-blue-600 dark:bg-blue-500"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              ></div>
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-2 mb-3">
                <div className="flex flex-col lg:mb-[-2]">
                  <time className="text-sm text-muted-foreground">
                    {exp.startMonth} - {exp.endMonth}
                  </time>
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                </div>
                <div className="flex flex-col lg:text-right">
                  <h4 className="text-md font-bold">{exp.company}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {exp.location} ({exp.workType})
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {exp.descriptionJSX || exp.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </SubpageLayout>
  );
}
