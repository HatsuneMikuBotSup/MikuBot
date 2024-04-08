#!/bin/bash
while true; do
    # Pull changes from the remote repository and force overwrite local changes
    git pull origin main --force

    # Ensure the script has execute permissions next time
    chmod +x start.sh

    # Run the build script
    npm run build

    # Start your Node.js application
    node .
done
