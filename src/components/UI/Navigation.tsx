import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaGamepad, FaEnvelope } from 'react-icons/fa';
import { useSound } from '../../hooks/useSound';

const navItems = [
  { id: 'home', label: 'Main Menu', path: '/', icon: FaHome },
  { id: 'about', label: 'Profile', path: '/about', icon: FaUser },
  { id: 'projects', label: 'Missions', path: '/projects', icon: FaGamepad },
  { id: 'contact', label: 'Contact HQ', path: '/contact', icon: FaEnvelope },
];

export default function Navigation() {
  const { playSound } = useSound();
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm z-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-2 font-orbitron text-sm
                          transition-colors hover:text-neon-blue
                          ${location.pathname === item.path ? 'text-neon-blue' : 'text-gray-300'}`}
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
              >
                <item.icon />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 