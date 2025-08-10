"use client";

import Image from "next/image";

import Headshot from "@/assets/Headshot.png";

export function ProfileSection() {
  return (
    <div className="profile-section bg-leather-800 rounded-xl p-6 border border-leather-600">
      {/* Character Avatar */}
      <div className="character-avatar relative mb-4 flex justify-center">
        <div className="relative">
          <Image
            src={Headshot}
            alt="Bailey Carroll - Developer Character"
            className="rounded-full ring-4 ring-septim-400 shadow-2xl"
            width={120}
            height={120}
          />
          {/* Level Badge */}
          <div className="level-badge absolute -bottom-2 -right-2 bg-septim-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
            42
          </div>
        </div>
      </div>

      {/* Character Info */}
      <div className="character-info text-center">
        <h2 className="character-name text-2xl font-bold text-septim-400 mb-2">
          Bailey Carroll
        </h2>
        <p className="character-title text-leather-200 mb-4">
          Full-Stack Developer
        </p>
        <p className="character-description text-sm text-leather-300 leading-relaxed">
          Making my mark on the world, one line of code at a time. When not
          immersed in code, I can be found at the gym, walking a beach, or in a
          cozy cafe.
        </p>
      </div>

      {/* Character Tags */}
      <div className="character-tags flex flex-wrap gap-2 mt-4 justify-center">
        <span className="tag bg-nature-800 text-nature-200 px-3 py-1 rounded-full text-xs font-medium border border-nature-600">
          React Master
        </span>
        <span className="tag bg-frost-800 text-frost-200 px-3 py-1 rounded-full text-xs font-medium border border-frost-600">
          TypeScript Expert
        </span>
        <span className="tag bg-dragon-800 text-dragon-200 px-3 py-1 rounded-full text-xs font-medium border border-dragon-600">
          Problem Solver
        </span>
        <span className="tag bg-septim-800 text-septim-200 px-3 py-1 rounded-full text-xs font-medium border border-septim-600">
          Team Leader
        </span>
      </div>

      {/* Character Stats Summary */}
      <div className="character-stats-summary mt-6 pt-4 border-t border-leather-600/50">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="stat-item">
            <div className="stat-value text-xl font-bold text-septim-400">
              5
            </div>
            <div className="stat-label text-xs text-leather-400">
              Years Experience
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-value text-xl font-bold text-nature-400">
              25
            </div>
            <div className="stat-label text-xs text-leather-400">
              Projects Completed
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-value text-xl font-bold text-frost-400">
              15
            </div>
            <div className="stat-label text-xs text-leather-400">
              Technologies
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-value text-xl font-bold text-dragon-400">
              500K
            </div>
            <div className="stat-label text-xs text-leather-400">
              Lines of Code
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
