# SuperDesign VSCode Extension - Easy Install Script for PowerShell
# This script automates the installation and setup process for new users

param(
    [switch]$SkipVSCodeInstall,
    [switch]$Force
)

# Set execution policy for this session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Colors and emojis
$Colors = @{
    Red = "Red"
    Green = "Green" 
    Yellow = "Yellow"
    Blue = "Blue"
    Magenta = "Magenta"
    Cyan = "Cyan"
}

function Write-Header {
    Write-Host ""
    Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
    Write-Host "║                                                              ║" -ForegroundColor Magenta
    Write-Host "║  🚀 SuperDesign VSCode Extension - Easy Installer 🚀        ║" -ForegroundColor Magenta
    Write-Host "║                                                              ║" -ForegroundColor Magenta
    Write-Host "║  AI-powered design agent with 60+ models including 20+ free ║" -ForegroundColor Magenta
    Write-Host "║                                                              ║" -ForegroundColor Magenta
    Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta
    Write-Host ""
}

function Write-Step {
    param([string]$Message)
    Write-Host "⚙️ $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️ $Message" -ForegroundColor Yellow
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️ $Message" -ForegroundColor Cyan
}

function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

function Install-NodeJS {
    Write-Step "Node.js not found. Checking for package managers..."
    
    if (Test-Command "choco") {
        Write-Step "Installing Node.js via Chocolatey..."
        choco install nodejs -y
    }
    elseif (Test-Command "winget") {
        Write-Step "Installing Node.js via winget..."
        winget install OpenJS.NodeJS
    }
    else {
        Write-Error "No package manager found (chocolatey/winget)"
        Write-Info "Please install Node.js manually from: https://nodejs.org/"
        Write-Info "After installation, restart PowerShell and run this script again"
        exit 1
    }
}

function Install-PNPM {
    Write-Step "Installing pnpm package manager..."
    npm install -g pnpm
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Failed to install pnpm, will use npm instead"
        return $false
    }
    return $true
}

function Test-VSCode {
    if (Test-Command "code") {
        Write-Success "VSCode CLI found"
        return $true
    }
    else {
        Write-Warning "VSCode CLI not found in PATH"
        Write-Info "Extension will be built and packaged for manual installation"
        return $false
    }
}

function Setup-Environment {
    Write-Step "Setting up environment configuration..."
    
    if (-not (Test-Path ".env")) {
        Copy-Item ".env.example" ".env"
        Write-Success "Created .env file from template"
        Write-Info "Please edit .env file to add your API keys:"
        Write-Info "  - ANTHROPIC_API_KEY for Claude models"
        Write-Info "  - OPENAI_API_KEY for GPT models"
        Write-Info "  - OPENROUTER_API_KEY for 60+ models including 20+ free models"
        return $true
    }
    else {
        Write-Info ".env file already exists, skipping creation"
        return $false
    }
}

function Main {
    Write-Header
    
    Write-Step "Checking system requirements..."
    
    # Check Node.js
    if (Test-Command "node") {
        $nodeVersion = node --version
        Write-Success "Node.js found: $nodeVersion"
    }
    else {
        Write-Warning "Node.js not found"
        $install = Read-Host "Would you like to install Node.js? (y/n)"
        if ($install -eq "y" -or $install -eq "Y") {
            Install-NodeJS
        }
        else {
            Write-Error "Node.js is required. Please install it manually from https://nodejs.org/"
            exit 1
        }
    }
    
    # Check npm
    if (Test-Command "npm") {
        $npmVersion = npm --version
        Write-Success "npm found: $npmVersion"
    }
    else {
        Write-Error "npm not found. Please install Node.js which includes npm."
        exit 1
    }
    
    # Check/Install pnpm
    $usePnpm = $false
    if (Test-Command "pnpm") {
        $pnpmVersion = pnpm --version
        Write-Success "pnpm found: $pnpmVersion"
        $usePnpm = $true
    }
    else {
        Write-Warning "pnpm not found"
        $install = Read-Host "Would you like to install pnpm? (recommended for faster builds) (y/n)"
        if ($install -eq "y" -or $install -eq "Y") {
            $usePnpm = Install-PNPM
        }
        else {
            Write-Warning "Using npm instead of pnpm (slower but works)"
        }
    }
    
    # Check VSCode
    $vscodeAvailable = Test-VSCode
    
    Write-Step "Installing dependencies..."
    if ($usePnpm) {
        pnpm install
    }
    else {
        npm install
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to install dependencies"
        exit 1
    }
    Write-Success "Dependencies installed"
    
    Write-Step "Building the extension..."
    if ($usePnpm) {
        pnpm run compile
    }
    else {
        npm run compile
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to build extension"
        exit 1
    }
    Write-Success "Extension built successfully"
    
    $envCreated = Setup-Environment
    
    Write-Step "Packaging extension..."
    if ($usePnpm) {
        pnpm run package
    }
    else {
        npm run package
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to package extension"
        exit 1
    }
    Write-Success "Extension packaged"
    
    # Find the generated .vsix file
    $vsixFile = Get-ChildItem -Filter "*.vsix" | Select-Object -First 1
    if (-not $vsixFile) {
        Write-Error "No .vsix file found after packaging"
        exit 1
    }

    # Install extension if VSCode CLI is available
    $manualInstallNeeded = $true
    if ($vscodeAvailable -and -not $SkipVSCodeInstall) {
        Write-Step "Installing extension to VSCode..."
        code --install-extension $vsixFile.Name
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Extension installed to VSCode automatically"
            $manualInstallNeeded = $false
        }
        else {
            Write-Warning "Automatic installation failed, will provide manual instructions"
        }
    }
    
    Write-Host ""
    Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║                                                              ║" -ForegroundColor Green
    Write-Host "║  ✅ Build Complete! ✅                                     ║" -ForegroundColor Green
    Write-Host "║                                                              ║" -ForegroundColor Green
    Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""

    if ($manualInstallNeeded) {
        Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
        Write-Host "║                                                              ║" -ForegroundColor Cyan
        Write-Host "║  📦 Manual Installation Required 📦                        ║" -ForegroundColor Cyan
        Write-Host "║                                                              ║" -ForegroundColor Cyan
        Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
        Write-Host ""

        Write-Info "Extension file created: $($vsixFile.Name)"
        Write-Host ""
        Write-Step "To install the extension manually:"
        Write-Host ""
        Write-Host "Method 1: VSCode Command Line" -ForegroundColor Yellow
        Write-Host "  ⚙️ First, enable VSCode CLI:"
        Write-Host "    1. Open VSCode"
        Write-Host "    2. Press Ctrl+Shift+P (Command Palette)"
        Write-Host "    3. Type: 'Shell Command: Install code command in PATH'"
        Write-Host "    4. Run the command and restart PowerShell"
        Write-Host "  📦 Then install:"
        Write-Host "    code --install-extension $($vsixFile.Name)" -ForegroundColor Blue
        Write-Host ""
        Write-Host "Method 2: VSCode GUI" -ForegroundColor Yellow
        Write-Host "  1. ⚙️ Open VSCode"
        Write-Host "  2. 📦 Press Ctrl+Shift+P and type 'Extensions: Install from VSIX'"
        Write-Host "  3. ⚙️ Select the file: " -NoNewline; Write-Host "$((Get-Location).Path)\$($vsixFile.Name)" -ForegroundColor Blue
        Write-Host "  4. 🚀 Restart VSCode"
        Write-Host ""
        Write-Host "Method 3: Drag & Drop" -ForegroundColor Yellow
        Write-Host "  1. ⚙️ Open VSCode Extensions panel (Ctrl+Shift+X)"
        Write-Host "  2. 📦 Drag $($vsixFile.Name) into the Extensions panel"
        Write-Host "  3. 🚀 Restart VSCode"
        Write-Host ""
    }

    Write-Info "Next steps after installation:"
    Write-Host "  1. 🔑 Edit .env file to add your API keys"
    Write-Host "  2. 🚀 Restart VSCode"
    Write-Host "  3. ⚙️ Look for the brain icon (🧠) in the Activity Bar"
    Write-Host "  4. 📦 Click it or run 'SuperDesign: Open Chat' from Command Palette"
    Write-Host ""
    Write-Info "Available providers:"
    Write-Host "  • " -NoNewline; Write-Host "OpenRouter" -ForegroundColor Magenta -NoNewline; Write-Host ": 60+ models including 20+ free models (recommended)"
    Write-Host "  • " -NoNewline; Write-Host "Anthropic" -ForegroundColor Blue -NoNewline; Write-Host ": Claude models (3.5 Sonnet, 4 Opus)"
    Write-Host "  • " -NoNewline; Write-Host "OpenAI" -ForegroundColor Green -NoNewline; Write-Host ": GPT models (4.1, 4.1 Mini)"
    Write-Host ""
    Write-Info "Free models available (no API cost):"
    Write-Host "  • DeepSeek R1, Llama 3.1 405B, Qwen3 Coder, Kimi K2, and more!"
    Write-Host ""
    Write-Success "Happy coding! 🚀"
    
    # Offer to open .env file
    if ($envCreated) {
        $openEnv = Read-Host "Would you like to open the .env file now to add your API keys? (y/n)"
        if ($openEnv -eq "y" -or $openEnv -eq "Y") {
            notepad .env
        }
    }
}

# Run main function
try {
    Main
}
catch {
    Write-Error "An error occurred: $($_.Exception.Message)"
    Write-Info "Please check the error above and try again"
    exit 1
}
