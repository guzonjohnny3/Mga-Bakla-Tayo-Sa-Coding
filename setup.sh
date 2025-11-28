#!/bin/bash

# Smart AgroGuide - Setup Script
# This script helps setup the Smart AgroGuide development environment

echo "🌾 Smart AgroGuide - Setup Script"
echo "=================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
  echo "✗ Node.js not found. Please install Node.js 16+"
  exit 1
fi
echo "✓ Node.js found: $(node --version)"
echo ""

# Check MongoDB
echo "✓ Checking MongoDB..."
if command -v mongod &> /dev/null; then
  echo "✓ MongoDB found"
else
  echo "⚠ MongoDB not found in PATH"
  echo "  Install from: https://www.mongodb.com/try/download/community"
fi
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✓ Dependencies installed"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
  echo "⚠ .env file not found"
  echo "📄 Creating .env from .env.example..."
  cp .env.example .env
  echo "✓ .env created - Please edit with your credentials"
  echo ""
  echo "Required configurations:"
  echo "  - MONGO_URI: MongoDB connection string"
  echo "  - JWT_SECRET: Random string for JWT signing"
  echo "  - OPENAI_API_KEY: Your OpenAI API key"
  echo "  - WEATHER_API_KEY: Your OpenWeatherMap API key"
else
  echo "✓ .env file exists"
fi
echo ""

# Start MongoDB (optional)
echo "Would you like to start MongoDB? (y/n)"
read -r start_mongo
if [ "$start_mongo" = "y" ]; then
  echo "Starting MongoDB..."
  mongod &
  echo "✓ MongoDB started"
else
  echo "⚠ Please ensure MongoDB is running"
fi
echo ""

# Start server
echo "🚀 Starting Smart AgroGuide server..."
echo "Server will run on http://localhost:5000"
echo ""
npm start
