import json
import os

USER_RECOMMENDATIONS_FILE = 'data/user_recommendations.json'

def load_user_recommendations():
    """Load user recommendations from JSON file"""
    if os.path.exists(USER_RECOMMENDATIONS_FILE):
        try:
            with open(USER_RECOMMENDATIONS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading JSON: {e}")
            return {}
    return {}

def test_retrieval(username):
    print(f"Testing retrieval for user: '{username}'")
    all_recommendations = load_user_recommendations()
    print(f"All keys: {list(all_recommendations.keys())}")
    
    user_recommendations = all_recommendations.get(username, [])
    print(f"Found {len(user_recommendations)} recommendations")
    
    # Sort by date (newest first)
    try:
        user_recommendations.sort(key=lambda x: x.get('saved_at', ''), reverse=True)
        print("Sorting successful")
    except Exception as e:
        print(f"Sorting failed: {e}")
        
    for i, rec in enumerate(user_recommendations):
        print(f"Rec {i+1}: Saved at {rec.get('saved_at')}")

if __name__ == "__main__":
    test_retrieval("Rithud")
