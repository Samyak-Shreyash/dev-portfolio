'use client';

import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

const BlogLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <motion.div
        className="relative w-24 h-20"
        variants={pageVariants}
        animate="animate"
      >
        <div className="absolute inset-0 bg-[hsl(var(--primary))/20 rounded-md w-full h-full shadow-lg transform rotate-[-10deg]" />
        <div className="absolute inset-0 bg-[hsl(var(--primary))/40 rounded-md w-full h-full shadow-lg transform rotate-0" />
        <div className="absolute inset-0 bg-[hsl(var(--primary))/70 rounded-md w-full h-full shadow-lg transform rotate-[10deg]" />
      </motion.div>
      <p className="text-muted-foreground text-lg font-medium">Fetching your page...</p>
    </div>
  );
};

export default BlogLoading;