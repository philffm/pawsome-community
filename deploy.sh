#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Installing the latest version..."
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  . ~/.nvm/nvm.sh
  nvm install 21
  nvm use 21
fi

# Define variables
BRANCH="main" # or any other branch you want to deploy

# Reset local changes
echo "Resetting local changes..."
git reset --hard HEAD

# Pull the latest changes from the repository
echo "Pulling latest changes from the repository..."
git pull

# Install dependencies
echo "Installing dependencies..."
npm install || { echo "Failed to install dependencies"; exit 1; }

# Build the project
echo "Building the project..."
npm run build || { echo "Failed to build the project"; exit 1; }

# Start the production server
echo "Starting the production server..."
npm run preview -- --host || { echo "Failed to start the server"; exit 1; }

echo "Deployment successful!"
