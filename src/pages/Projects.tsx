import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/UI/PageTransition';
import { missions } from '../data/missions';
import MissionCard from '../components/Projects/MissionCard';
import LoadingCard from '../components/UI/LoadingCard';
import MissionFilters from '../components/Projects/MissionFilters';
import type { Category } from '../types';

export default function Projects() {
  const [category, setCategory] = useState<Category>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of images
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredMissions = missions.filter(mission => 
    category === 'all' || mission.category === category
  );

  return (
    <PageTransition>
      <div className="min-h-screen py-20">
        <div className="mx-auto max-w-6xl px-4">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 font-orbitron text-4xl text-gradient md:text-6xl">
              Mission Database
            </h1>
            <p className="text-gray-400">
              Browse completed missions and ongoing operations
            </p>
          </motion.div>

          <MissionFilters 
            category={category} 
            onCategoryChange={setCategory} 
          />

          {/* Missions Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {isLoading
              ? Array(4).fill(0).map((_, i) => <LoadingCard key={i} />)
              : filteredMissions.map((mission, index) => (
                  <MissionCard 
                    key={mission.id} 
                    mission={mission} 
                    index={index} 
                  />
                ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
} 