"use client";

import { useState } from "react";
import {
  JournalNavigation,
  MobileJournalNavigation,
} from "@/components/navigation/JournalNavigation";
import { SoundSettings } from "@/components/sound/SoundSettings";

export function JournalShowcase() {
  const [showMobile, setShowMobile] = useState(false);

  return (
    <div className="journal-showcase p-8 bg-leather-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-septim-400 mb-4">
            🗡️ Elder Scrolls Journal Navigation
          </h1>
          <p className="text-leather-200 text-lg">
            Immersive gaming-inspired navigation system
          </p>
        </div>

        {/* Desktop Navigation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-nature-400 mb-4">
            Desktop Journal
          </h2>
          <div className="flex justify-center">
            <JournalNavigation />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-nature-400 mb-4">
            Mobile Journal
          </h2>
          <div className="flex justify-center">
            <MobileJournalNavigation />
          </div>
        </div>

        {/* Sound Settings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-nature-400 mb-4">
            Sound Settings
          </h2>
          <div className="flex justify-center">
            <SoundSettings />
          </div>
        </div>

        {/* Features List */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-leather-800/50 rounded-lg p-6 border border-leather-600">
            <h3 className="text-xl font-bold text-septim-400 mb-3">
              🎮 Gaming Features
            </h3>
            <ul className="space-y-2 text-leather-200">
              <li>• Elder Scrolls-inspired leather texture design</li>
              <li>• Dynamic completion tracking</li>
              <li>• Adaptive animations based on device capability</li>
              <li>• Optional sound effects (disabled by default)</li>
              <li>• Custom SVG icons with fallback system</li>
            </ul>
          </div>

          <div className="bg-leather-800/50 rounded-lg p-6 border border-leather-600">
            <h3 className="text-xl font-bold text-septim-400 mb-3">
              📱 Mobile Features
            </h3>
            <ul className="space-y-2 text-leather-200">
              <li>• Full-screen immersive overlay</li>
              <li>• Touch-optimized interactions</li>
              <li>• Responsive leather texture backgrounds</li>
              <li>• Smooth page transitions</li>
              <li>• Accessibility compliant</li>
            </ul>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-8 bg-leather-800/30 rounded-lg p-6 border border-leather-600">
          <h3 className="text-xl font-bold text-septim-400 mb-3">
            ⚙️ Technical Implementation
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-leather-300">
            <div>
              <h4 className="font-bold text-nature-400 mb-2">Components</h4>
              <ul className="space-y-1">
                <li>• JournalTabs</li>
                <li>• JournalTab</li>
                <li>• NavigationProgress</li>
                <li>• JournalTabAnimations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-nature-400 mb-2">Libraries</h4>
              <ul className="space-y-1">
                <li>• Framer Motion</li>
                <li>• React Spring</li>
                <li>• Radix UI</li>
                <li>• Next.js 15</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-nature-400 mb-2">Features</h4>
              <ul className="space-y-1">
                <li>• TypeScript</li>
                <li>• Tailwind CSS v4</li>
                <li>• Dark/Light themes</li>
                <li>• Performance optimized</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
