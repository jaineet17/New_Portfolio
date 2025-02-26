import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaBuilding, FaCalendar } from 'react-icons/fa';
import { Mission } from '../../types';
import { useSound } from '../../hooks/useSound';

interface MissionCardProps {
  mission: Mission;
  index: number;
}

export default function MissionCard({ mission, index }: MissionCardProps) {
  const { playSound } = useSound();

  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-lg 
                 border border-transparent bg-gray-800/50 backdrop-blur-sm
                 transition-all hover:border-neon-blue"
    >
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
        <div 
          className="h-full w-full bg-cover bg-center transition-transform 
                     duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url(/images/projects/${mission.id}.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 
                       via-gray-900/50 to-transparent" />
        
        {/* Difficulty Indicator */}
        <div className="absolute right-4 top-4 z-10 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i < mission.difficulty ? 'bg-neon-blue' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h3 className="mb-2 truncate font-orbitron text-lg text-white 
                     transition-colors group-hover:text-neon-blue sm:text-xl">
          {mission.title}
        </h3>

        {mission.category === 'professional' && (
          <div className="mb-4 flex flex-col gap-2 text-sm text-gray-400 
                       sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center">
              <FaBuilding className="mr-2" />
              <span className="truncate">{mission.company}</span>
            </div>
            <div className="flex items-center">
              <FaCalendar className="mr-2" />
              {mission.date}
            </div>
          </div>
        )}

        <p className="mb-4 line-clamp-3 text-sm text-gray-400 sm:text-base">
          {mission.objective}
        </p>

        {/* Tools */}
        <div className="mb-4 flex flex-wrap gap-2">
          {mission.tools.map((tool) => (
            <span
              key={tool.name}
              className="rounded-full px-2 py-1 text-xs sm:px-3 sm:text-sm"
              style={{ 
                backgroundColor: `${tool.color}20`,
                color: tool.color 
              }}
            >
              {tool.name}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-auto flex space-x-4">
          {mission.githubUrl && (
            <a
              href={mission.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-neon-blue"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
            >
              <FaGithub size={20} />
            </a>
          )}
          {mission.liveUrl && (
            <a
              href={mission.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-neon-blue"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
            >
              <FaExternalLinkAlt size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
} 
