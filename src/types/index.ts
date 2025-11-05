export interface YogaPose {
  id: string;
  name: string;
  sanskritName: string;
  category: string;
  subcategory: string;
  image: string;
  benefits: string[];
  instructions: string[];
  duration: string;
  precautions: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  conditions: string[];
}

export interface AyurvedicRemedy {
  id: string;
  name: string;
  herbName: string;
  category: string;
  image: string;
  description: string;
  preparation: string[];
  dosage: string;
  benefits: string[];
  precautions: string[];
  relatedYoga: string[];
  conditions: string[];
}

export interface PranayamaExercise {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  benefits: string[];
  instructions: string[];
  duration: string;
  breathingPattern: string;
  precautions: string[];
  conditions: string[];
}

export interface RecommendationForm {
  symptoms: string[];
  bodyParts: string[];
  conditions: string[];
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  timeAvailable: string;
}
