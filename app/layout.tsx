import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SUMG Records — Solounity Music Group",
  description:
    "Official site of SOLOUNITY Music Group (SUMG Records): artists, releases, videos, merch, and ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f4f4f1]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
