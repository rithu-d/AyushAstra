'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PranayamaCard } from '@/components/PranayamaCard';
import { Button } from '@/components/ui/button';
import { pranayamaExercises } from '@/data/pranayamaExercises';
import { PranayamaExercise } from '@/types';
import { Filter, Search, Wind } from 'lucide-react';

export function PranayamaTab() {
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const conditions = ['All', 'Anxiety', 'Stress', 'Poor Concentration', 'Insomnia', 'Low Energy', 'Headaches'];

  const filteredExercises = pranayamaExercises.filter(exercise => {
    const matchesCondition = selectedCondition === 'All' || exercise.conditions.includes(selectedCondition);
    const matchesSearch = searchQuery === '' || 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.sanskritName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCondition && matchesSearch;
  });

  const handleExerciseSelect = (exercise: PranayamaExercise) => {
    // Implement exercise detail modal or navigation
    console.log('Selected exercise:', exercise);
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
          <div className="text-6xl mb-4">🫁</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Pranayama & Breathing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the art of conscious breathing with traditional Pranayama techniques. 
            These exercises help balance your energy, calm your mind, and improve overall well-being.
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wind className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Breath Control</h3>
              <p className="text-sm text-gray-600">
                Learn to control your breath to influence your nervous system and energy levels
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Mind Calming</h3>
              <p className="text-sm text-gray-600">
                Reduce stress and anxiety through specific breathing patterns and techniques
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Energy Balance</h3>
              <p className="text-sm text-gray-600">
                Balance your body's energy systems for optimal health and vitality
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search breathing exercises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:border-ayurvedic-green focus:outline-none"
                />
                <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Health Condition
              </h3>
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
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredExercises.length} breathing exercise{filteredExercises.length !== 1 ? 's' : ''}
            {selectedCondition !== 'All' && ` for ${selectedCondition}`}
          </p>
        </motion.div>

        {/* Exercises Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PranayamaCard exercise={exercise} onSelect={handleExerciseSelect} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredExercises.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🫁</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No exercises found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms to find the perfect breathing exercise for you.
            </p>
          </motion.div>
        )}

        {/* Safety Guidelines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Safety Guidelines</h3>
          <ul className="text-blue-700 text-sm space-y-2">
            <li>• Always practice in a comfortable, quiet environment</li>
            <li>• Start slowly and gradually increase duration</li>
            <li>• Stop immediately if you feel dizzy or uncomfortable</li>
            <li>• Avoid practicing on a full stomach</li>
            <li>• Consult a healthcare professional if you have respiratory conditions</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
