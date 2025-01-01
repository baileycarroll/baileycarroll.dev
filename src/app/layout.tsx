import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Image from "next/image";
import Rose from "@/assets/rose_shield.svg";
import Header from "@/components/layout/header";

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
        <div id="background-container" className="h-[100dvh] w-[100dvw]">
          <Header />
          <Image
            src={Rose}
            alt="background"
            layout="fill"
            objectFit="contain"
            className={"-z-10 absolute"}
            id="rose"
          />
          <div className="h-full w-full overflow-scroll">{children}</div>
        </div>
      </body>
    </html>
  );
}
