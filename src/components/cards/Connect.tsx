"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Socials } from "@/components/general/Socials";
import { useState } from "react";

export function Connect() {
  const email = "mft.trinidad@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Connect
        </CardTitle>

        <button
          type="button"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="text-xs font-medium leading-none">
            {copied ? "Copied" : "Copy email"}
          </span>
        </button>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          value={email}
          readOnly
          className="bg-muted text-center cursor-text text-sm"
        />
        <Socials />
      </CardContent>
    </Card>
  );
}
