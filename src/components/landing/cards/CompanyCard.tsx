import Image from "next/image";
import { Company } from "@/data/landingData";
import { LandingCard } from "../ui/LandingCard";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <LandingCard className="p-6 flex flex-col items-center text-center gap-3">
      <Image
        src={company.logo}
        alt={`${company.name} logo`}
        width={48}
        height={48}
        className="rounded-full object-cover"
      />
      <div className="flex flex-col items-center gap-1">
        <span className="font-medium text-sm">{company.name}</span>
        <span className="text-xs font-mono text-muted-foreground">
          {company.period}
        </span>
      </div>
      {company.current && (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          Current
        </span>
      )}
    </LandingCard>
  );
}
