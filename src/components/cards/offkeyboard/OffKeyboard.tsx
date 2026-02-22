import { TerminalCard, TerminalCardContent } from "@/components/ui/terminal-card";
import { Badge } from "@/components/ui/badge";
import { Activity, CircleArrowRight } from "lucide-react";
import { OffKeyboardTable } from "./OffKeyboardTable";

export function OffKeyboard() {
  return (
    <TerminalCard
      title="Off the Keyboard"
      icon={<Activity className="w-3.5 h-3.5" />}
      headerRight={
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-[#FC4C02] text-white hover:bg-[#e04402] transition-colors text-xs font-bold"
          >
            Strava API
          </Badge>
          <a
            href="https://www.strava.com/athletes/115133923"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="See more on Strava"
          >
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium leading-none">
                See more <span className="sr-only">Strava activities</span>
              </span>
              <CircleArrowRight className="w-4 h-4 stroke-[2] mt-[1px]" aria-hidden="true" />
            </div>
          </a>
        </div>
      }
      className="h-full"
    >
      <TerminalCardContent className="max-h-[400px] overflow-y-auto text-sm">
        <OffKeyboardTable />
      </TerminalCardContent>
    </TerminalCard>
  );
}
