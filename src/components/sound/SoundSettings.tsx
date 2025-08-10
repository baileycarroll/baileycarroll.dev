"use client";

import { useState } from "react";
import { soundManager } from "@/lib/soundEffects";

export function SoundSettings() {
  const [soundsEnabled, setSoundsEnabled] = useState(false);

  const toggleSounds = () => {
    const newState = !soundsEnabled;
    setSoundsEnabled(newState);
    soundManager.setEnabled(newState);
    localStorage.setItem("journal-sounds-enabled", newState.toString());
  };

  return (
    <button
      onClick={toggleSounds}
      className="sound-toggle flex items-center gap-2 px-3 py-2 rounded-lg bg-leather-700 hover:bg-leather-600 transition-colors"
      aria-label={`${soundsEnabled ? "Disable" : "Enable"} sound effects`}
    >
      <span className="text-lg">{soundsEnabled ? "🔊" : "🔇"}</span>
      <span className="text-sm text-leather-100">Sound Effects</span>
    </button>
  );
}
