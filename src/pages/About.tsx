import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaBook } from 'react-icons/fa';
import PlayerStats from '../components/About/PlayerStats';
import Education from '../components/About/Education';
import PageTransition from '../components/UI/PageTransition';
import { useSound } from '../hooks/useSound';
import { profileData } from '../data/profile';

export default function About() {
  const { playSound } = useSound();

  return (
    <PageTransition>
      <div className="min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section with Glowing Effect */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-16 relative"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-neon-blue/20 blur-3xl rounded-full" />
            
            <h1 className="text-4xl md:text-6xl font-orbitron mb-4 text-gradient relative">
              {profileData.name}
            </h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-neon-blue mb-6 relative"
            >
              {profileData.title}
            </motion.p>

            {/* Contact Info with Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6 mb-8 relative"
            >
              <a
                href={`mailto:${profileData.contact.email}`}
                className="flex items-center text-gray-400 hover:text-neon-blue transition-colors"
                onMouseEnter={() => playSound('hover')}
              >
                <FaEnvelope className="mr-2" />
                {profileData.contact.email}
              </a>
              <span className="flex items-center text-gray-400">
                <FaPhone className="mr-2" />
                {profileData.contact.phone}
              </span>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center space-x-6 relative"
            >
              {profileData.contact.links.map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-neon-blue transition-colors transform hover:scale-110"
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('click')}
                >
                  {name === 'GitHub' ? (
                    <FaGithub size={24} />
                  ) : name === 'arXiv' ? (
                    <FaBook size={24} />
                  ) : name === 'LinkedIn' ? (
                    <FaLinkedin size={24} />
                  ) : null}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Education */}
              <Education />
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Skills */}
              <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm
                          border border-transparent hover:border-neon-blue
                          transition-all group">
                <h2 className="text-2xl font-orbitron text-neon-blue mb-6">Combat Skills</h2>
                <PlayerStats />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
} 
