import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';

interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  technologies: string[];
}

interface InteractiveTimelineProps {
  events: TimelineEvent[];
}

export default function InteractiveTimeline({ events }: InteractiveTimelineProps) {
  const { playSound } = useSound();

  return (
    <div className="space-y-8">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          whileHover={{ x: 10 }}
          onHoverStart={() => playSound('hover')}
          className="relative pl-8 border-l-2 border-neon-blue"
        >
          <div className="absolute left-[-9px] top-0 w-4 h-4 bg-neon-blue rounded-full 
                        transition-transform hover:scale-150 hover:shadow-lg hover:shadow-neon-blue" />
          
          <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-lg font-orbitron text-white">{event.title}</h3>
            <p className="text-neon-blue">{event.date}</p>
            <p className="text-gray-300 mt-2">{event.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {event.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 text-xs rounded-full bg-neon-blue/10 text-neon-blue"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 
