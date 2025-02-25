import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import PageTransition from '../components/UI/PageTransition';
import { useSound } from '../hooks/useSound';

export default function NotFound() {
  const { playSound } = useSound();

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-8">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-orbitron text-neon-blue"
          >
            404
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            MISSION NOT FOUND
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon-blue text-gray-900 rounded-lg
                       font-orbitron hover:bg-blue-400 transition-colors"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
            >
              <FaHome />
              <span>Return to Base</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
} 