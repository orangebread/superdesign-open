# 🧠 SuperDesign(Open) — AI Design Agent for Your IDE

> **Note**: This is a fork of the original [SuperDesign](https://github.com/superdesignai/superdesign) project, maintained independently with additional features and improvements.

![SuperDesign Cover](cover.png)

### **By:** [AI Jason](https://x.com/jasonzhou1993) & [JackJack](https://x.com/jackjack_eth)

SuperDesign is the first **open-source design agent** that lives right inside your IDE.
Generate UI mockups, components, and wireframes directly from natural language prompts.
Works seamlessly with Cursor, Windsurf, Claude Code, and plain VS Code.

## 🔀 About This Fork

This fork enhances the original SuperDesign with several key improvements:

### **🎯 Enhanced AI Model Support**
- **50+ AI Models**: Expanded support for DeepSeek R1, Kimi K2, Grok 3, and many more
- **Multi-Provider Architecture**: Seamless switching between OpenRouter, Anthropic, and OpenAI
- **Advanced Model Features**: Support for reasoning models and specialized capabilities

### **⚙️ Improved Configuration**
- **Environment Variable Support**: Secure API key management via `.env` files
- **Flexible Provider Selection**: Easy switching between AI providers mid-conversation
- **Enhanced Security**: Better API key handling and configuration management
- **Helicone Integration**: Optional monitoring and analytics with secure configuration

### **🛠️ Developer Experience**
- **Better Error Handling**: More informative error messages and debugging
- **Enhanced Logging**: Comprehensive logging for troubleshooting
- **Improved Stability**: Bug fixes and performance optimizations

### **🎨 Extended Design Capabilities**
- **Advanced Prompting**: Refined system prompts for better design generation
- **Theme Support**: Enhanced dark/light mode compatibility
- **Workflow Improvements**: Better integration with external AI tools

This fork maintains full compatibility with the original while adding these enhancements for a more robust and feature-rich design experience.

> ✨ "Why design one option when you can explore ten?" — SuperDesign

[Join discord](https://discord.gg/FYr49d6cQ9)

[Upvote on Hackernews](https://news.ycombinator.com/item?id=44376003)

[Install guide](https://www.superdesign.dev/)

---

## 🎬 Demo Video (Click to play)

[![SuperDesign Demo](https://img.youtube.com/vi/INv6oZDhhUM/maxresdefault.jpg)](https://youtu.be/INv6oZDhhUM)

---

## 🚀 Features

- 🖼️ **Product Mockups**: Generate full UI screens from natural language prompts
- 🧩 **UI Components**: Create reusable components you can drop into your code
- 📝 **Wireframes**: Explore low-fidelity layouts for rapid prototyping
- 🔁 **Fork & Iterate**: Duplicate and evolve designs with one click
- 📥 **Prompt-to-IDE**: Copy prompts into Cursor, Windsurf, Claude Code for implementation
- 🤖 **50+ AI Models**: Choose from Claude, GPT, Llama, DeepSeek, Kimi, Grok, and more
- ⚡ **Model Switching**: Switch between models mid-conversation for different tasks
- 🎨 **Dark/Light Mode**: Designs adapt to your preferred theme
- 💾 **Local Storage**: All designs saved locally in `.superdesign/` folder
- 🔧 **Extensible**: Open source - customize prompts, add features, integrate tools

---

## 🧠 Works Great With Cursor, Windsurf, Claude Code, VS Code

👉 [Install here](https://www.superdesign.dev/)

---

## 🛠️ Getting Started

### 🎯 Quick Start (3 minutes)

1. **Install the Extension** from the Cursor/VS Code Marketplace
2. **Configure API Key** (choose one):
   - **Recommended**: OpenRouter API key for access to 40+ models
   - Anthropic API key for Claude models
   - OpenAI API key for GPT models
3. **Open SuperDesign** sidebar panel (click the brain icon)
4. **Select a Model** from the dropdown (try DeepSeek R1 or Kimi K2)
5. **Type a prompt** (e.g., _"Design a modern login screen with dark mode"_)
6. **View & iterate** on generated mockups, components, and wireframes
7. **Copy code** and paste into your project

### 🎨 Example Prompts to Try

```
🖼️ Product Mockups:
"Design a modern dashboard for a SaaS analytics platform"
"Create a mobile app onboarding flow with 3 screens"
"Design a landing page for an AI startup"

🧩 UI Components:
"Create a reusable button component with hover states"
"Design a card component for displaying user profiles"
"Build a navigation bar with dropdown menus"

📝 Wireframes:
"Wireframe a checkout flow for an e-commerce site"
"Create low-fi layouts for a blog homepage"
"Design wireframes for a mobile banking app"
```

### 🔄 Workflow Tips

- **Fork & Iterate**: Click fork to create variations of designs
- **Model Switching**: Try different models for different tasks
- **Context Aware**: SuperDesign understands your project structure
- **Copy Prompts**: Use generated prompts in Cursor/Claude Code for implementation

---

## 🚀 Quick Setup Guide

### 📦 Installation Options

#### Option 1: Install from VS Code Marketplace (Recommended for Users)
1. **Install from Marketplace**
   - Open VS Code/Cursor/Windsurf
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "SuperDesign"
   - Click Install

#### Option 2: Install Pre-built VSIX (Quick Local Install)
```bash
# Clone the repository
git clone https://github.com/orangebread/superdesign-open.git
cd superdesign-open

# Install the pre-built extension file
code --install-extension superdesign-open-0.0.11.vsix

# For detailed manual installation instructions for all IDEs,
# see the "Manual VSIX Installation Instructions" section below
```

#### Option 3: Local Development Installation (For Developers & Contributors)

**Prerequisites:**
- Node.js 18+ and npm (or pnpm/yarn)
- VS Code, Cursor, or Windsurf IDE
- Git
- Optional: `@vscode/vsce` for packaging (`npm install -g @vscode/vsce`)

**Step 1: Clone and Setup**
```bash
# Clone the repository
git clone https://github.com/orangebread/superdesign-open.git
cd superdesign-open

# Install dependencies (choose one)
npm install
# OR if you prefer pnpm (faster)
pnpm install
# OR if you prefer yarn
yarn install
```

**Step 2: Build the Extension**
```bash
# Build for development (includes source maps)
npm run compile

# OR build for production (minified, no source maps)
npm run package

# OR watch mode for active development
npm run watch
```

**Step 3: Install the Extension Locally**

**Method A: Development Mode (Recommended for Development)**
```bash
# Open the project in VS Code
code .

# Press F5 to launch Extension Development Host
# This opens a new VS Code window with your extension loaded
```

**Method B: Package and Install (Recommended for Testing)**
```bash
# Install vsce (VS Code Extension Manager) globally
npm install -g @vscode/vsce

# Option 1: Use the convenient npm script (builds + packages)
npm run package:vsix

# Option 2: Manual packaging
vsce package --no-dependencies

# Install the generated .vsix file
code --install-extension superdesign-open-0.0.11.vsix

# OR see detailed manual installation instructions below
```

**Step 4: Verify Installation**
1. Restart VS Code/Cursor/Windsurf
2. Look for the brain icon (🧠) in the Activity Bar
3. Click it to open SuperDesign sidebar
4. You should see the SuperDesign interface

### 📋 Manual VSIX Installation Instructions

Once you have a `.vsix` file (either from the repository or after building), here are detailed instructions for installing it manually:

#### 🖥️ **VS Code Installation**

**Method 1: Command Line (Recommended)**
```bash
# Navigate to the folder containing the .vsix file
cd /path/to/superdesign-open

# Install the extension
code --install-extension superdesign-open-0.0.11.vsix

# If you have multiple VS Code installations, specify the path
/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code --install-extension superdesign-open-0.0.11.vsix
```

**Method 2: VS Code UI**
1. **Open VS Code**
2. **Open Extensions Panel**: `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
3. **Access Menu**: Click the three dots (`...`) in the Extensions panel header
4. **Select Install Option**: Choose "Install from VSIX..."
5. **Browse for File**: Navigate to and select `superdesign-open-0.0.11.vsix`
6. **Install**: Click "Install" and wait for completion
7. **Restart**: Restart VS Code when prompted

#### 🎯 **Cursor Installation**

**Method 1: Command Line**
```bash
# Navigate to the folder containing the .vsix file
cd /path/to/superdesign-open

# Install using Cursor's CLI
cursor --install-extension superdesign-open-0.0.11.vsix

# Alternative: Use code command if Cursor is set as default
code --install-extension superdesign-open-0.0.11.vsix
```

**Method 2: Cursor UI**
1. **Open Cursor**
2. **Open Extensions Panel**: `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
3. **Access Menu**: Click the three dots (`...`) in the Extensions panel header
4. **Select Install Option**: Choose "Install from VSIX..."
5. **Browse for File**: Navigate to and select `superdesign-open-0.0.11.vsix`
6. **Install**: Click "Install" and wait for completion
7. **Restart**: Restart Cursor when prompted

#### 🌊 **Windsurf Installation**

**Method 1: Command Line**
```bash
# Navigate to the folder containing the .vsix file
cd /path/to/superdesign-open

# Install using Windsurf's CLI (if available)
windsurf --install-extension superdesign-open-0.0.11.vsix

# Alternative: Try the code command
code --install-extension superdesign-open-0.0.11.vsix
```

**Method 2: Windsurf UI**
1. **Open Windsurf**
2. **Open Extensions Panel**: `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
3. **Access Menu**: Click the three dots (`...`) in the Extensions panel header
4. **Select Install Option**: Choose "Install from VSIX..."
5. **Browse for File**: Navigate to and select `superdesign-open-0.0.11.vsix`
6. **Install**: Click "Install" and wait for completion
7. **Restart**: Restart Windsurf when prompted

#### ✅ **Verify Installation**

After installing the VSIX file:

1. **Restart your IDE** completely (close and reopen)
2. **Check Extensions List**:
   - Open Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`)
   - Search for "SuperDesign" or "superdesign-open"
   - Verify it appears in the installed extensions list
3. **Look for the Brain Icon** (🧠) in the Activity Bar (left sidebar)
4. **Test the Extension**:
   - Click the brain icon to open SuperDesign sidebar
   - You should see the SuperDesign chat interface
   - Try typing a simple prompt to test functionality

#### 🔧 **Manual Installation Troubleshooting**

**❌ "Extension not found" error**
```bash
# Check if the file exists and has correct permissions
ls -la superdesign-open-0.0.11.vsix

# Verify file integrity (should be a ZIP file)
file superdesign-open-0.0.11.vsix

# Try with full path
code --install-extension /full/path/to/superdesign-open-0.0.11.vsix
```

**❌ "Invalid VSIX" error**
- Ensure the `.vsix` file is not corrupted
- Try downloading/building the VSIX file again
- Check file size (should be several MB, not 0 bytes)

**❌ Extension installs but doesn't appear**
```bash
# List all installed extensions
code --list-extensions

# Check if SuperDesign is in the list
code --list-extensions | grep -i superdesign

# Force reload the window
# In IDE: Ctrl+Shift+P → "Developer: Reload Window"
```

**❌ Permission denied errors**
```bash
# On macOS/Linux, ensure you have write permissions
sudo code --install-extension superdesign-open-0.0.11.vsix

# Or change file permissions
chmod 644 superdesign-open-0.0.11.vsix
```

**❌ Multiple IDE installations**
```bash
# For VS Code Insiders
code-insiders --install-extension superdesign-open-0.0.11.vsix

# For specific VS Code installation (macOS example)
/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code --install-extension superdesign-open-0.0.11.vsix

# For Cursor (if different from code command)
/Applications/Cursor.app/Contents/Resources/app/bin/cursor --install-extension superdesign-open-0.0.11.vsix
```

#### 📁 **Alternative: Manual File Copy (Advanced)**

If command-line installation fails, you can manually copy the extension:

1. **Extract the VSIX file** (it's a ZIP file):
   ```bash
   # Create a temporary directory
   mkdir temp-extension
   cd temp-extension

   # Extract the VSIX
   unzip ../superdesign-open-0.0.11.vsix
   ```

2. **Find your extensions directory**:
   - **Windows**: `%USERPROFILE%\.vscode\extensions\`
   - **macOS**: `~/.vscode/extensions/`
   - **Linux**: `~/.vscode/extensions/`
   - **Cursor**: Replace `.vscode` with `.cursor`
   - **Windsurf**: Replace `.vscode` with `.windsurf`

3. **Copy the extension**:
   ```bash
   # Copy to extensions directory (adjust path as needed)
   cp -r extension/ ~/.vscode/extensions/superdesign-open-0.0.11/
   ```

4. **Restart your IDE** and the extension should appear

### 🛠️ Development Workflow

**For Active Development:**
```bash
# Start watch mode (rebuilds on file changes)
npm run watch

# In another terminal, run tests
npm run test

# Run specific test suites
npm run test:tools    # Test file operations
npm run test:agent    # Test AI agent functionality
npm run test:core     # Test core components
```

**Project Structure:**
```
superdesign-open/
├── src/
│   ├── extension.ts          # Main extension entry point
│   ├── services/             # AI services (OpenAI, Anthropic, OpenRouter)
│   ├── tools/                # File operation tools (read, write, edit, etc.)
│   ├── providers/            # VS Code providers (sidebar, webview)
│   ├── webview/              # React frontend components
│   ├── utils/                # Utility functions and config
│   └── types/                # TypeScript type definitions
├── dist/                     # Built extension files
├── esbuild.js               # Build configuration
├── package.json             # Extension manifest and dependencies
└── tsconfig.json            # TypeScript configuration
```

**Key Development Commands:**
```bash
# Type checking
npm run check-types

# Linting
npm run lint

# Build extension only
node esbuild.js

# Build with production optimizations
node esbuild.js --production

# Clean build (remove dist folder first)
rm -rf dist && npm run compile

# Package for distribution (no dependencies needed since esbuild bundles everything)
vsce package --no-dependencies

# Or use the convenient npm script (builds + packages in one command)
npm run package:vsix
```

**Why `--no-dependencies`?**
SuperDesign uses esbuild to bundle all dependencies into the `dist/` folder, so the packaged extension doesn't need node_modules. This results in:
- ⚡ **Faster packaging** (skips dependency analysis)
- 📦 **Smaller file size** (no redundant dependencies)
- 🛡️ **Better compatibility** (no dependency conflicts)

**Debugging:**
1. Open project in VS Code
2. Set breakpoints in TypeScript files
3. Press F5 to launch Extension Development Host
4. Debug in the new VS Code window
5. Check "Output" → "SuperDesign" for logs

**Making Changes:**
1. Edit source files in `src/`
2. If using watch mode, changes auto-rebuild
3. Reload Extension Development Host: `Ctrl+Shift+P` → "Developer: Reload Window"
4. Test your changes in the development window

### ⚙️ Configuration

SuperDesign supports multiple AI providers with 50+ powerful models.

### 🔑 API Key Setup (Choose Your Provider)

**Option 1: Environment Variables (Recommended)**
1. Copy `.env.example` to `.env` in your project root
2. Add your API keys:
```bash
# Choose one or more providers
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
OPENAI_API_KEY=sk-your-openai-key-here
OPENROUTER_API_KEY=sk-or-your-openrouter-key-here

# Optional: Configure model preferences
AI_MODEL_PROVIDER=openrouter
AI_MODEL=deepseek/deepseek-r1
```

**Option 2: VSCode Settings (Fallback)**
- Use Command Palette: `SuperDesign: Configure API Key`
- Or manually set in VSCode settings

### 🤖 Supported Providers & Models

#### **🔥 Premium Models (Best Performance)**
- **DeepSeek R1** - `deepseek/deepseek-r1` (Reasoning)
- **Kimi K2** - `moonshot/kimi-k2` (Advanced reasoning)
- **Claude 4 Opus** - `claude-4-opus-20250514` (Premium)
- **Grok 3** - `x-ai/grok-3` (Latest from xAI)
- **Qwen3 235B** - `qwen/qwen3-235b-a22b-04-28` (Massive scale)

#### **⚖️ Balanced Models (Great Performance)**
- **Claude 3.5 Sonnet** - `claude-3-5-sonnet-20241022`
- **Llama 3.3 70B** - `meta-llama/llama-3.3-70b-instruct`
- **Gemini 2.5 Pro** - `google/gemini-2.5-pro`
- **Mistral Large** - `mistralai/mistral-large-2411`
- **Qwen2.5 72B** - `qwen/qwen2.5-72b-instruct`

#### **⚡ Fast Models (Quick Response)**
- **Gemini 2.5 Flash** - `google/gemini-2.5-flash`
- **Yi Lightning** - `01-ai/yi-lightning`
- **GPT-4.1 Mini** - `gpt-4.1-mini`
- **Nova Lite** - `amazon/nova-lite-v1`

#### **🔧 Specialized Models**
- **Coding**: DeepSeek Coder V2, Qwen2.5 Coder, Codestral
- **Vision**: Llama 3.2 90B Vision, Grok 2 Vision Beta
- **Reasoning**: DeepSeek R1, Phi-4 Reasoning Plus
- **Multilingual**: Qwen series, Yi models

### 🌐 Provider Details

- **🏠 Anthropic** (4 models) - Direct API access to Claude models
- **🤖 OpenAI** (2 models) - Direct API access to GPT models
- **🌍 OpenRouter** (40+ models) - Access to models from:
  - Meta (Llama), Google (Gemini), DeepSeek, Moonshot (Kimi)
  - Mistral, xAI (Grok), Qwen, Microsoft, NVIDIA, Cohere
  - Amazon, Perplexity, 01.AI, Reka, and more

### 🔧 Advanced Configuration

For OpenRouter users, additional options are available:
```bash
# OpenRouter specific settings
OPENROUTER_SITE_URL=https://your-site.com
OPENROUTER_SITE_NAME=Your App Name
OPENROUTER_USAGE_TRACKING=true
OPENROUTER_REASONING_ENABLED=false
OPENROUTER_REASONING_EFFORT=medium
```

### 🔒 Security Notes

- Environment variables are more secure than VSCode settings
- Your `.env` file is automatically ignored by git
- Never commit API keys to version control
- Environment variables take priority over VSCode settings

---

## Can I use my own Claude Code or Cursor subscription?
Yes, after you initialise superdesign extension, some cursor/claude code rules will be added, so you can prompt the agent to do design and preview in superdesign canva (cmd + shift + p -> superdesign: open canva)

If using Cursor - I will highly suggest copy the prompt in 'design.mdc' and create a custom mode in cursor with that same system prompt; This should give you much better performance

Instructions here (Click to play): 
[![Instruction video](v0.0.11.png)](https://youtu.be/KChmJMCDOB0?si=pvU0kNRO4GRWjsec&t=122)

## 📂 Where Are My Designs Stored?

Your generated designs are saved locally inside `.superdesign/`.

---

## 🔧 Troubleshooting

### Common Issues

**❌ "API key not configured" error**
- Check your `.env` file has the correct API key format
- Ensure the file is in your project root (same level as package.json)
- Try using VSCode Command Palette: `SuperDesign: Configure API Key`

**❌ Model not responding**
- Verify your API key has sufficient credits/quota
- Try switching to a different model from the dropdown
- Check VSCode Output → "SuperDesign" for detailed error logs

**❌ Extension not loading**
- Restart VSCode/Cursor
- Check Extensions panel - ensure SuperDesign is enabled
- Try reloading window: `Ctrl+Shift+P` → "Developer: Reload Window"

**❌ Designs not saving**
- Check if `.superdesign/` folder exists in your project
- Ensure you have write permissions in the project directory

### Local Development Issues

**❌ Build failures**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear dist and rebuild
rm -rf dist
npm run compile
```

**❌ TypeScript errors**
```bash
# Check types without building
npm run check-types

# Fix common issues
npm run lint --fix
```

**❌ Extension not loading in development**
- Ensure you built the extension: `npm run compile`
- Check for build errors in terminal
- Try packaging and installing: `vsce package && code --install-extension *.vsix`
- Restart VS Code completely

**❌ React/Webview not updating**
- The webview uses React - ensure you're rebuilding both extension and webview
- Check browser console in webview (right-click → "Inspect")
- Clear VS Code cache: `Ctrl+Shift+P` → "Developer: Reload Window"

**❌ Missing dependencies**
```bash
# Install missing peer dependencies
npm install --save-dev @types/vscode

# Update all dependencies
npm update
```

**❌ VSIX packaging fails**
```bash
# Install vsce globally
npm install -g @vscode/vsce

# Check .vscodeignore is correct
cat .vscodeignore

# Package with no dependencies (recommended for esbuild projects)
vsce package --no-dependencies

# Package with verbose output for debugging
vsce package --no-dependencies --verbose
```

### Getting Help

- 📖 Check the [documentation](https://superdesign.dev)
- 💬 Join our [Discord community](https://discord.gg/FYr49d6cQ9)
- 🐛 Report issues on [GitHub](https://github.com/orangebread/superdesign-open/issues)

---

## ❓ FAQ

**Is it free and open source?**
Yes! SuperDesign is completely open source. Fork it, extend it, remix it.

**Which AI provider should I choose?**
- **OpenRouter**: Best option - access to 40+ models including DeepSeek R1, Kimi K2, Grok 3
- **Anthropic**: Great for Claude models (3.5 Sonnet, 4 Opus)
- **OpenAI**: Good for GPT models (4.1, 4.1 Mini)

**Can I use multiple providers?**
Yes! Configure multiple API keys and switch between models in the dropdown.

**Can I customize the design agent?**
Absolutely — modify prompts, add custom commands, or extend functionality.

**Can SuperDesign update existing UI?**
Yes — describe changes to existing components and the agent will iterate.

**How much does it cost?**
SuperDesign is free. You only pay for API usage from your chosen provider:
- OpenRouter: ~$0.01-0.10 per design (varies by model)
- Anthropic: ~$0.05-0.15 per design
- OpenAI: ~$0.03-0.08 per design

**How can I contribute?**
Pull requests welcome! See the Contributing section below for detailed guidelines.

---

## 🤝 Contributing

We welcome contributions! Here's how to get started with local development:

### 🚀 Quick Contribution Setup

1. **Fork & Clone**
   ```bash
   # Fork the repo on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/superdesign-open.git
   cd superdesign-open
   ```

2. **Setup Development Environment**
   ```bash
   # Install dependencies
   npm install

   # Build the extension
   npm run compile

   # Start development mode
   npm run watch
   ```

3. **Test Your Changes**
   ```bash
   # Open in VS Code and press F5 to test
   code .

   # Or package and install locally
   npm install -g @vscode/vsce
   vsce package --no-dependencies
   code --install-extension *.vsix
   ```

### 📝 Development Guidelines

**Code Style:**
- Use TypeScript for all new code
- Follow existing code patterns and naming conventions
- Run `npm run lint` before committing
- Ensure `npm run check-types` passes

**Testing:**
```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:tools    # File operations
npm run test:agent    # AI functionality
npm run test:core     # Core components
```

**Commit Guidelines:**
- Use clear, descriptive commit messages
- Reference issues when applicable: `fix: resolve API key validation (#123)`
- Keep commits focused and atomic

**Pull Request Process:**
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes and test thoroughly
3. Update documentation if needed
4. Submit a pull request with a clear description

### 🎯 Areas for Contribution

- **🤖 AI Models**: Add support for new AI providers or models
- **🎨 UI/UX**: Improve the React frontend and user experience
- **🛠️ Tools**: Enhance file operations and development tools
- **📚 Documentation**: Improve guides, examples, and API docs
- **🐛 Bug Fixes**: Fix issues and improve stability
- **⚡ Performance**: Optimize build times and runtime performance

### 🆘 Getting Help

- 💬 Join our [Discord](https://discord.gg/FYr49d6cQ9) for development discussions
- 📖 Check existing [Issues](https://github.com/orangebread/superdesign-open/issues) and [Discussions](https://github.com/orangebread/superdesign-open/discussions)
- 🐛 Report bugs with detailed reproduction steps

---

## 🔗 Links & Resources

- 🌐 **Website**: [https://superdesign.dev](https://superdesign.dev)
- 📦 **GitHub**: [https://github.com/orangebread/superdesign-open](https://github.com/orangebread/superdesign-open)
- 💬 **Discord**: [Join the Community](https://discord.gg/FYr49d6cQ9)
- 🐦 **Twitter/X**: [@jasonzhou1993](https://x.com/jasonzhou1993) & [@jackjack_eth](https://x.com/jackjack_eth)
- 📺 **Demo Video**: [Watch on YouTube](https://youtu.be/INv6oZDhhUM)
- 🛒 **VS Code Marketplace**: [Install Extension](https://marketplace.visualstudio.com/items?itemName=iganbold.superdesign-open)

### 🔑 Get API Keys

- **OpenRouter** (Recommended): [https://openrouter.ai/keys](https://openrouter.ai/keys)
- **Anthropic**: [https://console.anthropic.com/](https://console.anthropic.com/)
- **OpenAI**: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

---

## 🌟 Star History

If you find SuperDesign useful, please consider starring the repository!

[![Star History Chart](https://api.star-history.com/svg?repos=orangebread/superdesign-open&type=Date)](https://star-history.com/#orangebread/superdesign-open&Date)

---

**Made with ❤️ by the SuperDesign team**

