import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "College Nexus | KGEC Collegiate Intranet & Academic Portal",
  description:
    "The official, authenticated digital intranet for Kalyani Government Engineering College. Seamlessly integrating the verified Academic Vault, The Board notices, private Lost & Found recovery, and student peer marketplace.",
  keywords: [
    "College Nexus",
    "KGEC",
    "Kalyani Government Engineering College",
    "Academic Vault",
    "PYQ",
    "Engineering Notes",
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
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#f7f5ef] text-[#16211a] antialiased selection:bg-[#c79e4d] selection:text-[#0b1510]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
