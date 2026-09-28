import type { Metadata } from "next";
import { Inter, Zilla_Slab } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const zillaSlab = Zilla_Slab({
  variable: "--font-zilla",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "College Nexus | One Campus. One Network. Zero Fragmentation.",
  description:
    "An authenticated collegiate intranet progressive web app for Kalyani Government Engineering College (KGEC). Centralized academic vault, verified lost-and-found recovery, student marketplace, and departmental circulars.",
  keywords: [
    "College Nexus",
    "KGEC",
    "Campus Vault",
    "PYQ",
    "Engineering",
    "Lost and Found",
    "Student Marketplace",
  ],
  authors: [{ name: "Developers Community KGEC" }],
  openGraph: {
    title: "College Nexus — KGEC Intranet Network",
    description: "One Campus. One Network. Zero Fragmentation.",
    url: "https://college-nexus.internal",
    siteName: "College Nexus",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${zillaSlab.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#fbf9f5] text-[#1a1a1a] antialiased selection:bg-[#b93a32] selection:text-white">
        {children}
      </body>
    </html>
  );
}
