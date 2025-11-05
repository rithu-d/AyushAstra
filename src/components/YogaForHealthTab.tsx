'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { YogaCard } from '@/components/YogaCard';
import { Button } from '@/components/ui/button';
import { yogaPoses } from '@/data/yogaPoses';
import { YogaPose } from '@/types';
import { Filter, Search } from 'lucide-react';

export function YogaForHealthTab() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Pain Relief', 'Stress Relief', 'Strength Building', 'Flexibility'];
  const conditions = ['All', 'Back Pain', 'Neck Pain', 'Anxiety', 'Headache', 'Menstrual Pain'];

  const filteredPoses = yogaPoses.filter(pose => {
    const matchesCategory = selectedCategory === 'All' || pose.category === selectedCategory;
    const matchesCondition = selectedCondition === 'All' || pose.conditions.includes(selectedCondition);
    const matchesSearch = searchQuery === '' || 
      pose.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pose.sanskritName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pose.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesCondition && matchesSearch;
  });

  const handlePoseSelect = (pose: YogaPose) => {
    // Implement pose detail modal or navigation
    console.log('Selected pose:', pose);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ayurvedic-cream to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Yoga for Health</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover yoga poses specifically designed to address various health conditions and body pains. 
            Each pose is carefully selected for its therapeutic benefits.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search yoga poses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:border-ayurvedic-green focus:outline-none"
                />
                <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'ayurvedic' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all duration-300"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Health Condition</h3>
              <div className="flex flex-wrap gap-2">
                {conditions.map((condition) => (
                  <Button
                    key={condition}
                    variant={selectedCondition === condition ? 'ayurvedic' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCondition(condition)}
                    className="transition-all duration-300"
                  >
                    {condition}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredPoses.length} yoga pose{filteredPoses.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {selectedCondition !== 'All' && ` for ${selectedCondition}`}
          </p>
        </motion.div>

        {/* Yoga Poses Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPoses.map((pose, index) => (
            <motion.div
              key={pose.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <YogaCard pose={pose} onSelect={handlePoseSelect} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredPoses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🧘‍♀️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No poses found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms to find the perfect yoga pose for you.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
