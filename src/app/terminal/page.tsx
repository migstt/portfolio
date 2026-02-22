"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { aboutText, experiences, techCategories } from "@/data/portfolioData";
import { SquareTerminal } from "lucide-react";

type Line = { type: "input" | "output"; text: string };

const COMMANDS: Record<string, string> = {
  help: "List available commands",
  about: "About me",
  "exp|experience": "Work experience",
  "ts|techstack": "Technologies I use",
  socials: "Social links",
  clear: "Clear terminal",
  "exit|home": "Go back to homepage",
};

const ALIASES: Record<string, string> = {
  exp: "experience",
  ts: "techstack",
  exit: "home",
};

function getHelpOutput(): string[] {
  return [
    "Available commands:",
    "",
    ...Object.entries(COMMANDS).map(
      ([name, desc]) => `  ${name.padEnd(16)} ${desc}`
    ),
  ];
}

function processCommand(cmd: string): string[] {
  const raw = cmd.trim().toLowerCase();
  const command = ALIASES[raw] || raw;

  if (command === "help") {
    return getHelpOutput();
  }

  if (command === "about") {
    return [aboutText];
  }

  if (command === "experience") {
    const lines: string[] = [];
    experiences.forEach((exp, i) => {
      if (i > 0) lines.push("");
      lines.push(`${exp.title} @ ${exp.company}`);
      lines.push(`${exp.startMonth} - ${exp.endMonth} | ${exp.location}`);
    });
    return lines;
  }

  if (command === "techstack") {
    const lines: string[] = [];
    techCategories.forEach((cat, i) => {
      if (i > 0) lines.push("");
      lines.push(`${cat.label}:`);
      lines.push(`  ${cat.items.join(", ")}`);
    });
    return lines;
  }

  if (command === "socials") {
    return [
      "  email        mft.trinidad@gmail.com",
      "  linkedin     linkedin.com/in/mfttrinidad",
      "  github       github.com/migstt",
      "  strava       strava.com/athletes/115133923",
    ];
  }

  if (command === "") {
    return [];
  }

  const allCommands = [...Object.keys(ALIASES), "help", "about", "experience", "techstack", "socials", "clear", "home"];
  const closest = allCommands
    .map((c) => ({ cmd: c, dist: levenshtein(command, c) }))
    .sort((a, b) => a.dist - b.dist)[0];

  if (closest && closest.dist <= 3) {
    return [
      `command not found: ${cmd.trim()}`,
      `did you mean: ${closest.cmd}? (y/yes to confirm)`,
    ];
  }

  return [`command not found: ${cmd.trim()}`];
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

export default function TerminalPage() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Welcome to miguel's terminal." },
    { type: "output", text: "" },
    ...getHelpOutput().map((text) => ({ type: "output" as const, text })),
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [lastSuggestion, setLastSuggestion] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "l") {
        e.preventDefault();
        setLines([]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const cmd = input;
    const trimmed = cmd.trim().toLowerCase();

    // Handle y/yes to confirm last suggestion
    if ((trimmed === "y" || trimmed === "yes") && lastSuggestion) {
      const suggested = lastSuggestion;
      setLastSuggestion(null);
      setInput("");

      const resolvedSuggestion = ALIASES[suggested] || suggested;

      if (resolvedSuggestion === "clear") {
        setLines((prev) => [...prev, { type: "input", text: cmd }]);
        setLines([]);
        return;
      }

      if (resolvedSuggestion === "home") {
        setLines((prev) => [...prev, { type: "input", text: cmd }]);
        router.push("/");
        return;
      }

      const output = processCommand(suggested);
      setLines((prev) => [
        ...prev,
        { type: "input", text: cmd },
        ...output.map((text) => ({ type: "output" as const, text })),
        { type: "output", text: "" },
      ]);
      return;
    }

    const resolved = ALIASES[trimmed] || trimmed;

    if (resolved === "clear") {
      setLines([]);
      setInput("");
      setLastSuggestion(null);
      return;
    }

    if (resolved === "home") {
      router.push("/");
      return;
    }

    const output = processCommand(cmd);

    // Check if output contains a suggestion
    const suggestionLine = output.find((l) => l.startsWith("did you mean:"));
    if (suggestionLine) {
      const match = suggestionLine.match(/did you mean: (\w+)\?/);
      setLastSuggestion(match ? match[1] : null);
    } else {
      setLastSuggestion(null);
    }

    setLines((prev) => [
      ...prev,
      { type: "input", text: cmd },
      ...output.map((text) => ({ type: "output" as const, text })),
      { type: "output", text: "" },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl h-[95vh] sm:h-[85vh] flex flex-col rounded-xl border overflow-hidden shadow-sm">
        {/* Title bar */}
        <div className="bg-muted px-4 py-2 border-b border-border flex items-center gap-2 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground ml-1">
            <SquareTerminal className="w-3.5 h-3.5" />
            guest@miguel: ~
          </span>
        </div>

        {/* Output area */}
        <div
          className="flex-1 overflow-y-auto p-3 sm:p-5 font-mono text-sm sm:text-base bg-card"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line.type === "input" ? (
                <p>
                  <span className="text-primary">guest@miguel</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-muted-foreground">$ </span>
                  <span className="text-foreground">{line.text}</span>
                </p>
              ) : (
                <p className="text-muted-foreground">{line.text || "\u00A0"}</p>
              )}
            </div>
          ))}

          {/* Active prompt */}
          <div className="flex items-center">
            <span className="text-primary">guest@miguel</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-muted-foreground">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSubmit}
              className="flex-1 bg-transparent outline-none text-foreground font-mono text-sm sm:text-base caret-primary"
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
