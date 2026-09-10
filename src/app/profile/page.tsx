import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/metadata";
import { RedirectToHome } from "./RedirectToHome";

export const metadata: Metadata = {
  title: `Profile | ${SITE_CONFIG.name}`,
  description: SITE_CONFIG.description,
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_CONFIG.url}/` },
};

export default function ProfileRedirect() {
  return <RedirectToHome />;
}
