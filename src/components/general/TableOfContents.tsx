"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import type { TocHeading } from "@/lib/blog";

interface TableOfContentsProps {
  headings: TocHeading[];
}

// Strip leading numbers like "1.", "2.", "3." from heading text
function stripNumbering(text: string): string {
  return text.replace(/^\d+\.\s*/, "");
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const isClickScrolling = useRef(false);

  // Update indicator position when activeId changes
  useEffect(() => {
    const activeItem = itemRefs.current.get(activeId);
    const list = listRef.current;

    if (activeItem && list) {
      const listRect = list.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      setIndicatorStyle({
        top: itemRect.top - listRect.top,
        height: itemRect.height,
      });
    }
  }, [activeId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore observer updates during click-initiated scroll
        if (isClickScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Disable observer during scroll
      isClickScrolling.current = true;
      setActiveId(id);

      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Re-enable observer after scroll completes
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 500);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav>
      <h4 className="text-base font-semibold text-foreground mb-2">
        On this page
      </h4>
      <div className="relative">
        {/* Sliding indicator */}
        <div
          className="absolute left-0 w-0.5 bg-primary rounded-full transition-all duration-200 ease-out"
          style={{
            top: indicatorStyle.top,
            height: indicatorStyle.height,
          }}
        />
        <ul ref={listRef} className="space-y-1 text-[0.9rem] list-none border-l border-border">
          {headings.map((heading) => (
            <li
              key={heading.id}
              ref={(el) => {
                if (el) itemRefs.current.set(heading.id, el);
              }}
              style={{
                paddingLeft: `${(heading.level - 2) * 12}px`,
              }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={cn(
                  "flex items-center gap-1.5 py-0.5 pl-3 text-muted-foreground hover:text-foreground transition-colors duration-200",
                  activeId === heading.id && "text-foreground font-medium"
                )}
              >
                {heading.level > 2 && (
                  <span className="text-muted-foreground/60">•</span>
                )}
                {stripNumbering(heading.text)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
