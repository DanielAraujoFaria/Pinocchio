import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pinocchio",
  description: "App for taking notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased font-sans",
        geistSans.variable,
        geistMono.variable,
        figtree.variable
      )}
    >
      <body className="min-h-full flex flex-col">

        

        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 mx-3">
            <Header />
            {children}
          </main>
        </div>

        <Toaster />
      </body>
    </html>
  );
}