'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { YogaForHealthTab } from '@/components/YogaForHealthTab';
import { AyurvedicRemediesTab } from '@/components/AyurvedicRemediesTab';
import { PranayamaTab } from '@/components/PranayamaTab';
import { PersonalizedRecommendationsTab } from '@/components/PersonalizedRecommendationsTab';
import { AboutAyurvedaTab } from '@/components/AboutAyurvedaTab';
import { ContactTab } from '@/components/ContactTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HeroSection />;
      case 'yoga':
        return <YogaForHealthTab />;
      case 'ayurvedic':
        return <AyurvedicRemediesTab />;
      case 'pranayama':
        return <PranayamaTab />;
      case 'recommendations':
        return <PersonalizedRecommendationsTab />;
      case 'about':
        return <AboutAyurvedaTab />;
      case 'contact':
        return <ContactTab />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ayurvedic-cream to-white">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {renderActiveTab()}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl om-symbol">ॐ</div>
                <div>
                  <h3 className="text-xl font-bold">AyushAstra</h3>
                  <p className="text-sm text-gray-400">Holistic Wellness Guide</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted companion on the journey to holistic health and wellness through 
                the ancient wisdom of Ayurveda and Yoga.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Yoga Poses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ayurvedic Remedies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pranayama</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Consultations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Ayurveda</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Wellness Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@ayushastra.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Wellness Street</li>
                <li>Holistic City, HC 12345</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 AyushAstra. All rights reserved. | Made with ❤️ for your wellness journey
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
