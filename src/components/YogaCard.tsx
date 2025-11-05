'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Heart, Clock, AlertTriangle } from 'lucide-react';
import { YogaPose } from '@/types';

interface YogaCardProps {
  pose: YogaPose;
  onSelect?: (pose: YogaPose) => void;
}

export function YogaCard({ pose, onSelect }: YogaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-ayurvedic-cream to-white">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-800 mb-1">
                {pose.name}
              </CardTitle>
              <CardDescription className="text-sm text-ayurvedic-sage italic">
                {pose.sanskritName}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                pose.difficulty === 'Beginner' 
                  ? 'bg-green-100 text-green-700' 
                  : pose.difficulty === 'Intermediate'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {pose.difficulty}
              </span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Image placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-ayurvedic-green to-ayurvedic-sage rounded-lg flex items-center justify-center">
            <div className="text-white text-6xl opacity-50">🧘‍♀️</div>
          </div>
          
          {/* Benefits */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              Benefits
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {pose.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-ayurvedic-green mt-1">•</span>
                  {benefit}
                </li>
              ))}
              {pose.benefits.length > 3 && (
                <li className="text-xs text-gray-500 italic">
                  +{pose.benefits.length - 3} more benefits
                </li>
              )}
            </ul>
          </div>
          
          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{pose.duration}</span>
          </div>
          
          {/* Instructions preview */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Quick Start</h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {pose.instructions[0]}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="ayurvedic" 
              size="sm" 
              className="flex-1"
              onClick={() => onSelect?.(pose)}
            >
              Learn More
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Precautions */}
          {pose.precautions.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-amber-600">
                <AlertTriangle className="w-3 h-3" />
                <span>Check precautions before practicing</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
