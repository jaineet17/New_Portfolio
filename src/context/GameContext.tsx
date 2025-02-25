import React, { createContext, useContext, useState } from 'react';
import { Theme } from '../types';
import { THEMES } from '../constants/config';

interface GameContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  currentTheme: Theme;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [currentTheme] = useState<Theme>(THEMES.cyber);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleSound = () => setIsSoundEnabled(prev => !prev);

  return (
    <GameContext.Provider value={{
      isDarkMode,
      toggleDarkMode,
      isSoundEnabled,
      toggleSound,
      currentTheme,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 