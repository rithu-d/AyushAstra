@echo off
echo 🧘‍♀️ Welcome to AyushAstra - Your Holistic Wellness Guide
echo ==================================================
echo.
echo Setting up your wellness journey...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo.

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully
    echo.
    echo 🚀 Starting the development server...
    echo    Open your browser and navigate to: http://localhost:3000
    echo.
    echo 🌿 Begin your holistic wellness journey with AyushAstra!
    echo.
    npm run dev
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
