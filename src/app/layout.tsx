import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { SITE_CONFIG, ENV_CONFIG } from "@/config";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SplashWrapper from "@/components/SplashWrapper";
import FloatingElements from "@/components/background/FloatingElements";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
  }
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
        {ENV_CONFIG.analytics.enabled && (
          <GoogleAnalytics gaId={ENV_CONFIG.analytics.google || ""}/>
        )}
        <SpeedInsights />
        <div id="background-container" className="h-[100dvh] w-[100dvw] bg-enhanced">
          <FloatingElements />
          <div className="h-full w-full overflow-scroll custom-scrollbar">
           <SplashWrapper>{children}</SplashWrapper>
          </div>
        </div>
      </body>
    </html>
  );
}
