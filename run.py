#!/usr/bin/env python3
"""
AyushAstra - Your Holistic Wellness Guide
Python Flask Application

Run this script to start the AyushAstra web application.
"""

import os
import sys
import subprocess

def check_python_version():
    """Check if Python version is 3.7 or higher"""
    if sys.version_info < (3, 7):
        print("ERROR: Python 3.7 or higher is required!")
        print(f"Current version: {sys.version}")
        return False
    return True

def install_requirements():
    """Install required packages"""
    print("Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("Requirements installed successfully!")
        return True
    except subprocess.CalledProcessError:
        print("Failed to install requirements!")
        return False

def create_directories():
    """Create necessary directories"""
    directories = ['templates', 'static/css', 'static/js', 'static/images', 'data']
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
    print("Directories created successfully!")

def main():
    print("Welcome to AyushAstra - Your Holistic Wellness Guide")
    print("=" * 60)
    print()
    
    # Check Python version
    if not check_python_version():
        return
    
    print(f"Python {sys.version.split()[0]} detected")
    print()
    
    # Create directories
    create_directories()
    
    # Install requirements
    if not install_requirements():
        return
    
    print()
    print("Starting AyushAstra Flask Application...")
    print("Server will be available at: http://localhost:5000")
    print("Open your browser and enjoy your wellness journey!")
    print()
    print("Press Ctrl+C to stop the server")
    print()
    
    # Start Flask app
    try:
        from app import app
        app.run(debug=True, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\nThank you for using AyushAstra!")
        print("Namaste!")
    except Exception as e:
        print(f"Error starting application: {e}")
        print("Please check your Python installation and try again.")

if __name__ == "__main__":
    main()
