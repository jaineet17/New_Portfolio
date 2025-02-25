import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FaClock, FaTag, FaArrowLeft } from 'react-icons/fa';
import { blogPosts } from '../../data/intel';
import PageTransition from '../UI/PageTransition';
import { useSound } from '../../hooks/useSound';

export default function BlogPost() {
  const { id } = useParams();
  const { playSound } = useSound();
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <PageTransition>
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center text-neon-blue hover:text-white mb-8 group"
            onMouseEnter={() => playSound('hover')}
            onClick={() => playSound('click')}
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Intel Database
          </Link>

          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-orbitron mb-4 text-gradient">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              <span className="flex items-center">
                <FaClock className="mr-2" />
                {post.readTime}
              </span>
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-neon-blue/10 rounded-full text-neon-blue"
              >
                <FaTag className="inline-block mr-1" />
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-gray-300 leading-relaxed mb-6">
              {post.excerpt}
            </p>
            {/* Add more content sections here */}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
} 