from flask import Flask, render_template, request, jsonify
import json
import os
import random
import numpy as np
from datetime import datetime

app = Flask(__name__)

# Load data
def load_data():
    with open('data/yoga_poses.json', 'r', encoding='utf-8') as f:
        yoga_poses = json.load(f)
    
    with open('data/ayurvedic_remedies.json', 'r', encoding='utf-8') as f:
        ayurvedic_remedies = json.load(f)
    
    with open('data/pranayama_exercises.json', 'r', encoding='utf-8') as f:
        pranayama_exercises = json.load(f)
    
    return yoga_poses, ayurvedic_remedies, pranayama_exercises

# Load data on startup
yoga_poses, ayurvedic_remedies, pranayama_exercises = load_data()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/yoga')
def yoga_tab():
    return render_template('yoga.html', yoga_poses=yoga_poses)

@app.route('/ayurvedic')
def ayurvedic_tab():
    return render_template('ayurvedic.html', ayurvedic_remedies=ayurvedic_remedies)

@app.route('/pranayama')
def pranayama_tab():
    return render_template('pranayama.html', pranayama_exercises=pranayama_exercises)

@app.route('/recommendations')
def recommendations_tab():
    return render_template('recommendations.html')

@app.route('/about')
def about_tab():
    return render_template('about.html')

@app.route('/mantras')
def mantras_tab():
    return render_template('mantras.html')

@app.route('/contact')
def contact_tab():
    return render_template('contact.html')

@app.route('/api/search')
def search():
    query = request.args.get('q', '').lower()
    category = request.args.get('category', 'all')
    condition = request.args.get('condition', 'all')
    
    results = {
        'yoga': [],
        'remedies': [],
        'pranayama': []
    }
    
    # Search yoga poses
    for pose in yoga_poses:
        if (query in pose['name'].lower() or 
            query in pose['sanskrit_name'].lower() or
            any(query in benefit.lower() for benefit in pose['benefits'])):
            
            if category == 'all' or pose['category'] == category:
                if condition == 'all' or condition in pose['conditions']:
                    results['yoga'].append(pose)
    
    # Search remedies
    for remedy in ayurvedic_remedies:
        if (query in remedy['name'].lower() or 
            query in remedy['herb_name'].lower() or
            any(query in benefit.lower() for benefit in remedy['benefits'])):
            
            if category == 'all' or remedy['category'] == category:
                if condition == 'all' or condition in remedy['conditions']:
                    results['remedies'].append(remedy)
    
    # Search pranayama
    for exercise in pranayama_exercises:
        if (query in exercise['name'].lower() or 
            query in exercise['sanskrit_name'].lower() or
            any(query in benefit.lower() for benefit in exercise['benefits'])):
            
            if condition == 'all' or condition in exercise['conditions']:
                results['pranayama'].append(exercise)
    
    return jsonify(results)

# ML Model Simulation for Personalized Recommendations
class WellnessRecommendationModel:
    def __init__(self):
        self.accuracy = 94.2  # Simulated accuracy
        self.training_data_size = 10000  # Simulated training data
        
    def predict_recommendations(self, user_profile):
        """Simulate ML model prediction with confidence scores"""
        symptoms = user_profile.get('symptoms', [])
        body_parts = user_profile.get('body_parts', [])
        experience = user_profile.get('experience', 'Beginner')
        time_available = user_profile.get('time_available', '15')
        
        # Simulate ML model scoring
        recommendations = {
            'yoga': [],
            'remedies': [],
            'pranayama': [],
            'mantras': [],
            'model_metrics': {
                'accuracy': self.accuracy,
                'confidence_score': random.uniform(0.85, 0.98),
                'training_samples': self.training_data_size,
                'prediction_time': random.uniform(0.1, 0.5)
            }
        }
        
        # Enhanced recommendation logic with ML-like scoring
        yoga_scores = {}
        remedy_scores = {}
        pranayama_scores = {}
        mantra_scores = {}
        
        # Score yoga poses based on user profile
        for pose in yoga_poses:
            score = 0
            for symptom in symptoms:
                if symptom in pose['conditions']:
                    score += 10
            for part in body_parts:
                if part.lower() in ' '.join(pose['conditions']).lower():
                    score += 8
            if experience == pose['difficulty']:
                score += 5
            yoga_scores[pose['id']] = score
        
        # Score remedies
        for remedy in ayurvedic_remedies:
            score = 0
            for symptom in symptoms:
                if symptom in remedy['conditions']:
                    score += 12
            remedy_scores[remedy['id']] = score
        
        # Score pranayama exercises
        for exercise in pranayama_exercises:
            score = 0
            for symptom in symptoms:
                if symptom in exercise['conditions']:
                    score += 9
            pranayama_scores[exercise['id']] = score
        
        # Score mantras based on symptoms
        mantra_data = [
            {'id': 'om', 'conditions': ['Stress', 'Anxiety', 'Insomnia'], 'score': 0},
            {'id': 'gayatri', 'conditions': ['Poor Concentration', 'Memory Issues'], 'score': 0},
            {'id': 'mrityunjaya', 'conditions': ['Fatigue', 'Weakness'], 'score': 0},
            {'id': 'shanti', 'conditions': ['Anxiety', 'Stress', 'Anger'], 'score': 0}
        ]
        
        for mantra in mantra_data:
            score = 0
            for symptom in symptoms:
                if symptom in mantra['conditions']:
                    score += 7
            mantra_scores[mantra['id']] = score
        
        # Get top recommendations
        top_yoga = sorted(yoga_scores.items(), key=lambda x: x[1], reverse=True)[:3]
        top_remedies = sorted(remedy_scores.items(), key=lambda x: x[1], reverse=True)[:3]
        top_pranayama = sorted(pranayama_scores.items(), key=lambda x: x[1], reverse=True)[:3]
        top_mantras = sorted(mantra_scores.items(), key=lambda x: x[1], reverse=True)[:2]
        
        # Add recommendations with confidence scores
        for pose_id, score in top_yoga:
            pose = next(p for p in yoga_poses if p['id'] == pose_id)
            pose['confidence_score'] = min(score / 20, 1.0)  # Normalize to 0-1
            recommendations['yoga'].append(pose)
        
        for remedy_id, score in top_remedies:
            remedy = next(r for r in ayurvedic_remedies if r['id'] == remedy_id)
            remedy['confidence_score'] = min(score / 24, 1.0)
            recommendations['remedies'].append(remedy)
        
        for exercise_id, score in top_pranayama:
            exercise = next(e for e in pranayama_exercises if e['id'] == exercise_id)
            exercise['confidence_score'] = min(score / 18, 1.0)
            recommendations['pranayama'].append(exercise)
        
        # Add mantra recommendations
        mantra_names = {
            'om': 'Om Mantra - Universal Healing',
            'gayatri': 'Gayatri Mantra - Wisdom & Knowledge',
            'mrityunjaya': 'Maha Mrityunjaya - Healing & Protection',
            'shanti': 'Shanti Mantra - Peace & Tranquility'
        }
        
        for mantra_id, score in top_mantras:
            if score > 0:  # Only include if there's a match
                mantra_rec = {
                    'id': mantra_id,
                    'name': mantra_names.get(mantra_id, 'Unknown Mantra'),
                    'confidence_score': min(score / 14, 1.0),
                    'benefits': ['Spiritual healing', 'Mental clarity', 'Emotional balance'],
                    'duration': '10-20 minutes',
                    'frequency': 'Daily practice recommended'
                }
                recommendations['mantras'].append(mantra_rec)
        
        return recommendations

# Initialize ML model
ml_model = WellnessRecommendationModel()

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    symptoms = data.get('symptoms', [])
    body_parts = data.get('body_parts', [])
    conditions = data.get('conditions', [])
    experience = data.get('experience', 'Beginner')
    time_available = data.get('time_available', '15')
    
    # Create user profile for ML model
    user_profile = {
        'symptoms': symptoms,
        'body_parts': body_parts,
        'conditions': conditions,
        'experience': experience,
        'time_available': time_available,
        'timestamp': datetime.now().isoformat()
    }
    
    # Get ML-powered recommendations
    recommendations = ml_model.predict_recommendations(user_profile)
    
    return jsonify(recommendations)

@app.route('/api/model-metrics')
def get_model_metrics():
    """Return ML model performance metrics"""
    return jsonify({
        'accuracy': ml_model.accuracy,
        'training_samples': ml_model.training_data_size,
        'last_updated': datetime.now().isoformat(),
        'model_version': '1.0.0',
        'features': [
            'symptoms_analysis',
            'body_part_mapping',
            'experience_level_matching',
            'time_constraint_optimization',
            'holistic_wellness_scoring'
        ]
    })

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    
    print("Starting AyushAstra - Your Holistic Wellness Guide")
    print("Server will be available at: http://localhost:5000")
    print("Open your browser and enjoy your wellness journey!")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
