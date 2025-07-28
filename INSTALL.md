# 🚀 SuperDesign Easy Installation Guide

This guide provides multiple easy installation methods for the SuperDesign VSCode extension.

## 📋 Prerequisites

The installation scripts will automatically check and install these if needed:
- **Node.js** 18+ (auto-installed on most systems)
- **VSCode** (must be installed manually)
- **Git** (for cloning the repository)

## 🛠️ Installation Methods

### Method 1: Unix/Linux/macOS (Recommended)

```bash
# Clone the repository
git clone https://github.com/orangebread/superdesign-open.git
cd superdesign-open

# Run the installer
chmod +x install.sh && ./install.sh
```

### Method 2: Windows (Command Prompt)

```cmd
# Clone the repository
git clone https://github.com/orangebread/superdesign-open.git
cd superdesign-open

# Run the installer
install.bat
```

### Method 3: Windows (PowerShell)

```powershell
# Clone the repository
git clone https://github.com/orangebread/superdesign-open.git
cd superdesign-open

# Run the installer
powershell -ExecutionPolicy Bypass -File install.ps1
```

## ✨ What the Installer Does

The installation scripts automatically:

1. **🔍 System Check**: Verifies Node.js, npm, and VSCode installation
2. **📦 Package Manager**: Installs pnpm for faster builds (optional)
3. **⬇️ Dependencies**: Installs all required npm packages
4. **🔨 Build**: Compiles TypeScript and builds the extension
5. **📋 Package**: Creates the .vsix extension file
6. **🔧 Smart Install**: Automatically installs to VSCode if CLI is available
7. **📖 Manual Guide**: Provides detailed manual installation instructions if needed
8. **⚙️ Configure**: Sets up .env configuration file
9. **🎯 Guide**: Provides next steps for API key setup

**Note**: If VSCode CLI is not available, the installer will build everything and provide clear manual installation instructions with multiple methods.

## 🔑 Post-Installation Setup

After installation, you'll need to:

1. **Edit the .env file** to add your API keys:
   ```bash
   # Choose one or more providers:
   ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
   OPENAI_API_KEY=sk-your-openai-key-here
   OPENROUTER_API_KEY=sk-or-your-openrouter-key-here
   ```

2. **Restart VSCode**

3. **Open SuperDesign**:
   - Click the brain icon (🧠) in the Activity Bar
   - Or use Command Palette: `SuperDesign: Open Chat`

## 🆓 Free Models Available

With OpenRouter, you get access to 20+ free models:
- **DeepSeek R1** - Advanced reasoning model
- **Llama 3.1 405B** - Massive scale model
- **Qwen3 Coder** - Specialized for coding
- **Kimi K2** - Advanced reasoning capabilities
- **And many more!**

## 🔧 Troubleshooting

### Node.js Not Found
- **macOS**: Install via Homebrew: `brew install node`
- **Windows**: Download from [nodejs.org](https://nodejs.org/)
- **Linux**: Use your package manager: `sudo apt install nodejs npm`

### VSCode CLI Not Available
**Don't worry!** The installer will build everything and provide detailed manual installation instructions.

**If you want to enable VSCode CLI for future use:**
1. Open VSCode
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
3. Type "Shell Command: Install 'code' command in PATH"
4. Run the command and restart your terminal

**Manual Installation Methods (provided by installer):**
- **Method 1**: VSCode Command Line (after enabling CLI)
- **Method 2**: VSCode GUI (Extensions: Install from VSIX)
- **Method 3**: Drag & Drop into Extensions panel

### Permission Errors (Unix/Linux)
```bash
# Make the script executable
chmod +x install.sh

# If you get permission errors during npm install:
sudo chown -R $(whoami) ~/.npm
```

### PowerShell Execution Policy (Windows)
```powershell
# If you get execution policy errors:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 🎯 Manual Installation (Alternative)

If the automated scripts don't work, you can install manually:

```bash
# Install dependencies
npm install  # or pnpm install

# Build the extension
npm run compile

# Package the extension
npm run package

# Install to VSCode
code --install-extension *.vsix
```

## 📞 Support

If you encounter issues:
1. Check the [troubleshooting section](#-troubleshooting) above
2. Open an issue on [GitHub](https://github.com/orangebread/superdesign-open/issues)
3. Join our [Discord community](https://discord.gg/FYr49d6cQ9)

## 🎉 Success!

Once installed, you'll see:
- 🧠 Brain icon in VSCode Activity Bar
- Access to 60+ AI models
- 20+ free models available
- Powerful design and coding capabilities

Happy designing! 🚀
