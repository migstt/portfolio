import { ArrowUpRight } from "lucide-react";
import { fetchStravaAthleteStats } from "@/lib/strava";
import { StravaIcon } from "@/components/general/SocialLinks";
import {
  StravaAthleteStats,
  StravaSportTotals,
  isSportTotals,
} from "@/app/types";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h >= 100) return `${h}h`;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function formatDistance(meters: number) {
  const km = meters / 1000;
  return `${km.toLocaleString("en-US", { maximumFractionDigits: 0 })} km`;
}

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <div className="bg-background p-8 text-center">
      <div className="font-display text-3xl md:text-4xl font-bold tracking-tight">
        {value}
      </div>
      <div className="mt-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

const mockStats: StravaAthleteStats = {
  biggest_ride_distance: 80000,
  biggest_climb_elevation_gain: 1200,
  recent_run_totals: {
    count: 12,
    distance: 92500,
    moving_time: 28800,
    elapsed_time: 30000,
    elevation_gain: 320,
  },
  recent_ride_totals: "",
  recent_swim_totals: "",
  ytd_run_totals: {
    count: 142,
    distance: 1247000,
    moving_time: 403200,
    elapsed_time: 410000,
    elevation_gain: 3800,
  },
  ytd_ride_totals: "",
  ytd_swim_totals: "",
  all_run_totals: {
    count: 412,
    distance: 3840000,
    moving_time: 1224000,
    elapsed_time: 1300000,
    elevation_gain: 11500,
  },
  all_ride_totals: "",
  all_swim_totals: "",
};

export async function StravaStrip() {
  let stats: StravaAthleteStats | null = null;
  try {
    stats = await fetchStravaAthleteStats();
  } catch {
    stats = null;
  }

  if (!stats && process.env.MOCK_API === "true") {
    stats = mockStats;
  }

  if (!stats) return null;

  const runTotals: StravaSportTotals | null = isSportTotals(stats.all_run_totals)
    ? stats.all_run_totals
    : null;

  if (!runTotals) return null;

  return (
    <Section className="py-24">
      <SectionHeader
        eyebrow="Off the keyboard"
        title={
          <>
            Discipline shows <span className="text-primary">up.</span>
          </>
        }
        center
      />

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-px bg-border border border-border">
          <Stat value={String(runTotals.count)} label="Runs" />
          <Stat value={formatDistance(runTotals.distance)} label="Distance" />
          <Stat value={formatDuration(runTotals.moving_time)} label="Moving time" />
        </div>

        <p className="mt-4 text-center text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
          All-time
        </p>

        <div className="mt-8 text-center">
          <a
            href="https://www.strava.com/athletes/115133923"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#FC4C02] transition-colors group"
          >
            <StravaIcon className="w-4 h-4" />
            Live from Strava
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </Section>
  );
}
