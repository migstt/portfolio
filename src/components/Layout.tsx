import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-5xl sm:px-12 lg:px-20 lg:py-6 p-4">
        {children}
      </main>
    </div>
  );
}
