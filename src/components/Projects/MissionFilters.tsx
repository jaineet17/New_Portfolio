import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';

type Category = 'all' | 'academic' | 'professional';

interface MissionFiltersProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
}

export default function MissionFilters({ 
  category, 
  onCategoryChange 
}: MissionFiltersProps) {
  const { playSound } = useSound();

  const categories: Category[] = ['all', 'academic', 'professional'];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8 flex flex-wrap justify-center gap-4"
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            playSound('click');
            onCategoryChange(cat);
          }}
          onMouseEnter={() => playSound('hover')}
          className={`rounded-full px-6 py-2 font-orbitron text-sm 
                   transition-all ${
            category === cat 
              ? 'bg-neon-blue text-gray-900' 
              : 'bg-gray-800/50 text-gray-400 hover:text-neon-blue'
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </motion.div>
  );
} 
