import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/metadata";
import { RedirectToHome } from "./RedirectToHome";

/*
 * The profile now lives at "/". This stub keeps old links and bookmarks to
 * /profile working by bouncing them to the homepage.
 *
 * next.config.ts uses output: "export", so there is no server to issue a 301 —
 * the redirect has to happen in the browser.
 */

export const metadata: Metadata = {
  title: `Profile | ${SITE_CONFIG.name}`,
  description: SITE_CONFIG.description,
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_CONFIG.url}/` },
};

export default function ProfileRedirect() {
  return <RedirectToHome />;
}
