'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, Heart, Leaf, Wind, User, BookOpen, Mail } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'yoga', label: 'Yoga for Health', icon: Heart },
  { id: 'ayurvedic', label: 'Ayurvedic Remedies', icon: Leaf },
  { id: 'pranayama', label: 'Pranayama', icon: Wind },
  { id: 'recommendations', label: 'Recommendations', icon: User },
  { id: 'about', label: 'About Ayurveda', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-3xl om-symbol">ॐ</div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AyushAstra</h1>
              <p className="text-xs text-gray-500">Holistic Wellness Guide</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'ayurvedic' : 'ghost'}
                  size="sm"
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center gap-2 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {/* Mobile menu toggle */}}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div 
        className="md:hidden border-t border-gray-200 bg-white"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-2 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'ayurvedic' : 'ghost'}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className="w-full justify-start flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
}
