import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/portfolioData";

export const metadata: Metadata = createPageMetadata.experience();

export default function ExperiencePage() {
  return (
    <SubpageLayout pageTitle="Experience">
      <div className="animate-slide-up-1">
        <ol className="relative border-s border-primary/30">
          {experiences.map((exp, index) => (
            <li
              key={index}
              className={`mb-10 ms-6 ${
                index === experiences.length - 1 ? "mb-0" : ""
              }`}
            >
              <div
                className={`absolute w-3 h-3 rounded-full mt-4 -start-[6px] border-2 border-background ${
                  index === 0
                    ? "bg-primary"
                    : "bg-primary/30"
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
              {!exp.highlights && (
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {exp.descriptionJSX || exp.description}
                </p>
              )}

              {exp.highlights && (
                <ul className="mt-5 space-y-4">
                  {exp.highlights.map((highlight) => (
                    <li
                      key={highlight.title}
                      className="border-s border-border ps-4"
                    >
                      <h5 className="text-sm font-semibold">{highlight.title}</h5>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-1">
                        {highlight.detailJSX || highlight.detail}
                      </p>
                      {highlight.tech && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {highlight.tech.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="font-normal"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </SubpageLayout>
  );
}
