'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Clock, AlertTriangle, BookOpen } from 'lucide-react';
import { AyurvedicRemedy } from '@/types';

interface RemedyCardProps {
  remedy: AyurvedicRemedy;
  onSelect?: (remedy: AyurvedicRemedy) => void;
}

export function RemedyCard({ remedy, onSelect }: RemedyCardProps) {
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
                {remedy.name}
              </CardTitle>
              <CardDescription className="text-sm text-ayurvedic-sage italic">
                {remedy.herbName}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-ayurvedic-green text-white">
                {remedy.category}
              </span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Image placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-ayurvedic-earth to-ayurvedic-gold rounded-lg flex items-center justify-center">
            <div className="text-white text-6xl opacity-50">🌿</div>
          </div>
          
          {/* Description */}
          <div>
            <p className="text-sm text-gray-600 line-clamp-3">
              {remedy.description}
            </p>
          </div>
          
          {/* Benefits */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-500" />
              Benefits
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {remedy.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-ayurvedic-green mt-1">•</span>
                  {benefit}
                </li>
              ))}
              {remedy.benefits.length > 3 && (
                <li className="text-xs text-gray-500 italic">
                  +{remedy.benefits.length - 3} more benefits
                </li>
              )}
            </ul>
          </div>
          
          {/* Dosage */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{remedy.dosage}</span>
          </div>
          
          {/* Preparation preview */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Preparation</h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {remedy.preparation[0]}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="ayurvedic" 
              size="sm" 
              className="flex-1"
              onClick={() => onSelect?.(remedy)}
            >
              Learn More
            </Button>
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Precautions */}
          {remedy.precautions.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-amber-600">
                <AlertTriangle className="w-3 h-3" />
                <span>Check precautions before use</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
