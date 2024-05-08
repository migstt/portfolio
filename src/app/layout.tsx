import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import NavBar from "./components/client/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "miguel.dev",
  description: "Created by migstt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <header>
            <NavBar />
          </header>
          <main>
            {children}
          </main>
          <footer>

          </footer>
        </Providers>  
      </body>
    </html>
  );
}