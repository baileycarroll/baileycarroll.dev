class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private isEnabled: boolean = false; // Disabled by default

  async init() {
    // Only initialize if user has enabled sounds
    if (!this.isEnabled) return;

    this.audioContext = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    await this.loadSounds();
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (enabled && !this.audioContext) {
      this.init();
    }
  }

  async loadSounds() {
    const soundFiles = {
      "page-turn": "/sounds/page-turn.mp3",
      "tab-click": "/sounds/tab-click.mp3",
      "journal-open": "/sounds/journal-open.mp3",
      "command-palette": "/sounds/command-palette.mp3",
    };

    for (const [name, url] of Object.entries(soundFiles)) {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext!.decodeAudioData(
          arrayBuffer
        );
        this.sounds.set(name, audioBuffer);
      } catch {
        console.warn(`Failed to load sound: ${name}`);
      }
    }
  }

  playSound(name: string) {
    if (!this.isEnabled || !this.audioContext || !this.sounds.has(name)) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = this.sounds.get(name)!;
    source.connect(this.audioContext.destination);
    source.start(0);
  }
}

export const soundManager = new SoundManager();
