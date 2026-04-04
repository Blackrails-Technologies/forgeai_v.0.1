@echo off
echo forgeai installer — v0.1
echo Tool: Open Interpreter
echo.
REM Find Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Python not found. Opening python.org to download Python 3.9+...
    start https://www.python.org/downloads/
    pause
    exit /b 1
)
REM Run the installer
python install_open_interpreter.py
pause