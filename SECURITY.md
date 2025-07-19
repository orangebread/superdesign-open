# Security Guidelines for SuperDesign

## 🔒 API Key Management

### Critical Security Fix Applied

**Issue**: Hardcoded Helicone API key was exposed in source code
**Status**: ✅ FIXED - Moved to environment variable configuration

### Secure API Key Configuration

SuperDesign now supports secure API key management through environment variables:

#### 1. Environment Variables (Recommended)
```bash
# Copy .env.example to .env and configure:
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
OPENAI_API_KEY=sk-your-openai-key-here
OPENROUTER_API_KEY=sk-or-your-openrouter-key-here
HELICONE_API_KEY=sk-helicone-your-key-here  # Optional
```

#### 2. VSCode Settings (Fallback)
- Use Command Palette: `SuperDesign: Configure [Provider] API Key`
- Settings are stored in VSCode's secure storage

### Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for production deployments
3. **Rotate keys regularly** and monitor usage
4. **Use Helicone monitoring** to track API usage and costs
5. **Limit API key permissions** where possible

## 🛡️ File System Security

### Path Validation
- All file operations are restricted to workspace boundaries
- Path traversal attempts are blocked
- File size limits prevent memory exhaustion

### Safe File Operations
```typescript
// ✅ Safe - within workspace
read({ filePath: "src/components/Button.tsx" })

// ❌ Blocked - path traversal
read({ filePath: "../../../etc/passwd" })
```

## 🔍 Monitoring & Analytics

### Helicone Integration
- **Optional monitoring** for API usage tracking
- **Cost analysis** and performance metrics
- **Request/response logging** for debugging
- **No data retention** without explicit configuration

### Privacy Considerations
- Helicone is **optional** - extension works without it
- **User data** is only sent to configured AI providers
- **Local storage** for designs in `.superdesign/` folder
- **No telemetry** sent to SuperDesign servers

## 🚨 Security Reporting

If you discover a security vulnerability:

1. **Do NOT** create a public issue
2. **Email** security concerns to the maintainers
3. **Include** detailed reproduction steps
4. **Allow** reasonable time for response

## 🔧 Security Configuration

### Recommended Settings
```bash
# Minimal secure configuration
ANTHROPIC_API_KEY=your-key-here
# OR
OPENAI_API_KEY=your-key-here
# OR  
OPENROUTER_API_KEY=your-key-here

# Optional monitoring
HELICONE_API_KEY=your-helicone-key-here
```

### Advanced Security
```bash
# Enable additional security features
LOG_LEVEL=warn  # Reduce log verbosity
DEV_MODE=false  # Disable development features
```

## 📋 Security Checklist

- [ ] API keys stored in environment variables
- [ ] `.env` file added to `.gitignore`
- [ ] No hardcoded credentials in source code
- [ ] File operations restricted to workspace
- [ ] Regular security updates applied
- [ ] Monitoring configured (optional)

## 🔄 Security Updates

This document will be updated as new security features are added or vulnerabilities are discovered.

**Last Updated**: 2025-01-19
**Version**: 0.0.11+security-fix
