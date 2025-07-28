@echo off
setlocal enabledelayedexpansion

REM SuperDesign VSCode Extension - Easy Install Script for Windows
REM This script automates the installation and setup process for new users

title SuperDesign VSCode Extension - Easy Installer

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║  🚀 SuperDesign VSCode Extension - Easy Installer 🚀        ║
echo ║                                                              ║
echo ║  AI-powered design agent with 60+ models including 20+ free ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo ⚙️ Checking system requirements...

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js found: !NODE_VERSION!
) else (
    echo ❌ Node.js not found
    echo.
    echo Node.js is required to build this extension.
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    echo After installing Node.js:
    echo 1. Restart this command prompt
    echo 2. Run this script again
    echo.
    pause
    exit /b 1
)

REM Check npm
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm found: !NPM_VERSION!
) else (
    echo ❌ npm not found
    echo npm should be included with Node.js installation.
    echo Please reinstall Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check pnpm
pnpm --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('pnpm --version') do set PNPM_VERSION=%%i
    echo ✅ pnpm found: !PNPM_VERSION!
    set USE_PNPM=1
) else (
    echo ⚠️ pnpm not found
    echo.
    set /p INSTALL_PNPM="Would you like to install pnpm? (recommended for faster builds) [y/n]: "
    if /i "!INSTALL_PNPM!"=="y" (
        echo ⚙️ Installing pnpm...
        npm install -g pnpm
        if !errorlevel! equ 0 (
            echo ✅ pnpm installed successfully
            set USE_PNPM=1
        ) else (
            echo ⚠️ Failed to install pnpm, using npm instead
            set USE_PNPM=0
        )
    ) else (
        echo ⚠️ Using npm instead of pnpm (slower but works)
        set USE_PNPM=0
    )
)

REM Check VSCode
code --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ VSCode CLI found
    set VSCODE_AVAILABLE=1
) else (
    echo ⚠️ VSCode CLI not found in PATH
    echo ℹ️ Extension will be built and packaged for manual installation
    set VSCODE_AVAILABLE=0
)

echo.
echo ⚙️ Installing dependencies...
if !USE_PNPM! equ 1 (
    pnpm install
) else (
    npm install
)

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed

echo.
echo ⚙️ Building the extension...
if !USE_PNPM! equ 1 (
    pnpm run compile
) else (
    npm run compile
)

if %errorlevel% neq 0 (
    echo ❌ Failed to build extension
    pause
    exit /b 1
)
echo ✅ Extension built successfully

echo.
echo ⚙️ Setting up environment configuration...
if not exist ".env" (
    copy ".env.example" ".env" >nul
    echo ✅ Created .env file from template
    echo ℹ️ Please edit .env file to add your API keys:
    echo   - ANTHROPIC_API_KEY for Claude models
    echo   - OPENAI_API_KEY for GPT models  
    echo   - OPENROUTER_API_KEY for 60+ models including 20+ free models
) else (
    echo ℹ️ .env file already exists, skipping creation
)

echo.
echo ⚙️ Packaging extension...
if !USE_PNPM! equ 1 (
    pnpm run package
) else (
    npm run package
)

if %errorlevel% neq 0 (
    echo ❌ Failed to package extension
    pause
    exit /b 1
)
echo ✅ Extension packaged

REM Find the generated .vsix file
set VSIX_FILE=
for %%f in (*.vsix) do (
    set VSIX_FILE=%%f
    goto :vsix_found
)
echo ❌ No .vsix file found after packaging
pause
exit /b 1
:vsix_found

REM Install extension if VSCode CLI is available
set MANUAL_INSTALL_NEEDED=0
if !VSCODE_AVAILABLE! equ 1 (
    echo.
    echo ⚙️ Installing extension to VSCode...
    code --install-extension "!VSIX_FILE!"
    if !errorlevel! equ 0 (
        echo ✅ Extension installed to VSCode automatically
    ) else (
        echo ⚠️ Automatic installation failed, will provide manual instructions
        set MANUAL_INSTALL_NEEDED=1
    )
) else (
    set MANUAL_INSTALL_NEEDED=1
)

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║  ✅ Build Complete! ✅                                     ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

if !MANUAL_INSTALL_NEEDED! equ 1 (
    echo ╔══════════════════════════════════════════════════════════════╗
    echo ║                                                              ║
    echo ║  📦 Manual Installation Required 📦                        ║
    echo ║                                                              ║
    echo ╚══════════════════════════════════════════════════════════════╝
    echo.
    echo ℹ️ Extension file created: !VSIX_FILE!
    echo.
    echo ⚙️ To install the extension manually:
    echo.
    echo Method 1: VSCode Command Line
    echo   ⚙️ First, enable VSCode CLI:
    echo     1. Open VSCode
    echo     2. Press Ctrl+Shift+P (Command Palette)
    echo     3. Type: 'Shell Command: Install code command in PATH'
    echo     4. Run the command and restart command prompt
    echo   📦 Then install:
    echo     code --install-extension !VSIX_FILE!
    echo.
    echo Method 2: VSCode GUI
    echo   1. ⚙️ Open VSCode
    echo   2. 📦 Press Ctrl+Shift+P and type 'Extensions: Install from VSIX'
    echo   3. ⚙️ Select the file: %CD%\!VSIX_FILE!
    echo   4. 🚀 Restart VSCode
    echo.
    echo Method 3: Drag ^& Drop
    echo   1. ⚙️ Open VSCode Extensions panel (Ctrl+Shift+X)
    echo   2. 📦 Drag !VSIX_FILE! into the Extensions panel
    echo   3. 🚀 Restart VSCode
    echo.
)

echo ℹ️ Next steps after installation:
echo   1. 🔑 Edit .env file to add your API keys
echo   2. 🚀 Restart VSCode
echo   3. ⚙️ Look for the brain icon (🧠) in the Activity Bar
echo   4. 📦 Click it or run 'SuperDesign: Open Chat' from Command Palette
echo.
echo ℹ️ Available providers:
echo   • OpenRouter: 60+ models including 20+ free models (recommended)
echo   • Anthropic: Claude models (3.5 Sonnet, 4 Opus)
echo   • OpenAI: GPT models (4.1, 4.1 Mini)
echo.
echo ℹ️ Free models available (no API cost):
echo   • DeepSeek R1, Llama 3.1 405B, Qwen3 Coder, Kimi K2, and more!
echo.
echo ✅ Happy coding! 🚀
echo.

REM Open .env file for editing if it was just created
if not exist ".env.backup" (
    set /p OPEN_ENV="Would you like to open the .env file now to add your API keys? [y/n]: "
    if /i "!OPEN_ENV!"=="y" (
        notepad .env
    )
)

pause
