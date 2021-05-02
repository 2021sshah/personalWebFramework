#!/bin/sh

# Assumes your program is called index.js
exec node index.js &> log.txt

# Add to Console: tail -f log.txt