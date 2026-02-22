"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster
        toastOptions={{
          className: "!bg-primary !text-primary-foreground !border-none",
        }}
      />
    </ThemeProvider>
  );
}
