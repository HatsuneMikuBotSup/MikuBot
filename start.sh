#!/bin/bash

while true; do
    # Reset any local changes and index to match the latest commit on the main branch
    git reset --hard origin/main

    # Pull changes from the remote repository and force overwrite local changes
    git pull origin main --force

    # Ensure the script has execute permissions
    chmod +x start.sh

    # Run the build script
    npm run build

    # Start your Node.js application
    node .

    # Sleep for a desired duration before repeating the loop
    # This example sleeps for 1 minute (60 seconds)
    sleep 60
done
