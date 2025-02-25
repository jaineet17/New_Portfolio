import { useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { soundManager } from '../utils/SoundManager';
import { SoundType } from '../types';

export function useSound() {
  const { isSoundEnabled } = useGame();

  const playSound = useCallback((type: SoundType) => {
    if (isSoundEnabled) {
      soundManager.play(type);
    }
  }, [isSoundEnabled]);

  return { playSound };
} 