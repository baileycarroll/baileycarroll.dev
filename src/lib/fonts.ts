import { Inter, JetBrains_Mono } from "next/font/google";
import { Cinzel } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-family-jetbrains",
  display: "swap",
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-family-cinzel",
  display: "swap",
});
