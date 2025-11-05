'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RemedyCard } from '@/components/RemedyCard';
import { Button } from '@/components/ui/button';
import { ayurvedicRemedies } from '@/data/ayurvedicRemedies';
import { AyurvedicRemedy } from '@/types';
import { Filter, Search } from 'lucide-react';

export function AyurvedicRemediesTab() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Anti-inflammatory', 'Adaptogen', 'Digestive', 'Nervine', 'Immunomodulator'];
  const conditions = ['All', 'Arthritis', 'Anxiety', 'Digestive Issues', 'Insomnia', 'Cold', 'Stress'];

  const filteredRemedies = ayurvedicRemedies.filter(remedy => {
    const matchesCategory = selectedCategory === 'All' || remedy.category === selectedCategory;
    const matchesCondition = selectedCondition === 'All' || remedy.conditions.includes(selectedCondition);
    const matchesSearch = searchQuery === '' || 
      remedy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.herbName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesCondition && matchesSearch;
  });

  const handleRemedySelect = (remedy: AyurvedicRemedy) => {
    // Implement remedy detail modal or navigation
    console.log('Selected remedy:', remedy);
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
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Ayurvedic Remedies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore ancient Ayurvedic herbs and natural remedies for holistic healing. 
            Each remedy is backed by centuries of traditional wisdom and modern research.
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
                  placeholder="Search remedies or herbs..."
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
            Showing {filteredRemedies.length} remed{filteredRemedies.length !== 1 ? 'ies' : 'y'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {selectedCondition !== 'All' && ` for ${selectedCondition}`}
          </p>
        </motion.div>

        {/* Remedies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredRemedies.map((remedy, index) => (
            <motion.div
              key={remedy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <RemedyCard remedy={remedy} onSelect={handleRemedySelect} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredRemedies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No remedies found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms to find the perfect Ayurvedic remedy for you.
            </p>
          </motion.div>
        )}

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-amber-50 border border-amber-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Disclaimer</h3>
          <p className="text-amber-700 text-sm leading-relaxed">
            The information provided is for educational purposes only and should not be considered as medical advice. 
            Always consult with a qualified healthcare professional before starting any new treatment or remedy, 
            especially if you have existing health conditions or are taking medications.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
