import { motion } from 'framer-motion';
import LoadingSpinner from '../UI/LoadingSpinner';

interface SubmitButtonProps {
  isSubmitting: boolean;
  onClick: () => void;
}

export default function SubmitButton({ isSubmitting, onClick }: SubmitButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      onClick={onClick}
      disabled={isSubmitting}
      className={`w-full bg-neon-blue text-gray-900 py-3 rounded-lg font-orbitron 
                transition-colors ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:bg-blue-400'}`}
    >
      <div className="flex items-center justify-center gap-3">
        {isSubmitting && <LoadingSpinner size={20} color="#1a1a1a" />}
        <span>{isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}</span>
      </div>
    </motion.button>
  );
} 
