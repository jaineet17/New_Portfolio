import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../../types';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
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
            backgroundImage: `url(/images/intel/${post.id}.jpg)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 
                       via-gray-900/50 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm text-gray-400">{post.date}</span>
          <span className="text-gray-600">•</span>
          <span className="text-sm text-gray-400">{post.readTime}</span>
        </div>

        <h3 className="mb-2 font-orbitron text-lg text-white 
                     transition-colors group-hover:text-neon-blue sm:text-xl">
          {post.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-gray-400 sm:text-base">
          {post.excerpt}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-700/50 px-2 py-1 text-xs text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
} 