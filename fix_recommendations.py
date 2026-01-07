import re

# Read the file
with open('templates/recommendations.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Add currentUserProfile variable
content = content.replace(
    '    let currentRecommendations = null;',
    '    let currentRecommendations = null;\n    let currentUserProfile = null;'
)

# Fix 2: Store user profile when generating recommendations
old_pattern = r'(const recommendations = await response\.json\(\);)\s+(// Hide form and show results)'
new_text = r'\1\n\n            // Store user profile for saving later\n            currentUserProfile = data;\n\n            \2'
content = re.sub(old_pattern, new_text, content)

# Fix 3: Include user profile when saving
old_save = 'body: JSON.stringify(currentRecommendations)'
new_save = '''// Combine recommendations with user profile data
            const dataToSave = {
                ...currentRecommendations,
                ...currentUserProfile
            };

            const response = await fetch('/api/save_recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave)'''

content = content.replace(
    '''const response = await fetch('/api/save_recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentRecommendations)''',
    new_save
)

# Write back
with open('templates/recommendations.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed recommendations.html successfully!")
