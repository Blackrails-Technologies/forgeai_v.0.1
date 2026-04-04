#!/bin/bash
echo "forgeai installer — v0.1"
echo "Tool: Open Interpreter"
echo
# Find Python
if command -v python3 &> /dev/null; then
    PYTHON=python3
elif command -v python &> /dev/null; then
    PYTHON=python
else
    echo "Python not found. Please install Python 3.9+ from https://www.python.org"
    exit 1
fi
# Run the installer
$PYTHON install_open_interpreter.py