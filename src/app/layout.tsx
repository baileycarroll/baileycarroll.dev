import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Image from "next/image";
import Rose from "@/assets/rose_shield.svg";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Splash from "./splash_screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bailey Carroll",
  description: "Making My Mark - One Line of Code at a Time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Vercel Analytics */}
        <Analytics />
        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-1TGMX650JG" />
        <SpeedInsights />
        <div id="background-container" className="h-[100dvh] w-[100dvw]">
          <div className="h-full w-full overflow-scroll">
          {/*  <Splash>{children}</Splash> */}
          </div>
        </div>
      </body>
    </html>
  );
}
