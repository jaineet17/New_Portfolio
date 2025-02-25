import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import Navigation from '../UI/Navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isDarkMode } = useGame();
  const location = useLocation();
  const isMainMenu = location.pathname === '/';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {!isMainMenu && <Navigation />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`container mx-auto px-4 ${!isMainMenu ? 'pt-20' : ''}`}
      >
        {children}
      </motion.div>
    </div>
  );
} 