"use client";

import { TerminalCard, TerminalCardContent } from "@/components/ui/terminal-card";
import { Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Socials } from "@/components/general/Socials";
import { toast } from "sonner";
import { useState } from "react";

export function Connect() {
  const email = "mft.trinidad@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast("Email copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <TerminalCard
      title="Connect"
      icon={<Globe className="w-3.5 h-3.5" />}
      headerRight={
        <button
          type="button"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="text-xs font-medium leading-none">
            {copied ? "Copied" : "Copy email"}
          </span>
        </button>
      }
      className="h-full flex flex-col"
    >
      <TerminalCardContent className="space-y-4">
        <Input
          value={email}
          readOnly
          className="bg-muted text-center cursor-text text-sm"
        />
        <Socials />
      </TerminalCardContent>
    </TerminalCard>
  );
}
