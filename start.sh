#!/bin/bash

echo "🎁 Starting BundleCraft API..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please copy .env.example to .env and fill in your API keys."
    cp .env.example .env
    echo "Created .env file from example. Please edit it with your API keys."
fi

# Start the API
echo "🚀 Starting FastAPI server..."
echo "API will be available at: http://localhost:8000"
echo "API documentation: http://localhost:8000/docs"
echo "Demo frontend: http://localhost:8000/static/index.html"
echo ""
echo "Press Ctrl+C to stop the server"

uvicorn main:app --reload --host 0.0.0.0 --port 8000
