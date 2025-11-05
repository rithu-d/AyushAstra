'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, Heart, Leaf, Wind } from 'lucide-react';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 lotus-bg">
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 text-ayurvedic-lotus opacity-30"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🧘‍♀️
        </motion.div>
        <motion.div
          className="absolute top-40 right-32 w-16 h-16 text-ayurvedic-leaf opacity-20"
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🌿
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-40 w-24 h-24 text-ayurvedic-gold opacity-25"
          animate={{ 
            rotate: 180,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ☸️
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-6xl mb-4 om-symbol">ॐ</div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            AyushAstra
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
            Your Holistic Wellness Guide
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover the ancient wisdom of Ayurveda and Yoga. Find personalized recommendations 
            for yoga poses, Ayurvedic remedies, and breathing exercises tailored to your wellness needs.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for yoga poses, remedies, or conditions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-200 rounded-full focus:border-ayurvedic-green focus:outline-none transition-colors duration-300 shadow-lg"
            />
            <Button
              variant="ayurvedic"
              size="sm"
              onClick={handleSearch}
              className="absolute right-2 top-2 h-10 w-10 rounded-full"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Quick Access Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Yoga for Health</h3>
            <p className="text-gray-600 text-sm">
              Discover yoga poses for specific health conditions and body pains
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <Leaf className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ayurvedic Remedies</h3>
            <p className="text-gray-600 text-sm">
              Natural herbs and treatments for holistic healing
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <Wind className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pranayama</h3>
            <p className="text-gray-600 text-sm">
              Breathing exercises for mental clarity and stress relief
            </p>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12"
        >
          <Button
            variant="ayurvedic"
            size="lg"
            className="text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Your Wellness Journey
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
