'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Heart, Wind, BookOpen, Sparkles } from 'lucide-react';

export function AboutAyurvedaTab() {
  const doshas = [
    {
      name: 'Vata',
      element: 'Air + Ether',
      color: 'blue',
      description: 'Governs movement, circulation, and communication',
      characteristics: ['Creative', 'Energetic', 'Quick-thinking', 'Prone to anxiety'],
      balance: ['Regular routine', 'Warm foods', 'Gentle yoga', 'Meditation']
    },
    {
      name: 'Pitta',
      element: 'Fire + Water',
      color: 'red',
      description: 'Governs digestion, metabolism, and transformation',
      characteristics: ['Intelligent', 'Focused', 'Ambitious', 'Prone to anger'],
      balance: ['Cooling foods', 'Moderate exercise', 'Relaxation', 'Cool environments']
    },
    {
      name: 'Kapha',
      element: 'Earth + Water',
      color: 'green',
      description: 'Governs structure, stability, and lubrication',
      characteristics: ['Stable', 'Loving', 'Patient', 'Prone to lethargy'],
      balance: ['Regular exercise', 'Light foods', 'Stimulation', 'Variety']
    }
  ];

  const principles = [
    {
      title: 'Individual Constitution',
      description: 'Each person has a unique combination of doshas that determines their physical and mental characteristics.',
      icon: '🧬'
    },
    {
      title: 'Balance & Harmony',
      description: 'Health is achieved when the doshas are in balance with each other and with nature.',
      icon: '⚖️'
    },
    {
      title: 'Prevention Over Cure',
      description: 'Ayurveda emphasizes maintaining health through lifestyle choices rather than treating disease.',
      icon: '🛡️'
    },
    {
      title: 'Mind-Body Connection',
      description: 'Physical health and mental well-being are deeply interconnected and must be addressed together.',
      icon: '🧠'
    }
  ];

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
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Ayurveda</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the ancient wisdom of Ayurveda, a 5,000-year-old holistic healing system 
            that emphasizes the balance between mind, body, and spirit.
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">What is Ayurveda?</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Ayurveda, meaning "science of life," is one of the world's oldest holistic healing systems. 
                    Originating in India over 5,000 years ago, it provides a comprehensive approach to health 
                    and wellness that addresses the root causes of disease rather than just symptoms.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    This ancient wisdom teaches us that health is not merely the absence of disease, 
                    but a state of complete physical, mental, and spiritual well-being.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-8xl mb-4">🌿</div>
                  <div className="text-6xl om-symbol">ॐ</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Core Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Core Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{principle.icon}</div>
                      <h4 className="text-xl font-semibold text-gray-800">{principle.title}</h4>
                    </div>
                    <p className="text-gray-600 text-center">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Three Doshas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">The Three Doshas</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {doshas.map((dosha, index) => (
              <motion.div
                key={dosha.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
              >
                <Card className={`h-full shadow-lg border-0 bg-gradient-to-br ${
                  dosha.color === 'blue' ? 'from-blue-50 to-blue-100' :
                  dosha.color === 'red' ? 'from-red-50 to-red-100' :
                  'from-green-50 to-green-100'
                }`}>
                  <CardHeader className="text-center">
                    <CardTitle className={`text-2xl ${
                      dosha.color === 'blue' ? 'text-blue-800' :
                      dosha.color === 'red' ? 'text-red-800' :
                      'text-green-800'
                    }`}>
                      {dosha.name}
                    </CardTitle>
                    <CardDescription className={`text-lg font-medium ${
                      dosha.color === 'blue' ? 'text-blue-600' :
                      dosha.color === 'red' ? 'text-red-600' :
                      'text-green-600'
                    }`}>
                      {dosha.element}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-center">{dosha.description}</p>
                    
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Characteristics:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {dosha.characteristics.map((char, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Balance with:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {dosha.balance.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Yoga & Ayurveda Connection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-12"
        >
          <Card className="shadow-lg border-0 bg-gradient-to-r from-ayurvedic-green/10 to-ayurvedic-sage/10">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Yoga & Ayurveda: A Perfect Union</h3>
                <div className="flex justify-center gap-4 mb-6">
                  <div className="text-4xl">🧘‍♀️</div>
                  <div className="text-4xl">+</div>
                  <div className="text-4xl">🌿</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    Complementary Practices
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Yoga and Ayurveda work together to create a complete system of wellness. 
                    While Ayurveda provides the foundation for understanding individual constitution 
                    and health needs, Yoga offers the practical tools for physical and mental transformation.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Wind className="w-6 h-6 text-blue-500" />
                    Holistic Approach
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Together, they address all aspects of human existence - physical, mental, emotional, 
                    and spiritual. This integrated approach ensures that healing occurs at the deepest levels, 
                    promoting lasting health and inner peace.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center"
        >
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Begin Your Journey?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Explore our personalized recommendations and start your path to holistic wellness 
                with the ancient wisdom of Ayurveda and Yoga.
              </p>
              <Button variant="ayurvedic" size="lg" className="px-8 py-4">
                <Sparkles className="w-5 h-5 mr-2" />
                Explore Recommendations
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
