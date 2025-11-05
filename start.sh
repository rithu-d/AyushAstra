#!/bin/bash

echo "🧘‍♀️ Welcome to AyushAstra - Your Holistic Wellness Guide"
echo "=================================================="
echo ""
echo "Setting up your wellness journey..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
    echo ""
    echo "🚀 Starting the development server..."
    echo "   Open your browser and navigate to: http://localhost:3000"
    echo ""
    echo "🌿 Begin your holistic wellness journey with AyushAstra!"
    echo ""
    npm run dev
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
