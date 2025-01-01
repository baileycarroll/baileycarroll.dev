"use client";

import { useState } from "react";
import SplashScreen from "@/components/layout/SplashScreen";
import Header from "@/components/layout/header";

export default function Splash({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSplashComplete, setSplashComplete] = useState(false);
  return (
    <>
      <SplashScreen setIsSplashComplete={setSplashComplete} />
      <Header />
      <main
        className={`overflow-y-scroll transition-all duration-1500 ease-out ${
          isSplashComplete ? "opacity-100" : "opacity-0"
        }`}
        id="main"
      >
        {children}
      </main>
    </>
  );
}
