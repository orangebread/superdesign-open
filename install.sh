#!/bin/bash

# SuperDesign VSCode Extension - Easy Install Script
# This script automates the installation and setup process for new users

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Emojis for better UX
ROCKET="🚀"
CHECK="✅"
CROSS="❌"
WARNING="⚠️"
INFO="ℹ️"
GEAR="⚙️"
PACKAGE="📦"
KEY="🔑"

print_header() {
    echo ""
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║                                                              ║${NC}"
    echo -e "${PURPLE}║  ${ROCKET} SuperDesign VSCode Extension - Easy Installer ${ROCKET}        ║${NC}"
    echo -e "${PURPLE}║                                                              ║${NC}"
    echo -e "${PURPLE}║  AI-powered design agent with 60+ models including 20+ free ║${NC}"
    echo -e "${PURPLE}║                                                              ║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_step() {
    echo -e "${BLUE}${GEAR} $1${NC}"
}

print_success() {
    echo -e "${GREEN}${CHECK} $1${NC}"
}

print_error() {
    echo -e "${RED}${CROSS} $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

print_info() {
    echo -e "${CYAN}${INFO} $1${NC}"
}

check_command() {
    if command -v "$1" >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

install_node() {
    print_step "Installing Node.js..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if check_command "brew"; then
            brew install node
        else
            print_error "Homebrew not found. Please install Node.js manually from https://nodejs.org/"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if check_command "apt-get"; then
            sudo apt-get update
            sudo apt-get install -y nodejs npm
        elif check_command "yum"; then
            sudo yum install -y nodejs npm
        elif check_command "dnf"; then
            sudo dnf install -y nodejs npm
        else
            print_error "Package manager not found. Please install Node.js manually from https://nodejs.org/"
            exit 1
        fi
    else
        print_error "Unsupported operating system. Please install Node.js manually from https://nodejs.org/"
        exit 1
    fi
}

install_pnpm() {
    print_step "Installing pnpm package manager..."
    npm install -g pnpm
}

check_vscode() {
    if check_command "code"; then
        print_success "VSCode CLI found"
        return 0
    else
        print_warning "VSCode CLI not found in PATH"
        print_info "Extension will be built and packaged for manual installation"
        return 1
    fi
}

setup_environment() {
    print_step "Setting up environment configuration..."
    
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_success "Created .env file from template"
        print_info "Please edit .env file to add your API keys:"
        print_info "  - ANTHROPIC_API_KEY for Claude models"
        print_info "  - OPENAI_API_KEY for GPT models"
        print_info "  - OPENROUTER_API_KEY for 60+ models including 20+ free models"
    else
        print_info ".env file already exists, skipping creation"
    fi
}

main() {
    print_header
    
    print_step "Checking system requirements..."
    
    # Check Node.js
    if check_command "node"; then
        NODE_VERSION=$(node --version)
        print_success "Node.js found: $NODE_VERSION"
    else
        print_warning "Node.js not found"
        read -p "Would you like to install Node.js? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            install_node
        else
            print_error "Node.js is required. Please install it manually from https://nodejs.org/"
            exit 1
        fi
    fi
    
    # Check npm
    if check_command "npm"; then
        NPM_VERSION=$(npm --version)
        print_success "npm found: $NPM_VERSION"
    else
        print_error "npm not found. Please install Node.js which includes npm."
        exit 1
    fi
    
    # Check/Install pnpm
    if check_command "pnpm"; then
        PNPM_VERSION=$(pnpm --version)
        print_success "pnpm found: $PNPM_VERSION"
    else
        print_warning "pnpm not found"
        read -p "Would you like to install pnpm? (recommended) (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            install_pnpm
        else
            print_warning "Using npm instead of pnpm (slower but works)"
        fi
    fi
    
    # Check VSCode
    VSCODE_CLI_AVAILABLE=$(check_vscode && echo "true" || echo "false")

    print_step "Installing dependencies..."
    if check_command "pnpm"; then
        pnpm install
    else
        npm install
    fi
    print_success "Dependencies installed"
    
    print_step "Building the extension..."
    if check_command "pnpm"; then
        pnpm run compile
    else
        npm run compile
    fi
    print_success "Extension built successfully"
    
    setup_environment
    
    print_step "Packaging extension..."
    if check_command "pnpm"; then
        pnpm run package
    else
        npm run package
    fi
    print_success "Extension packaged"

    # Find the generated .vsix file
    VSIX_FILE=$(find . -name "*.vsix" -type f | head -n 1)
    if [ -z "$VSIX_FILE" ]; then
        print_error "No .vsix file found after packaging"
        exit 1
    fi

    # Install extension if VSCode CLI is available
    if [ "$VSCODE_CLI_AVAILABLE" = "true" ]; then
        print_step "Installing extension to VSCode..."
        code --install-extension "$VSIX_FILE"
        if [ $? -eq 0 ]; then
            print_success "Extension installed to VSCode automatically"
            MANUAL_INSTALL_NEEDED=false
        else
            print_warning "Automatic installation failed, will provide manual instructions"
            MANUAL_INSTALL_NEEDED=true
        fi
    else
        MANUAL_INSTALL_NEEDED=true
    fi
    
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                              ║${NC}"
    echo -e "${GREEN}║  ${CHECK} Build Complete! ${CHECK}                                     ║${NC}"
    echo -e "${GREEN}║                                                              ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""

    if [ "$MANUAL_INSTALL_NEEDED" = "true" ]; then
        echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
        echo -e "${CYAN}║                                                              ║${NC}"
        echo -e "${CYAN}║  ${PACKAGE} Manual Installation Required ${PACKAGE}                      ║${NC}"
        echo -e "${CYAN}║                                                              ║${NC}"
        echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
        echo ""

        print_info "Extension file created: ${YELLOW}$(basename "$VSIX_FILE")${NC}"
        echo ""
        print_step "To install the extension manually:"
        echo ""
        echo -e "${YELLOW}Method 1: VSCode Command Line${NC}"
        echo -e "  ${GEAR} First, enable VSCode CLI:"
        echo -e "    1. Open VSCode"
        echo -e "    2. Press Cmd+Shift+P (Command Palette)"
        echo -e "    3. Type: 'Shell Command: Install code command in PATH'"
        echo -e "    4. Run the command and restart terminal"
        echo -e "  ${PACKAGE} Then install:"
        echo -e "    ${BLUE}code --install-extension $(basename "$VSIX_FILE")${NC}"
        echo ""
        echo -e "${YELLOW}Method 2: VSCode GUI${NC}"
        echo -e "  1. ${GEAR} Open VSCode"
        echo -e "  2. ${PACKAGE} Press Cmd+Shift+P and type 'Extensions: Install from VSIX'"
        echo -e "  3. ${GEAR} Select the file: ${BLUE}$(pwd)/$(basename "$VSIX_FILE")${NC}"
        echo -e "  4. ${ROCKET} Restart VSCode"
        echo ""
        echo -e "${YELLOW}Method 3: Drag & Drop${NC}"
        echo -e "  1. ${GEAR} Open VSCode Extensions panel (Cmd+Shift+X)"
        echo -e "  2. ${PACKAGE} Drag ${BLUE}$(basename "$VSIX_FILE")${NC} into the Extensions panel"
        echo -e "  3. ${ROCKET} Restart VSCode"
        echo ""
    fi

    print_info "Next steps after installation:"
    echo -e "  1. ${KEY} Edit .env file to add your API keys"
    echo -e "  2. ${ROCKET} Restart VSCode"
    echo -e "  3. ${GEAR} Look for the brain icon (🧠) in the Activity Bar"
    echo -e "  4. ${PACKAGE} Click it or run 'SuperDesign: Open Chat' from Command Palette"
    echo ""
    print_info "Available providers:"
    echo -e "  • ${PURPLE}OpenRouter${NC}: 60+ models including 20+ free models (recommended)"
    echo -e "  • ${BLUE}Anthropic${NC}: Claude models (3.5 Sonnet, 4 Opus)"
    echo -e "  • ${GREEN}OpenAI${NC}: GPT models (4.1, 4.1 Mini)"
    echo ""
    print_info "Free models available (no API cost):"
    echo -e "  • DeepSeek R1, Llama 3.1 405B, Qwen3 Coder, Kimi K2, and more!"
    echo ""
    print_success "Happy coding! ${ROCKET}"
}

# Run main function
main "$@"
