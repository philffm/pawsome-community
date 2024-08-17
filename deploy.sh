#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Installing the latest version..."
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  . ~/.nvm/nvm.sh
  nvm install 21
  nvm use 21
fi

# Install pm2 if it's not installed
if ! command -v pm2 &> /dev/null; then
  echo "pm2 is not installed. Installing pm2 globally..."
  npm install -g pm2
fi

# Define variables
BRANCH="main" # or any other branch you want to deploy
APP_NAME="my-node-app" # Change this to a unique name for your application
PORT=3000 # Change this to your application's port

# Check if the app is already running and kill it if it is
if pm2 list | grep -q $APP_NAME; then
  echo "Stopping existing pm2 process for $APP_NAME..."
  pm2 stop $APP_NAME
  pm2 delete $APP_NAME
fi

# Reset local changes
echo "Resetting local changes..."
git reset --hard HEAD

# Pull the latest changes from the repository
echo "Pulling latest changes from the repository..."
git pull origin $BRANCH

# Install dependencies
echo "Installing dependencies..."
npm install || { echo "Failed to install dependencies"; exit 1; }

# Build the project
echo "Building the project..."
npm run build || { echo "Failed to build the project"; exit 1; }

# Start the production server using pm2
echo "Starting the production server with pm2..."
pm2 start "npm run preview -- --host" --name $APP_NAME -- --port $PORT || { echo "Failed to start the server"; exit 1; }

# Save the pm2 process list so it auto-starts on reboot
pm2 save

echo "Deployment successful! The application is running and managed by pm2."
