'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Clock, Wind } from 'lucide-react';
import { PranayamaExercise } from '@/types';

interface PranayamaCardProps {
  exercise: PranayamaExercise;
  onSelect?: (exercise: PranayamaExercise) => void;
}

export function PranayamaCard({ exercise, onSelect }: PranayamaCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isInhaling, setIsInhaling] = useState(false);
  const [isExhaling, setIsExhaling] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  const totalDuration = 60; // 1 minute default

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            setIsInhaling(false);
            setIsExhaling(false);
            setIsHolding(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const startExercise = () => {
    setIsPlaying(true);
    setTimeLeft(totalDuration);
    // Start with inhaling
    setIsInhaling(true);
    setTimeout(() => {
      setIsInhaling(false);
      setIsHolding(true);
      setTimeout(() => {
        setIsHolding(false);
        setIsExhaling(true);
        setTimeout(() => {
          setIsExhaling(false);
        }, 2000);
      }, 2000);
    }, 2000);
  };

  const stopExercise = () => {
    setIsPlaying(false);
    setTimeLeft(0);
    setIsInhaling(false);
    setIsExhaling(false);
    setIsHolding(false);
  };

  const resetExercise = () => {
    stopExercise();
    setTimeLeft(totalDuration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
                {exercise.name}
              </CardTitle>
              <CardDescription className="text-sm text-ayurvedic-sage italic">
                {exercise.sanskritName}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Breathing Circle Animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div 
                className={`w-32 h-32 rounded-full border-4 border-ayurvedic-green transition-all duration-1000 ${
                  isInhaling ? 'scale-125 bg-green-100' : 
                  isExhaling ? 'scale-75 bg-blue-100' : 
                  isHolding ? 'scale-110 bg-yellow-100' : 
                  'scale-100 bg-gray-50'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wind className={`w-8 h-8 transition-colors duration-300 ${
                    isInhaling ? 'text-green-600' : 
                    isExhaling ? 'text-blue-600' : 
                    isHolding ? 'text-yellow-600' : 
                    'text-gray-400'
                  }`} />
                </div>
              </div>
              
              {/* Breathing instruction */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isInhaling ? 'text-green-600' : 
                  isExhaling ? 'text-blue-600' : 
                  isHolding ? 'text-yellow-600' : 
                  'text-gray-500'
                }`}>
                  {isInhaling ? 'Inhale' : 
                   isExhaling ? 'Exhale' : 
                   isHolding ? 'Hold' : 
                   'Ready'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Timer */}
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-gray-700">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-500">
              {exercise.breathingPattern}
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex justify-center gap-3">
            <Button
              variant="ayurvedic"
              size="sm"
              onClick={isPlaying ? stopExercise : startExercise}
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Start'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetExercise}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
          
          {/* Benefits */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Wind className="w-4 h-4 text-blue-500" />
              Benefits
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {exercise.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-ayurvedic-green mt-1">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{exercise.duration}</span>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onSelect?.(exercise)}
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
