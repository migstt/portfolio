import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Post } from "@/lib/blog";
import { ProcessedRepo } from "@/lib/github";

interface PaginationItem {
  slug?: string;
  name?: string;
  title?: string;
  displayName?: string;
}

interface PaginationNavProps {
  prevItem?: Post | ProcessedRepo | null;
  nextItem?: Post | ProcessedRepo | null;
  basePath: string;
  itemType: string;
}

export default function PaginationNav({
  prevItem,
  nextItem,
  basePath,
  itemType,
}: PaginationNavProps) {
  if (!prevItem && !nextItem) {
    return null;
  }

  const getItemHref = (item: PaginationItem) => {
    const identifier = item.slug || item.name;
    return `${basePath}/${identifier}`;
  };

  const getItemTitle = (item: PaginationItem) => {
    return item.title || item.displayName || "";
  };

  return (
    <nav className="mt-12 pt-8 border-t border-border">
      <div className="flex flex-row justify-between items-center gap-4">
        {prevItem ? (
          <Link
            href={getItemHref(prevItem)}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 flex-1 max-w-[45%] py-2"
          >
            <ChevronLeft className="h-4 w-4 flex-shrink-0 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors lg:hidden">
                Previous {itemType}
              </p>
              <div className="hidden lg:block">
                <p className="text-xs uppercase tracking-wide font-medium">
                  Previous
                </p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                  {getItemTitle(prevItem)}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1 max-w-[45%]"></div>
        )}

        {nextItem ? (
          <Link
            href={getItemHref(nextItem)}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 flex-1 max-w-[45%] py-2 justify-end"
          >
            <div className="min-w-0 flex-1 text-right order-1">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors lg:hidden">
                Next {itemType}
              </p>
              <div className="hidden lg:block">
                <p className="text-xs uppercase tracking-wide font-medium">
                  Next
                </p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                  {getItemTitle(nextItem)}
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200 order-2" />
          </Link>
        ) : (
          <div className="flex-1 max-w-[45%]"></div>
        )}
      </div>
    </nav>
  );
}
