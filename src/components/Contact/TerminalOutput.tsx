import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaInfo } from 'react-icons/fa';

interface TerminalOutputProps {
  messages: string[];
  type: 'success' | 'error' | 'info';
}

export default function TerminalOutput({ messages, type }: TerminalOutputProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-400" />;
      case 'error':
        return <FaExclamationTriangle className="text-red-400" />;
      default:
        return <FaInfo className="text-blue-400" />;
    }
  };

  const getColorClass = () => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-start gap-3 ${getColorClass()} font-mono`}
        >
          <span className="mt-1">{getIcon()}</span>
          <span>{message}</span>
        </motion.div>
      ))}
    </div>
  );
} 