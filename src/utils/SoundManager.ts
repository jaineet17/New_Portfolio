import { Howl } from 'howler';
import { SOUND_CONFIG } from '../constants/config';

class SoundManager {
  private sounds: Record<string, Howl>;
  private loaded: boolean;

  constructor() {
    this.sounds = {
      hover: new Howl({ src: ['/sounds/hover.mp3'], ...SOUND_CONFIG.hover }),
      click: new Howl({ src: ['/sounds/click.mp3'], ...SOUND_CONFIG.click }),
      error: new Howl({ src: ['/sounds/error.mp3'], ...SOUND_CONFIG.error }),
      success: new Howl({ src: ['/sounds/success.mp3'], ...SOUND_CONFIG.success }),
      transition: new Howl({ src: ['/sounds/transition.mp3'], ...SOUND_CONFIG.transition }),
    };
    this.loaded = false;
  }

  async loadSounds(): Promise<void> {
    if (this.loaded) return;

    const loadPromises = Object.values(this.sounds).map(
      sound => new Promise<void>((resolve) => {
        sound.once('load', () => resolve());
        sound.once('loaderror', () => resolve()); // Fallback if sound fails to load
      })
    );

    await Promise.all(loadPromises);
    this.loaded = true;
  }

  play(soundName: string) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].play();
    }
  }

  stop(soundName: string) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].stop();
    }
  }
}

export const soundManager = new SoundManager(); 