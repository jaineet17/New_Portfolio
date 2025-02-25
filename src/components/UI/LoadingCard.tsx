import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingCard() {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-800/50 overflow-hidden">
      <motion.div
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          transition: { 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="aspect-video bg-gray-700"
      />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-700 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-gray-700 rounded-full" />
          <div className="h-6 w-20 bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
} 