import { useEffect, useRef } from 'react';

// Web Audio API based sound effects
class SoundManager {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgMusic: OscillatorNode | null = null;
  private bgMusicGain: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.audioContext.destination);
    }
  }

  playCorrectSound() {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Pleasant chime sound
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.1);

    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }

  playWrongSound() {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Buzzer sound
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, now);
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.2);

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    oscillator.start(now);
    oscillator.stop(now + 0.2);
  }

  playCompleteSound() {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;

    // Triumphant chord
    const frequencies = [523.25, 659.25, 783.99]; // C, E, G
    frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain!);

      oscillator.frequency.setValueAtTime(freq, now + index * 0.1);
      gainNode.gain.setValueAtTime(0.2, now + index * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.8);

      oscillator.start(now + index * 0.1);
      oscillator.stop(now + index * 0.1 + 0.8);
    });
  }

  playMoveSound() {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.frequency.setValueAtTime(300, now);
    gainNode.gain.setValueAtTime(0.05, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    oscillator.start(now);
    oscillator.stop(now + 0.05);
  }

  startBackgroundMusic(level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) {
    this.stopBackgroundMusic();
    // Background music disabled as requested
  }

  stopBackgroundMusic() {
    if ((this as any).bgMusicInterval) {
      clearInterval((this as any).bgMusicInterval);
      (this as any).bgMusicInterval = null;
    }

    if (this.bgMusic && this.bgMusicGain && this.audioContext) {
      const now = this.audioContext.currentTime;
      this.bgMusicGain.gain.linearRampToValueAtTime(0, now + 0.1);
      this.bgMusic.stop(now + 0.1);
      this.bgMusic = null;
      this.bgMusicGain = null;
    }
  }

  setVolume(volume: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }
}

export const soundManager = new SoundManager();

interface SoundManagerComponentProps {
  enabled?: boolean;
}

export function SoundManagerComponent({ enabled = true }: SoundManagerComponentProps) {
  useEffect(() => {
    soundManager.setVolume(enabled ? 0.3 : 0);
  }, [enabled]);

  return null;
}
