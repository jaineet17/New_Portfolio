import { motion } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useGame } from '../../context/GameContext';

export default function SoundToggle() {
  const { isSoundEnabled, toggleSound } = useGame();

  return (
    <motion.button
      className="fixed bottom-4 right-4 p-3 bg-gray-800 rounded-full text-neon-blue
                hover:bg-gray-700 transition-colors z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleSound}
    >
      {isSoundEnabled ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
    </motion.button>
  );
} 
