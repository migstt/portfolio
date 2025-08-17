import { Badge } from "@/components/ui/badge";
import { languageColors } from "@/lib/github";

interface LanguageBadgeProps {
  language: string | null;
  className?: string;
}

export function LanguageBadge({
  language,
  className = "",
}: LanguageBadgeProps) {
  if (!language) return null;

  const color = languageColors[language] || "#6b7280";

  return (
    <Badge
      className={`inline-flex items-center text-[11px] font-medium text-white border-0 ${className}`}
      style={{ backgroundColor: color }}
    >
      {language}
    </Badge>
  );
}
