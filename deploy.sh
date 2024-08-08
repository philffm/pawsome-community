#!/bin/bash

# Define variables
BRANCH="main" # or any other branch you want to deploy

# Pull the latest changes from the repository
echo "Pulling latest changes from the repository..."
# git pull $REPO_URL $BRANCH || { echo "Failed to pull changes"; exit 1; }
git pull


# Install dependencies
echo "Installing dependencies..."
npm install || { echo "Failed to install dependencies"; exit 1; }

# Build the project
echo "Building the project..."
npm run build || { echo "Failed to build the project"; exit 1; }

# Start the production server
echo "Starting the production server..."
npm run preview || { echo "Failed to start the server"; exit 1; }

echo "Deployment successful!"
