import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';

interface TerminalInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  multiline?: boolean;
  type?: string;
  required?: boolean;
  error?: string;
}

export default function TerminalInput({ 
  label, 
  value, 
  onChange, 
  onEnter,
  multiline,
  type = 'text',
  required = false,
  error
}: TerminalInputProps) {
  const { playSound } = useSound();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    playSound('click');
    if (e.key === 'Enter' && !multiline && onEnter) {
      onEnter();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  if (multiline) {
    return (
      <div className="space-y-1">
        <div 
          className={`bg-gray-900 p-4 rounded-lg border ${error ? 'border-red-500' : 'border-neon-blue'} cursor-text`}
          onClick={() => setIsFocused(true)}
        >
          <div className="flex items-center gap-2 text-neon-blue mb-1">
            <span>{'>'}</span>
            <span>{label}</span>
            {required && <span className="text-red-500">*</span>}
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: isFocused ? 1 : 0.7 }}
          >
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={value}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent text-white focus:outline-none resize-none"
              rows={4}
            />
          </motion.div>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm pl-4"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div 
        className={`bg-gray-900 p-4 rounded-lg border ${error ? 'border-red-500' : 'border-neon-blue'} cursor-text`}
        onClick={() => setIsFocused(true)}
      >
        <div className="flex items-center gap-2 text-neon-blue mb-1">
          <span>{'>'}</span>
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </div>
        <motion.div
          initial={false}
          animate={{ opacity: isFocused ? 1 : 0.7 }}
        >
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={value}
            type={type}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent text-white focus:outline-none"
          />
        </motion.div>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm pl-4"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
