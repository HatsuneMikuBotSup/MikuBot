#!/bin/bash

while true; do
    # Reset any local changes and index to match the latest commit on the main branch
    git reset --hard origin/main

    # Pull changes from the remote repository and force overwrite local changes
    git pull origin main --force

    # Ensure the script has execute permissions
    chmod +x start.sh
    npm i
    npm run build
    node .
    sleep 60
done
