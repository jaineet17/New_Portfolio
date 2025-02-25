import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const objectives = [
  'Create engaging and interactive web experiences',
  'Build scalable and performant applications',
  'Implement cutting-edge technologies',
  'Deliver pixel-perfect UI/UX designs',
  'Write clean, maintainable code',
  'Collaborate effectively with team members',
];

export default function MissionObjectives() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-orbitron text-neon-blue mb-6">Mission Objectives</h2>
      <div className="space-y-4">
        {objectives.map((objective, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3"
          >
            <FaCheckCircle className="text-neon-green mt-1 flex-shrink-0" />
            <span className="text-gray-300">{objective}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 