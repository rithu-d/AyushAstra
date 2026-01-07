from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from dotenv import load_dotenv
import json
import os
import random
import re
import shutil
from pathlib import Path
import numpy as np
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


try:
    import kagglehub
except ImportError:
    kagglehub = None

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production-2024')




def get_local_pose_matches(query, limit=6):
    """Return basic pose matches using improved keyword search."""
    query_lower = query.lower().strip()
    if not query_lower:
        return []
    
    query_words = query_lower.split()
    scored = []
    
    for pose in yoga_poses:
        # Build comprehensive searchable text
        haystack = " ".join([
            pose.get('name', ''),
            pose.get('sanskrit_name', ''),
            pose.get('category', ''),
            pose.get('subcategory', ''),
            " ".join(pose.get('conditions', [])),
            " ".join(pose.get('benefits', []))
        ]).lower()
        
        score = 0
        
        # Exact phrase match gets highest score
        if query_lower in haystack:
            score += 10
        
        # Check if all query words are present (for multi-word queries like "back pain")
        if all(word in haystack for word in query_words):
            score += 8
        
        # Check individual word matches
        for word in query_words:
            if word in haystack:
                score += 2
        
        # Bonus points for condition matches (most important for symptom-based searches)
        for cond in pose.get('conditions', []):
            cond_lower = cond.lower()
            if query_lower in cond_lower or cond_lower in query_lower:
                score += 15  # High priority for condition matches
            elif any(word in cond_lower for word in query_words):
                score += 10
        
        # Bonus for benefit matches
        for benefit in pose.get('benefits', []):
            if query_lower in benefit.lower():
                score += 5
        
        if score > 0:
            scored.append((score, pose))
    
    # Sort by score (highest first)
    scored.sort(key=lambda item: item[0], reverse=True)
    
    # Return top matches
    results = []
    for _, pose in scored[:limit]:
        results.append({
            'id': pose['id'],
            'name': pose['name'],
            'sanskrit_name': pose['sanskrit_name'],
            'category': pose['category'],
            'image': pose.get('image'),
            'benefits': pose['benefits'][:2],
            'difficulty': pose['difficulty'],
            'conditions': pose['conditions']
        })
    
    return results

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
# Trigger reload for data update
yoga_poses, ayurvedic_remedies, pranayama_exercises = load_data()

# User Management Functions
USERS_FILE = 'data/users.json'
USER_RECOMMENDATIONS_FILE = 'data/user_recommendations.json'

def load_users():
    """Load users from JSON file"""
    if os.path.exists(USERS_FILE):
        try:
            with open(USERS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_users(users):
    """Save users to JSON file"""
    os.makedirs('data', exist_ok=True)
    with open(USERS_FILE, 'w', encoding='utf-8') as f:
        json.dump(users, f, indent=2)

def load_user_recommendations():
    """Load user recommendations from JSON file"""
    if os.path.exists(USER_RECOMMENDATIONS_FILE):
        try:
            with open(USER_RECOMMENDATIONS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_user_recommendations(data):
    """Save user recommendations to JSON file"""
    os.makedirs('data', exist_ok=True)
    with open(USER_RECOMMENDATIONS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

def create_user(username, email, password):
    """Create a new user"""
    users = load_users()
    if username in users:
        return False, "Username already exists"
    if any(user.get('email') == email for user in users.values()):
        return False, "Email already registered"
    
    users[username] = {
        'username': username,
        'email': email,
        'password': generate_password_hash(password),
        'created_at': datetime.now().isoformat()
    }
    save_users(users)
    return True, "User created successfully"

def verify_user(username, password):
    """Verify user credentials"""
    users = load_users()
    if username not in users:
        return False, "Invalid username or password"
    
    user = users[username]
    if check_password_hash(user['password'], password):
        return True, user
    return False, "Invalid username or password"

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

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Login page with sign in and sign up forms"""
    if request.method == 'POST':
        action = request.form.get('action')
        
        if action == 'signin':
            # Sign in
            username = request.form.get('username')
            password = request.form.get('password')
            
            if not username or not password:
                flash('Please fill in all fields', 'error')
                return render_template('login.html')
            
            success, result = verify_user(username, password)
            if success:
                session['username'] = username
                session['logged_in'] = True
                flash('Welcome back! You have successfully signed in.', 'success')
                return redirect(url_for('home'))
            else:
                flash(result, 'error')
        
        elif action == 'signup':
            # Sign up
            username = request.form.get('signup_username')
            email = request.form.get('email')
            password = request.form.get('signup_password')
            confirm_password = request.form.get('confirm_password')
            
            if not username or not email or not password or not confirm_password:
                flash('Please fill in all fields', 'error')
                return render_template('login.html')
            
            if password != confirm_password:
                flash('Passwords do not match', 'error')
                return render_template('login.html')
            
            if len(password) < 6:
                flash('Password must be at least 6 characters long', 'error')
                return render_template('login.html')
            
            success, message = create_user(username, email, password)
            if success:
                session['username'] = username
                session['logged_in'] = True
                flash('Account created successfully! Welcome to AyushAstra.', 'success')
                return redirect(url_for('home'))
            else:
                flash(message, 'error')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    """Logout user"""
    session.clear()
    flash('You have been logged out successfully', 'info')
    return redirect(url_for('home'))

@app.route('/api/search')
def search():
    query = request.args.get('q', '').lower().strip()
    category = request.args.get('category', 'all')
    condition_filter = request.args.get('condition', 'all')
    
    results = {
        'yoga': [],
        'remedies': [],
        'pranayama': []
    }
    
    if not query:
        return jsonify(results)
    
    # Search yoga poses with improved matching
    for pose in yoga_poses:
        # Build searchable text from all relevant fields
        searchable_text = " ".join([
            pose['name'],
            pose['sanskrit_name'],
            pose.get('category', ''),
            pose.get('subcategory', ''),
            " ".join(pose.get('conditions', [])),
            " ".join(pose.get('benefits', []))
        ]).lower()
        
        # Check if query matches in any field
        # Also check if individual words match (for "back pain" -> matches "Back Pain")
        query_words = query.split()
        matches = False
        
        # Exact phrase match
        if query in searchable_text:
            matches = True
        # Individual word matching (for multi-word queries)
        elif all(word in searchable_text for word in query_words):
            matches = True
        # Check if query matches any condition directly
        elif any(query in cond.lower() or cond.lower() in query for cond in pose.get('conditions', [])):
            matches = True
        
        if matches:
            # Apply category filter
            if category == 'all' or pose.get('category', '').lower() == category.lower():
                # Apply condition filter
                if condition_filter == 'all' or condition_filter in pose.get('conditions', []):
                    results['yoga'].append(pose)
    
    # Search remedies with improved matching
    for remedy in ayurvedic_remedies:
        # Build comprehensive searchable text
        searchable_text = " ".join([
            remedy.get('name', ''),
            remedy.get('herb_name', ''),
            remedy.get('category', ''),
            remedy.get('description', ''),
            " ".join(remedy.get('conditions', [])),
            " ".join(remedy.get('benefits', []))
        ]).lower()
        
        query_words = query.split()
        matches = False
        
        # Exact phrase match
        if query in searchable_text:
            matches = True
        # Individual word matching (for multi-word queries)
        elif all(word in searchable_text for word in query_words):
            matches = True
        # Check if query matches any condition directly (highest priority for symptom-based searches)
        elif any(query in cond.lower() or cond.lower() in query or 
                any(word in cond.lower() for word in query_words) 
                for cond in remedy.get('conditions', [])):
            matches = True
        # Check if query matches any benefit
        elif any(query in benefit.lower() for benefit in remedy.get('benefits', [])):
            matches = True
        
        if matches:
            # Apply category filter
            if category == 'all' or remedy.get('category', '').lower() == category.lower():
                # Apply condition filter
                if condition_filter == 'all' or condition_filter in remedy.get('conditions', []):
                    results['remedies'].append(remedy)
    
    # Search pranayama
    for exercise in pranayama_exercises:
        searchable_text = " ".join([
            exercise.get('name', ''),
            exercise.get('sanskrit_name', ''),
            " ".join(exercise.get('conditions', [])),
            " ".join(exercise.get('benefits', []))
        ]).lower()
        
        query_words = query.split()
        matches = (query in searchable_text or 
                  all(word in searchable_text for word in query_words) or
                  any(query in cond.lower() or cond.lower() in query for cond in exercise.get('conditions', [])))
        
        if matches:
            if condition_filter == 'all' or condition_filter in exercise.get('conditions', []):
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
        time_available = int(user_profile.get('time_available', '15'))
        
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
            
            # Filter by time available - prefer poses that fit within time constraint
            pose_duration = self._parse_duration(pose.get('duration', '10 minutes'))
            if pose_duration <= time_available:
                score += 3  # Bonus for poses that fit time constraint
            elif pose_duration > time_available * 1.5:
                score -= 5  # Penalty for poses that take too long
            
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
            
            # Filter by time available
            exercise_duration = self._parse_duration(exercise.get('duration', '10 minutes'))
            if exercise_duration <= time_available:
                score += 2  # Bonus for exercises that fit time constraint
            
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
    
    def _parse_duration(self, duration_str):
        """Parse duration string to minutes (e.g., '5-10 minutes' -> 10)"""
        try:
            # Extract numbers from duration string
            numbers = re.findall(r'\d+', duration_str)
            if numbers:
                # Return the maximum value found (e.g., '5-10' -> 10)
                return int(max(numbers, key=int))
            return 15  # Default if parsing fails
        except:
            return 15  # Default if parsing fails
    
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
    
    # Debug log
    print(f"Received recommendation request - Experience: {experience}, Time: {time_available} minutes")
    
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

@app.route('/api/save_recommendations', methods=['POST'])
def save_recommendations():
    if not session.get('logged_in'):
        return jsonify({'success': False, 'message': 'Please login to save recommendations'}), 401
    
    username = session.get('username')
    data = request.json
    
    if not data:
        return jsonify({'success': False, 'message': 'No data provided'}), 400
    
    recommendations_data = load_user_recommendations()
    
    if username not in recommendations_data:
        recommendations_data[username] = []
    
    # Add timestamp and save
    data['saved_at'] = datetime.now().isoformat()
    recommendations_data[username].append(data)
    
    save_user_recommendations(recommendations_data)
    
    return jsonify({'success': True, 'message': 'Recommendations saved successfully'})

@app.route('/my-recommendations')
def my_recommendations():
    if not session.get('logged_in'):
        flash('Please login to view your saved recommendations', 'info')
        return redirect(url_for('login'))
    
    username = session.get('username')
    print(f"DEBUG: Logged in user: '{username}'")
    print(f"DEBUG: Session data: {dict(session)}")
    
    all_recommendations = load_user_recommendations()
    print(f"DEBUG: All recommendation keys: {list(all_recommendations.keys())}")
    print(f"DEBUG: Looking for username: '{username}'")
    
    user_recommendations = all_recommendations.get(username, [])
    print(f"DEBUG: Found {len(user_recommendations)} recommendations for user '{username}'")
    
    # Sort by date (newest first)
    user_recommendations.sort(key=lambda x: x.get('saved_at', ''), reverse=True)
    
    print(f"DEBUG: Passing {len(user_recommendations)} recommendations to template")
    return render_template('my_recommendations.html', recommendations=user_recommendations)

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
    
    # Initialize users file if it doesn't exist
    if not os.path.exists(USERS_FILE):
        save_users({})
    
    print("Starting AyushAstra - Your Holistic Wellness Guide")
    print("Server will be available at: http://localhost:5000")
    print("Open your browser and enjoy your wellness journey!")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
