import { cn } from "@/lib/utils";
import { TechTag } from "./TechTag";

interface TechTagListProps {
  items: string[];
  className?: string;
}

export function TechTagList({ items, className }: TechTagListProps) {
  return (
    <div className={cn("flex flex-wrap gap-x-3 gap-y-1", className)}>
      {items.map((item) => (
        <TechTag key={item}>{item}</TechTag>
      ))}
    </div>
  );
}
