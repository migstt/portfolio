import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

// Fun page, so keep it out of search results.
export const metadata: Metadata = {
  ...createMetadata({
    title: "Terminal",
    description: "A terminal-style page to browse my portfolio with commands.",
    path: "/terminal",
  }),
  robots: { index: false, follow: true },
};

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
