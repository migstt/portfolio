import { LandingCard } from "../ui/LandingCard";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <LandingCard className="p-6 text-center">
      {/* tabular-nums keeps a row of figures aligned across cards */}
      <p className="font-display text-3xl md:text-4xl font-bold tracking-tight tabular-nums">
        {value}
      </p>
      <p className="mt-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </LandingCard>
  );
}
