# 📖 Manual Installation Guide (3 Simple Steps)

## Step 1: Download and Build

1. **Download the code:**
   - Go to https://github.com/orangebread/superdesign-open
   - Click the green "Code" button → "Download ZIP"
   - Extract the ZIP file to your Desktop

**[SCREENSHOT PLACEHOLDER: GitHub download ZIP button]**

2. **Open Terminal/Command Prompt:**
   - Windows: Press `Win + R`, type `cmd`, press Enter
   - Mac: Press `Cmd + Space`, type "Terminal", press Enter

**[SCREENSHOT PLACEHOLDER: Opening Terminal/Command Prompt]**

3. **Navigate to the folder and build:**
   ```bash
   cd Desktop/superdesign-open-main
   npm install
   npm run compile
   npm run package
   ```

**[SCREENSHOT PLACEHOLDER: Terminal commands running]**

You should now see a file called `superdesign-open-0.0.11.vsix` in the folder.

**[SCREENSHOT PLACEHOLDER: .vsix file in folder]**

## Step 2: Install in VSCode

1. **Open VSCode**
2. **Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)**
3. **Type "install from vsix" and press Enter**
4. **Find and select the `superdesign-open-0.0.11.vsix` file**
5. **Click Install**

**[SCREENSHOT PLACEHOLDER: VSCode command palette with "install from vsix"]**

**[SCREENSHOT PLACEHOLDER: File picker showing .vsix file]**

**[SCREENSHOT PLACEHOLDER: Installation success message]**

## Step 3: Setup API Key

1. **Get a free API key from OpenRouter:**
   - Go to https://openrouter.ai/
   - Sign up (it's free)
   - Go to https://openrouter.ai/keys
   - Create a new key and copy it

**[SCREENSHOT PLACEHOLDER: OpenRouter API key page]**

2. **Create a `.env` file in the project folder:**
   ```
   OPENROUTER_API_KEY=your-key-here
   ```

**[SCREENSHOT PLACEHOLDER: .env file with API key]**

3. **Restart VSCode and look for the brain icon (🧠) in the sidebar**

**[SCREENSHOT PLACEHOLDER: VSCode with brain icon visible]**

## Done! 🎉

Click the brain icon and start designing with free AI models!
