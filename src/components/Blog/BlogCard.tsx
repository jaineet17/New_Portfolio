import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaTag, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';
import { useSound } from '../../hooks/useSound';
import ImageWithFallback from '../UI/ImageWithFallback';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const { playSound } = useSound();

  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm
                 border border-transparent hover:border-neon-blue
                 transition-all group relative"
    >
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={`/images/intel/${post.id}.jpg`}
          alt={post.title}
          className="w-full h-full object-cover transition-transform
                   group-hover:scale-110 duration-700"
          fallbackSrc="/images/placeholder.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
          <span className="flex items-center">
            <FaClock className="mr-2" />
            {post.readTime}
          </span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>

        <h2 className="text-xl font-orbitron text-white mb-2 group-hover:text-neon-blue">
          {post.title}
        </h2>
        <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300"
              >
                <FaTag className="inline-block mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <motion.div
            whileHover={{ x: 5 }}
            className="text-neon-blue group-hover:translate-x-2 transition-transform"
          >
            <FaChevronRight />
          </motion.div>
        </div>

        <Link 
          to={`/blog/${post.id}`}
          className="absolute inset-0"
          onMouseEnter={() => playSound('hover')}
          onClick={() => playSound('click')}
        />
      </div>
    </motion.article>
  );
} 