import { fetchStravaAthleteStats } from "@/lib/strava";
import { StravaIcon } from "@/components/general/SocialLinks";
import {
  StravaAthleteStats,
  StravaSportTotals,
  isSportTotals,
} from "@/app/types";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { CardGrid } from "./ui/CardGrid";
import { ArrowLink } from "./ui/ArrowLink";
import { StatCard } from "./cards/StatCard";
import { formatDistance, formatDuration, mockStravaStats } from "./stravaStats";

const STRAVA_PROFILE = "https://www.strava.com/athletes/115133923";

export async function StravaStrip() {
  let stats: StravaAthleteStats | null = null;

  try {
    stats = await fetchStravaAthleteStats();
  } catch {
    // A failed Strava call should hide this section, not break the page.
    stats = null;
  }

  if (!stats && process.env.MOCK_API === "true") {
    stats = mockStravaStats;
  }

  if (!stats) return null;

  const runTotals: StravaSportTotals | null = isSportTotals(stats.all_run_totals)
    ? stats.all_run_totals
    : null;

  if (!runTotals) return null;

  return (
    <Section>
      <SectionHeader
        eyebrow="Off the keyboard"
        title={
          <>
            I run in my <span className="text-primary">spare time.</span>
          </>
        }
        description="All-time totals, pulled from Strava."
        center
      />

      <div className="max-w-4xl mx-auto">
        <CardGrid cols={3}>
          <StatCard value={String(runTotals.count)} label="Runs" />
          <StatCard value={formatDistance(runTotals.distance)} label="Distance" />
          <StatCard
            value={formatDuration(runTotals.moving_time)}
            label="Moving time"
          />
        </CardGrid>

        <div className="mt-10 flex justify-center">
          <ArrowLink href={STRAVA_PROFILE} external className="text-muted-foreground">
            <StravaIcon className="w-4 h-4" />
            View on Strava
          </ArrowLink>
        </div>
      </div>
    </Section>
  );
}
