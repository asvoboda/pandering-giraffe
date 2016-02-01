#!/usr/bin/env bash


echo "Building Resume..."
cd ~/dev/resume
make clean && make

echo "Building site dependencies..."
cd ~/dev/pandering-giraffe
cp ~/dev/resume/asvoboda.pdf ~/dev/pandering-giraffe/resume/asvoboda.pdf
bundle exec jekyll build

echo "Copying built jekyll _site into repo..."
cd ~/dev/asvoboda.github.io
cp -R ../pandering-giraffe/_site/* .

echo "Finished. Please review and commit."
