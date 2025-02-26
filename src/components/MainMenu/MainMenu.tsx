import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaGamepad, FaBook, FaEnvelope, FaChevronRight } from 'react-icons/fa';
import { useSound } from '../../hooks/useSound';
import PageTransition from '../UI/PageTransition';

const menuItems = [
  { id: 'about', label: 'Start Game', path: '/about', icon: FaUser },
  { id: 'projects', label: 'Missions', path: '/projects', icon: FaGamepad },
  { id: 'blog', label: 'Intel', path: '/blog', icon: FaBook },
  { id: 'contact', label: 'Contact HQ', path: '/contact', icon: FaEnvelope },
];

export default function MainMenu() {
  const { playSound } = useSound();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const fullText = '> SYSTEM ONLINE_';

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1));
          playSound('hover');
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0));
          playSound('hover');
          break;
        case 'Enter':
          e.preventDefault();
          playSound('click');
          navigate(menuItems[selectedIndex].path);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, navigate, playSound]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {/* Content */}
        <div className="relative z-10 text-center space-y-12">
          {/* Terminal Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-neon-blue text-xl mb-8"
          >
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-orbitron text-gradient"
          >
            Portfolio Terminal
          </motion.h1>

          {/* Menu */}
          <nav className="space-y-4" ref={menuRef} role="menu" aria-label="Main Menu">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`group flex items-center space-x-4 px-8 py-4 bg-gray-800/50 
                           hover:bg-gray-700/50 rounded-lg text-white transition-all
                           backdrop-blur-sm relative overflow-hidden
                           ${selectedIndex === index ? 'ring-2 ring-neon-blue' : ''}`}
                  onMouseEnter={() => {
                    setSelectedIndex(index);
                    playSound('hover');
                  }}
                  onClick={() => playSound('click')}
                  role="menuitem"
                  aria-selected={selectedIndex === index}
                >
                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 to-neon-blue/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Content */}
                  <span className="relative">
                    <item.icon className="text-xl" />
                  </span>
                  <span className="relative font-orbitron text-lg">{item.label}</span>
                  
                  {/* Arrow */}
                  <motion.span
                    className="relative ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: selectedIndex === index ? 5 : 0 }}
                  >
                    <FaChevronRight />
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </PageTransition>
  );
} 
