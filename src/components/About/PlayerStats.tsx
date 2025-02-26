import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { profileData } from '../../data/profile';

interface SkillCategory {
  name: string;
  skills: string[];
  color: string;
  icon?: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages & Frameworks",
    skills: [...profileData.skills.languages, ...profileData.skills.frameworks],
    color: "#61DAFB",
    icon: "🔧"
  },
  {
    name: "Data Tools",
    skills: profileData.skills.dataTools,
    color: "#00FFEE",
    icon: "🔮"
  },
  {
    name: "Technologies",
    skills: profileData.skills.technologies,
    color: "#FF3366",
    icon: "⚡"
  }
];

export default function PlayerStats() {
  return (
    <div className="space-y-8">
      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: categoryIndex * 0.2 }}
          className="relative"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{category.icon}</span>
            <h3 className="text-lg font-orbitron" style={{ color: category.color }}>
              {category.name}
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {category.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (categoryIndex * 0.2) + (index * 0.1) }}
                className="bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm
                         border border-transparent hover:border-neon-blue
                         transition-all group relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,255,238,0.1)] to-transparent
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="relative flex items-center justify-between">
                  <span className="font-orbitron text-sm group-hover:text-neon-blue truncate pr-2">
                    {skill}
                  </span>
                  <div className="flex space-x-1 shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-3 h-3 ${
                          i < 4 ? 'text-neon-blue' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
} 
