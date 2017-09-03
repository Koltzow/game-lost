#!/bin/bash

clear

RED=$'\e[1;1;31m'
GREEN=$'\e[1;1;32m'
END=$'\e[0m'
BOLD=$'\e[1m'

VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[ ",]//g')

NAME=$(cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[ ",]//g')

echo "Building ${BOLD}${NAME}${END} version ${BOLD}${VERSION}${END} for production..."
echo

if [ ! -d "build" ]; then
  echo "Creating build foler..."
  mkdir "build"
  echo "Folder created"
  echo
fi

webpack

echo
echo "Zipping files..."
echo

zip -r build/build-"$VERSION".zip build/bundle.js build/index.html

MAXSIZE=13000
SIZE=$(wc -c "build/build-${VERSION}.zip" | awk '{print $1}')

echo
if [ $SIZE -ge $MAXSIZE ]; then
  echo "Build ${RED}[failed]${END}"
  echo
  echo "Name:    ${BOLD}${NAME}${END}"
  echo "Version: ${BOLD}${VERSION}${END}"
  echo "Size:    ${RED}${SIZE} bytes exceeds max size of $MAXSIZE bytes ${END}"
else
  echo "Build ${GREEN}[succeded]${END}"
  echo
  echo "Name:    ${BOLD}${NAME}${END}"
  echo "Version: ${BOLD}${VERSION}${END}"
  echo "Size:    ${GREEN}${SIZE} bytes${END}"
fi
echo "File:    ${BOLD}/build/build-${VERSION}.zip${END}"
echo
