#!/bin/bash
cd ~/Desktop/joy_app
while true; do
  git add .
  if ! git diff --cached --quiet; then
    git commit -m "auto update $(date '+%H:%M:%S')"
    git push origin main
    echo "Обновлено в $(date '+%H:%M:%S')"
  fi
  sleep 10
done
