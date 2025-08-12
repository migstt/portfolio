import Link from "next/link";
import { CircleArrowRight } from "lucide-react";

interface SeemoreButtonProps {
  href: string;
  label?: string;
  page: string;
}

export function SeemoreButton({ href, label, page }: SeemoreButtonProps) {
  return (
    <Link
      href={`/${href}`}
      className="text-muted-foreground hover:text-primary transition-colors"
      aria-label={`See more ${label || href}`}
    >
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium leading-none">
          See more <span className="sr-only">{page}</span>
        </span>
        <CircleArrowRight
          className="w-4 h-4 stroke-[2] mt-[1px]"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
