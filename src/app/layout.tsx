import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Splash from "./splash_screen";
import { inter, jetbrainsMono, cinzel } from "@/lib/fonts";

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
    <html lang="en" className="bg-leather-950 text-leather-100">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable} antialiased`}
      >
        {/* Vercel Analytics */}
        <Analytics />
        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-1TGMX650JG" />
        <SpeedInsights />
        <div id="background-container" className="h-dvh w-dvw relative">
          {/* Gaming-themed background */}
          <div className="absolute inset-0 bg-gradient-to-br from-leather-950 via-leather-900 to-leather-950">
            {/* Leather texture overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)
                `,
              }}
            />

            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />

            {/* Ambient lighting effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-septim-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-nature-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative h-full w-full overflow-scroll">
            <Splash>
              <div className="pt-20">{children}</div>
            </Splash>
          </div>
        </div>
      </body>
    </html>
  );
}
