import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import { profileData } from '../../data/profile';

export default function Education() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-orbitron text-neon-blue mb-6">Education Log</h2>
      
      {profileData.education.map((edu, index) => (
        <motion.div
          key={edu.school}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm
                   border border-transparent hover:border-neon-blue
                   transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-orbitron text-white group-hover:text-neon-blue">
                {edu.school}
              </h3>
              <div className="flex items-center text-gray-400 mt-1">
                <FaMapMarkerAlt className="mr-2" />
                {edu.location}
              </div>
            </div>
            <span className="text-neon-blue font-mono">{edu.date}</span>
          </div>
          
          <p className="text-gray-300 mb-4">{edu.degree}</p>
          
          <div className="space-y-2">
            <h4 className="text-sm font-orbitron text-neon-blue">Key Courses:</h4>
            <div className="flex flex-wrap gap-2">
              {edu.courses.map((course, courseIndex) => (
                <motion.span
                  key={course}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (index * 0.2) + (courseIndex * 0.1) }}
                  className="px-3 py-1 text-sm bg-neon-blue/10 rounded-full text-neon-blue"
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 