#!/bin/bash

currentBranch=$(git branch --show-current)

if [ -z "$currentBranch" ]; then
  echo -e "\033[31mError: Not on any branch or no branch found.\033[0m"
  exit 1
fi


if [ ! -d .git ]; then
  echo "\033[31mError: Git repository is not initialized. Please initialize the repository first."
  exit 1
fi


GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m" 


echo -e "You are on branch: ${YELLOW}${currentBranch}${RESET}"

echo "Enter your commit message: "
read commitMessage

if [ -z "$COMMIT_MESSAGE" ]; then
  COMMIT_MESSAGE="No message"
fi

git add .
git commit -m "$commitMessage"
git push origin "$currentBranch"


echo -e "${GREEN}Changes have been pushed to the '${currentBranch}' branch!${RESET}"