"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function RedirectToHome() {
  const router = useRouter();

  useEffect(() => {
    // replace, not push, so the back button skips this stub.
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">
        The profile moved to the homepage.{" "}
        <Link
          href="/"
          className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >
          Go there now
        </Link>
        .
      </p>
    </div>
  );
}
