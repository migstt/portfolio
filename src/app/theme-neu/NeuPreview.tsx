"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  ArrowUpDown,
  Award,
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FolderGit2,
  GitFork,
  Layers,
  Link2,
  MapPin,
  Moon,
  SquareArrowUpRight,
  Star,
  Sun,
  User,
} from "lucide-react";
import { aboutText, experiences, profile, techCategories } from "@/data/portfolioData";
import { ProcessedActivity } from "@/app/types";
import "./neu.css";

const sampleRepos = [
  {
    name: "portfolio",
    displayName: "Portfolio",
    description: "Personal site built with Next.js, Tailwind CSS and static generation.",
    language: "TypeScript",
    stars: 4,
    forks: 1,
  },
  {
    name: "shell-scripts",
    displayName: "Shell Scripts",
    description: "Backups, rsync deploys, and Git key setup automation.",
    language: "Shell",
    stars: 2,
    forks: 0,
  },
  {
    name: "strava-webhook",
    displayName: "Strava Webhook",
    description: "Cloudflare Worker relaying Strava events to a Vercel deploy hook.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
  },
];

const samplePosts = [
  { title: "A Weekly Server Backup Pipeline in Three Shell Scripts", date: "2026-07-29" },
  { title: "Fetching GitHub Repos and READMEs at Build Time in Next.js", date: "2026-07-29" },
  { title: "Auto-Deploy to Vercel When a New Strava Activity Is Logged", date: "2026-02-22" },
  { title: "How to Fetch Your Strava Activities Using the Strava API", date: "2026-01-25" },
];

const sampleCerts = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2025" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", year: "2023" },
];

const PAGE_SIZE = 5;

function SectionHeader({
  icon,
  title,
  index,
}: {
  icon: ReactNode;
  title: string;
  index: string;
}) {
  return (
    <div className="neu-section-head">
      <span className="neu-index">{index}</span>
      <span className="neu-accent-text">{icon}</span>
      <h2 className="neu-section-title">{title}</h2>
      <span className="neu-rule" />
    </div>
  );
}

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
}

type SortKey = "distance" | "moving_time" | null;

function StravaTable({ activities }: { activities: ProcessedActivity[] }) {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [asc, setAsc] = useState(false);
  const [page, setPage] = useState(0);

  const sorted = useMemo(() => {
    if (!sortKey) return activities;
    // Copy before sorting — Array.prototype.sort mutates, and mutating a prop
    // would desync React's view of the data.
    return [...activities].sort((a, b) =>
      asc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]
    );
  }, [activities, sortKey, asc]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const rows = sorted.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  function toggleSort(key: Exclude<SortKey, null>) {
    if (sortKey === key) {
      setAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setAsc(false);
    }
    setPage(0);
  }

  return (
    <div>
      <div className="neu-table-wrap">
        <table className="neu-table">
          <thead>
            <tr>
              <th>Date</th>
              <th className="text-center">Type</th>
              <th>
                <button
                  type="button"
                  className="neu-sort"
                  data-active={sortKey === "distance"}
                  onClick={() => toggleSort("distance")}
                >
                  Km <ArrowUpDown className="h-3 w-3 opacity-70" />
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="neu-sort"
                  data-active={sortKey === "moving_time"}
                  onClick={() => toggleSort("moving_time")}
                >
                  Time <ArrowUpDown className="h-3 w-3 opacity-70" />
                </button>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="neu-muted text-center">
                  No activities found.
                </td>
              </tr>
            )}
            {rows.map((activity) => (
              <tr key={activity.id}>
                <td>
                  {new Date(activity.start_date_local).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="text-center">
                  <span className="neu-chip">{activity.type}</span>
                </td>
                <td>{(activity.distance / 1000).toFixed(1)}</td>
                <td>{formatDuration(activity.moving_time)}</td>
                <td>
                  <a
                    href={`https://www.strava.com/activities/${activity.activityId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neu-link neu-accent-text inline-flex items-center gap-1 text-xs"
                  >
                    View
                    <SquareArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
        <p className="text-xs neu-muted">Last {activities.length} Activities</p>
        <div className="flex items-center gap-3">
          <span className="text-xs neu-muted">
            Page {safePage + 1} of {pageCount}
          </span>
          <button
            type="button"
            className="neu-btn px-3 py-1.5"
            onClick={() => setPage(safePage - 1)}
            disabled={safePage === 0}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="neu-btn px-3 py-1.5"
            onClick={() => setPage(safePage + 1)}
            disabled={safePage >= pageCount - 1}
            aria-label="Next page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface NeuPreviewProps {
  activities: ProcessedActivity[];
  isLiveData: boolean;
}

export function NeuPreview({ activities, isLiveData }: NeuPreviewProps) {
  // Dark by default — neumorphism holds up better on a dark surface, and the
  // warm light mode is the variant worth checking deliberately.
  const [dark, setDark] = useState(true);

  const totals = useMemo(() => {
    const km = activities.reduce((sum, a) => sum + a.distance, 0) / 1000;
    const seconds = activities.reduce((sum, a) => sum + a.moving_time, 0);
    const types = new Set(activities.map((a) => a.type));
    return {
      count: activities.length,
      km: km.toFixed(0),
      hours: Math.round(seconds / 3600),
      types: types.size,
    };
  }, [activities]);

  return (
    <div className={`neu ${dark ? "neu-dark" : ""}`}>
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 sm:py-12 space-y-5">
        {/* Header */}
        <header className="neu-raised p-5 sm:p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="neu-inset w-14 h-14 grid place-items-center shrink-0">
              <User className="w-6 h-6 neu-accent-text" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">{profile.name}</h1>
              <p className="text-sm neu-muted">{profile.role}</p>
              <p className="text-xs neu-muted flex items-center gap-1.5 mt-1">
                <MapPin className="w-3 h-3" />
                {profile.location}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            className="neu-btn px-4 py-2.5 text-xs flex items-center gap-2"
            aria-pressed={dark}
          >
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {dark ? "Warm light" : "Dark"}
          </button>
        </header>

        {/* About + Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <section className="neu-raised p-5 sm:p-6 lg:col-span-3">
            <SectionHeader icon={<User className="w-4 h-4" />} title="About" index="01" />
            <div className="neu-inset p-4">
              <p className="text-sm leading-relaxed neu-muted">{aboutText}</p>
            </div>
          </section>

          <section className="neu-raised p-5 sm:p-6 lg:col-span-2">
            <SectionHeader icon={<Briefcase className="w-4 h-4" />} title="Experience" index="02" />
            <div className="space-y-3">
              {experiences.slice(0, 3).map((exp) => (
                <div key={`${exp.company}-${exp.start}`} className="neu-inset p-4">
                  <p className="text-sm font-bold">{exp.title}</p>
                  <p className="text-xs neu-accent-text mt-0.5">{exp.company}</p>
                  <p className="text-xs neu-muted mt-1">
                    {exp.start} — {exp.end}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Tech stack + Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <section className="neu-raised p-5 sm:p-6">
            <SectionHeader icon={<Layers className="w-4 h-4" />} title="Tech Stack" index="03" />
            <div className="space-y-4">
              {techCategories.map(({ label, items }) => (
                <div key={label}>
                  <h3 className="text-xs font-semibold neu-muted mb-2.5 uppercase tracking-wide">
                    {label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((tech) => (
                      <span key={tech} className="neu-chip neu-chip-interactive">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="neu-raised p-5 sm:p-6">
            <SectionHeader icon={<FolderGit2 className="w-4 h-4" />} title="Projects" index="04" />
            <div className="space-y-3">
              {sampleRepos.map((repo) => (
                <div key={repo.name} className="neu-raised-sm neu-hover p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold">{repo.displayName}</p>
                    <div className="flex items-center gap-3 text-xs neu-muted shrink-0">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs neu-muted mt-1.5 leading-relaxed">
                    {repo.description}
                  </p>
                  <span className="neu-chip inline-block mt-3">{repo.language}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Off Keyboard — real Strava activities */}
        <section className="neu-raised p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <SectionHeader icon={<Activity className="w-4 h-4" />} title="Off Keyboard" index="05" />
            <span className="neu-chip text-[0.7rem]">
              {isLiveData ? "live Strava data" : "sample data — API unavailable"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="neu-inset p-4 text-center">
              <p className="neu-stat">{totals.count}</p>
              <p className="neu-label mt-1.5">Activities</p>
            </div>
            <div className="neu-inset p-4 text-center">
              <p className="neu-stat">{totals.km}</p>
              <p className="neu-label mt-1.5">Total km</p>
            </div>
            <div className="neu-inset p-4 text-center">
              <p className="neu-stat">{totals.hours}</p>
              <p className="neu-label mt-1.5">Hours moving</p>
            </div>
            <div className="neu-inset p-4 text-center">
              <p className="neu-stat">{totals.types}</p>
              <p className="neu-label mt-1.5">Activity types</p>
            </div>
          </div>

          <StravaTable activities={activities} />
        </section>

        {/* Blog */}
        <section className="neu-raised p-5 sm:p-6">
          <SectionHeader icon={<BookOpen className="w-4 h-4" />} title="Tech Blog" index="06" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {samplePosts.map((post) => (
              <a
                key={post.title}
                href="#"
                className="neu-btn block p-4 no-underline"
                onClick={(e) => e.preventDefault()}
              >
                <p className="text-sm font-semibold leading-snug">{post.title}</p>
                <p className="text-xs neu-muted mt-1.5">{post.date}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Connect + Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <section className="neu-raised p-5 sm:p-6 lg:col-span-2">
            <SectionHeader icon={<Link2 className="w-4 h-4" />} title="Connect" index="07" />
            <div className="flex flex-wrap gap-3">
              {["GitHub", "LinkedIn", "Email", "Strava"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="neu-icon-btn"
                  aria-label={label}
                  title={label}
                >
                  <Link2 className="w-4 h-4" />
                </button>
              ))}
            </div>
            <div className="neu-divider my-5" />
            <p className="text-xs neu-muted leading-relaxed">
              Buttons press inward on click — the one interaction neumorphism
              does better than flat design.
            </p>
          </section>

          <section className="neu-raised p-5 sm:p-6 lg:col-span-4">
            <SectionHeader icon={<Award className="w-4 h-4" />} title="Certifications" index="08" />
            <div className="space-y-3">
              {sampleCerts.map((cert) => (
                <div key={cert.name} className="neu-inset p-4 flex items-center gap-4">
                  <div className="neu-raised-sm w-10 h-10 grid place-items-center shrink-0">
                    <Award className="w-4 h-4 neu-accent-text" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">{cert.name}</p>
                    <p className="text-xs neu-muted mt-0.5">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Reference */}
        <section className="neu-raised p-5 sm:p-6">
          <SectionHeader icon={<Layers className="w-4 h-4" />} title="Surface Reference" index="09" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="neu-raised p-4 text-center">
              <p className="text-xs font-bold mb-1">.neu-raised</p>
              <p className="text-xs neu-muted">Cards, top-level surfaces</p>
            </div>
            <div className="neu-inset p-4 text-center">
              <p className="text-xs font-bold mb-1">.neu-inset</p>
              <p className="text-xs neu-muted">Content wells, table bodies</p>
            </div>
            <button type="button" className="neu-btn p-4 text-center w-full">
              <p className="text-xs font-bold mb-1">.neu-btn</p>
              <p className="text-xs neu-muted">Click to see the press state</p>
            </button>
          </div>
          <div className="neu-divider my-5" />
          <p className="text-xs neu-muted leading-relaxed">
            Preview only — scoped under <code className="neu-accent-text">.neu</code> in{" "}
            <code className="neu-accent-text">src/app/theme-neu/neu.css</code>. No existing
            component or global style was changed.
          </p>
        </section>
      </div>
    </div>
  );
}
