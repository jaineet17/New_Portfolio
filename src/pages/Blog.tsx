import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTag } from 'react-icons/fa';
import PageTransition from '../components/UI/PageTransition';
import { useSound } from '../hooks/useSound';
import { blogPosts } from '../data/intel';
import BlogCard from '../components/Blog/BlogCard';

export default function Blog() {
  const { playSound } = useSound();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <PageTransition>
      <div className="min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-orbitron mb-4 text-gradient">
              Intelligence Database
            </h1>
            <p className="text-gray-400">Technical insights and research findings</p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search intelligence files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/50 border border-neon-blue rounded-lg px-4 py-3 pl-12
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-neon-blue/50 backdrop-blur-sm"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    playSound('click');
                    setSelectedTag(selectedTag === tag ? null : tag);
                  }}
                  onMouseEnter={() => playSound('hover')}
                  className={`px-3 py-1 rounded-full text-sm flex items-center
                           transition-all ${
                    selectedTag === tag
                      ? 'bg-neon-blue text-gray-900'
                      : 'bg-gray-800/50 text-gray-400 hover:text-neon-blue'
                  }`}
                >
                  <FaTag className="mr-2" />
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
} 
