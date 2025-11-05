'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { yogaPoses } from '@/data/yogaPoses';
import { ayurvedicRemedies } from '@/data/ayurvedicRemedies';
import { pranayamaExercises } from '@/data/pranayamaExercises';
import { YogaCard } from '@/components/YogaCard';
import { RemedyCard } from '@/components/RemedyCard';
import { PranayamaCard } from '@/components/PranayamaCard';
import { CheckCircle, Sparkles, Heart, Leaf, Wind } from 'lucide-react';

interface RecommendationForm {
  symptoms: string[];
  bodyParts: string[];
  conditions: string[];
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  timeAvailable: string;
}

export function PersonalizedRecommendationsTab() {
  const [formData, setFormData] = useState<RecommendationForm>({
    symptoms: [],
    bodyParts: [],
    conditions: [],
    experience: 'Beginner',
    timeAvailable: '15'
  });
  const [recommendations, setRecommendations] = useState<{
    yoga: any[];
    remedies: any[];
    pranayama: any[];
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const symptoms = [
    'Back Pain', 'Neck Pain', 'Headache', 'Anxiety', 'Stress', 'Insomnia',
    'Digestive Issues', 'Fatigue', 'Joint Pain', 'Muscle Tension', 'Poor Sleep',
    'Low Energy', 'Depression', 'Irritability', 'Poor Concentration'
  ];

  const bodyParts = [
    'Lower Back', 'Upper Back', 'Neck', 'Shoulders', 'Hips', 'Knees',
    'Ankles', 'Wrists', 'Head', 'Chest', 'Abdomen', 'Legs'
  ];

  const conditions = [
    'Arthritis', 'Migraine', 'PCOS', 'Diabetes', 'Hypertension', 'Depression',
    'Anxiety Disorder', 'Chronic Fatigue', 'Fibromyalgia', 'Sciatica',
    'Carpal Tunnel', 'Tennis Elbow'
  ];

  const timeOptions = ['15', '30', '45', '60'];

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleBodyPartToggle = (bodyPart: string) => {
    setFormData(prev => ({
      ...prev,
      bodyParts: prev.bodyParts.includes(bodyPart)
        ? prev.bodyParts.filter(b => b !== bodyPart)
        : [...prev.bodyParts, bodyPart]
    }));
  };

  const handleConditionToggle = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate recommendations based on form data
    const recommendedYoga = yogaPoses.filter(pose => {
      return formData.symptoms.some(symptom => pose.conditions.includes(symptom)) ||
             formData.conditions.some(condition => pose.conditions.includes(condition)) ||
             formData.bodyParts.some(part => pose.conditions.some(condition => 
               condition.toLowerCase().includes(part.toLowerCase())
             ));
    }).slice(0, 3);

    const recommendedRemedies = ayurvedicRemedies.filter(remedy => {
      return formData.symptoms.some(symptom => remedy.conditions.includes(symptom)) ||
             formData.conditions.some(condition => remedy.conditions.includes(condition));
    }).slice(0, 3);

    const recommendedPranayama = pranayamaExercises.filter(exercise => {
      return formData.symptoms.some(symptom => exercise.conditions.includes(symptom)) ||
             formData.conditions.some(condition => exercise.conditions.includes(condition));
    }).slice(0, 3);

    setRecommendations({
      yoga: recommendedYoga,
      remedies: recommendedRemedies,
      pranayama: recommendedPranayama
    });
    
    setIsGenerating(false);
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
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Personalized Recommendations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your health concerns and we'll create a personalized wellness plan 
            with yoga poses, Ayurvedic remedies, and breathing exercises just for you.
          </p>
        </motion.div>

        {!recommendations ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Wellness Assessment</CardTitle>
                <CardDescription className="text-center">
                  Help us understand your needs to provide the best recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Symptoms */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    What symptoms are you experiencing? (Select all that apply)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {symptoms.map((symptom) => (
                      <Button
                        key={symptom}
                        variant={formData.symptoms.includes(symptom) ? 'ayurvedic' : 'outline'}
                        size="sm"
                        onClick={() => handleSymptomToggle(symptom)}
                        className="justify-start"
                      >
                        {formData.symptoms.includes(symptom) && (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        {symptom}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Body Parts */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Which body parts are affected? (Select all that apply)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {bodyParts.map((bodyPart) => (
                      <Button
                        key={bodyPart}
                        variant={formData.bodyParts.includes(bodyPart) ? 'ayurvedic' : 'outline'}
                        size="sm"
                        onClick={() => handleBodyPartToggle(bodyPart)}
                        className="justify-start"
                      >
                        {formData.bodyParts.includes(bodyPart) && (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        {bodyPart}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Conditions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Do you have any specific health conditions? (Select all that apply)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {conditions.map((condition) => (
                      <Button
                        key={condition}
                        variant={formData.conditions.includes(condition) ? 'ayurvedic' : 'outline'}
                        size="sm"
                        onClick={() => handleConditionToggle(condition)}
                        className="justify-start"
                      >
                        {formData.conditions.includes(condition) && (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        {condition}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    What's your experience level with yoga and wellness practices?
                  </h3>
                  <div className="flex gap-3">
                    {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                      <Button
                        key={level}
                        variant={formData.experience === level ? 'ayurvedic' : 'outline'}
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, experience: level }))}
                        className="flex-1"
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Time Available */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    How much time can you dedicate daily? (in minutes)
                  </h3>
                  <div className="flex gap-3">
                    {timeOptions.map((time) => (
                      <Button
                        key={time}
                        variant={formData.timeAvailable === time ? 'ayurvedic' : 'outline'}
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, timeAvailable: time }))}
                      >
                        {time} min
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center pt-6">
                  <Button
                    variant="ayurvedic"
                    size="lg"
                    onClick={generateRecommendations}
                    disabled={isGenerating || (formData.symptoms.length === 0 && formData.conditions.length === 0)}
                    className="px-8 py-4 text-lg"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating Recommendations...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Get My Personalized Plan
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Results Header */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Personalized Wellness Plan</h3>
              <p className="text-gray-600">
                Based on your responses, here are our recommendations for your wellness journey
              </p>
            </div>

            {/* Yoga Recommendations */}
            {recommendations.yoga.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-red-500" />
                  <h4 className="text-2xl font-bold text-gray-800">Recommended Yoga Poses</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.yoga.map((pose, index) => (
                    <motion.div
                      key={pose.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <YogaCard pose={pose} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Ayurvedic Recommendations */}
            {recommendations.remedies.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Leaf className="w-8 h-8 text-green-500" />
                  <h4 className="text-2xl font-bold text-gray-800">Recommended Ayurvedic Remedies</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.remedies.map((remedy, index) => (
                    <motion.div
                      key={remedy.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <RemedyCard remedy={remedy} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Pranayama Recommendations */}
            {recommendations.pranayama.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Wind className="w-8 h-8 text-blue-500" />
                  <h4 className="text-2xl font-bold text-gray-800">Recommended Breathing Exercises</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.pranayama.map((exercise, index) => (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <PranayamaCard exercise={exercise} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Start Over Button */}
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setRecommendations(null);
                  setFormData({
                    symptoms: [],
                    bodyParts: [],
                    conditions: [],
                    experience: 'Beginner',
                    timeAvailable: '15'
                  });
                }}
                className="px-8 py-4"
              >
                Start Over
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
