"use client";
import React from "react";
import { HeaderJournalNavigation } from "@/components/navigation/HeaderJournalNavigation";
import { MobileJournalNavigation } from "@/components/navigation/JournalNavigation";

export default function Header() {
  return (
    <header className="pointer-events-none z-50 w-full bg-transparent fixed top-0 left-0 right-0">
      <div className="pointer-events-auto w-full bg-leather-950/95 backdrop-blur-sm border-b border-leather-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-septim-500 rounded-lg flex items-center justify-center">
                <span className="text-leather-950 font-bold text-sm">RS</span>
              </div>
              <span className="text-leather-100 font-semibold text-lg hidden sm:block">
                Rose Shield
              </span>
            </div>

            {/* Desktop Navigation */}
            <HeaderJournalNavigation className="hidden md:flex" />

            {/* Mobile Navigation */}
            <MobileJournalNavigation className="md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}
