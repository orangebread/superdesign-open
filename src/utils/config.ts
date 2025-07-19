import * as vscode from 'vscode';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Configuration utility that prioritizes environment variables over VSCode settings
 * This provides better security and follows industry best practices for API key management
 */
export class ConfigManager {
    private static instance: ConfigManager;
    private envLoaded = false;

    private constructor() {
        this.loadEnvironmentVariables();
    }

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    /**
     * Load environment variables from .env file if it exists
     */
    private loadEnvironmentVariables(): void {
        if (this.envLoaded) {
            return;
        }

        try {
            // Try to find .env file in workspace root or extension root
            const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
            const envPaths = [
                workspaceRoot ? path.join(workspaceRoot, '.env') : null,
                path.join(__dirname, '..', '..', '.env'), // Extension root
                path.join(process.cwd(), '.env') // Current working directory
            ].filter(Boolean) as string[];

            for (const envPath of envPaths) {
                if (fs.existsSync(envPath)) {
                    dotenv.config({ path: envPath });
                    console.log(`[ConfigManager] Loaded environment variables from: ${envPath}`);
                    break;
                }
            }

            this.envLoaded = true;
        } catch (error) {
            console.warn(`[ConfigManager] Failed to load .env file: ${error}`);
            this.envLoaded = true; // Mark as loaded to avoid retrying
        }
    }

    /**
     * Get configuration value with environment variable priority
     * @param key The configuration key (e.g., 'anthropicApiKey')
     * @param envKey The environment variable key (e.g., 'ANTHROPIC_API_KEY')
     * @param defaultValue Default value if neither env var nor setting exists
     */
    public get<T>(key: string, envKey?: string, defaultValue?: T): T | undefined {
        // 1. Check environment variable first (highest priority)
        if (envKey && process.env[envKey]) {
            const envValue = process.env[envKey];
            // Handle boolean conversion
            if (typeof defaultValue === 'boolean') {
                return (envValue.toLowerCase() === 'true') as unknown as T;
            }
            // Handle number conversion
            if (typeof defaultValue === 'number') {
                const numValue = Number(envValue);
                return (isNaN(numValue) ? defaultValue : numValue) as unknown as T;
            }
            return envValue as unknown as T;
        }

        // 2. Fall back to VSCode settings
        const config = vscode.workspace.getConfiguration('superdesign');
        const settingValue = config.get<T>(key);
        if (settingValue !== undefined) {
            return settingValue;
        }

        // 3. Return default value
        return defaultValue;
    }

    /**
     * Get API key with proper fallback logic
     */
    public getApiKey(provider: 'anthropic' | 'openai' | 'openrouter'): string | undefined {
        const keyMappings = {
            anthropic: { setting: 'anthropicApiKey', env: 'ANTHROPIC_API_KEY' },
            openai: { setting: 'openaiApiKey', env: 'OPENAI_API_KEY' },
            openrouter: { setting: 'openrouterApiKey', env: 'OPENROUTER_API_KEY' }
        };

        const mapping = keyMappings[provider];
        return this.get<string>(mapping.setting, mapping.env);
    }

    /**
     * Get OpenRouter-specific configuration
     */
    public getOpenRouterConfig() {
        return {
            apiKey: this.getApiKey('openrouter'),
            siteUrl: this.get<string>('openrouterSiteUrl', 'OPENROUTER_SITE_URL', 'https://github.com/superdesigndev/superdesign'),
            siteName: this.get<string>('openrouterSiteName', 'OPENROUTER_SITE_NAME', 'Superdesign VSCode Extension'),
            usageTracking: this.get<boolean>('openrouterUsageTracking', 'OPENROUTER_USAGE_TRACKING', true),
            reasoningEnabled: this.get<boolean>('openrouterReasoningEnabled', 'OPENROUTER_REASONING_ENABLED', false),
            reasoningEffort: this.get<string>('openrouterReasoningEffort', 'OPENROUTER_REASONING_EFFORT', 'medium')
        };
    }

    /**
     * Get AI model configuration
     */
    public getModelConfig() {
        return {
            provider: this.get<string>('aiModelProvider', 'AI_MODEL_PROVIDER', 'anthropic'),
            model: this.get<string>('aiModel', 'AI_MODEL')
        };
    }

    /**
     * Check if an API key is available for a provider
     */
    public hasApiKey(provider: 'anthropic' | 'openai' | 'openrouter'): boolean {
        const apiKey = this.getApiKey(provider);
        return !!apiKey && apiKey.trim().length > 0;
    }

    /**
     * Get configuration source information for debugging
     */
    public getConfigSource(key: string, envKey?: string): 'environment' | 'vscode' | 'default' | 'none' {
        if (envKey && process.env[envKey]) {
            return 'environment';
        }
        
        const config = vscode.workspace.getConfiguration('superdesign');
        if (config.get(key) !== undefined) {
            return 'vscode';
        }
        
        return 'none';
    }

    /**
     * Log configuration status for debugging
     */
    public logConfigStatus(): void {
        console.log('[ConfigManager] Configuration Status:');
        
        const providers = ['anthropic', 'openai', 'openrouter'] as const;
        providers.forEach(provider => {
            const hasKey = this.hasApiKey(provider);
            const keyMappings = {
                anthropic: { setting: 'anthropicApiKey', env: 'ANTHROPIC_API_KEY' },
                openai: { setting: 'openaiApiKey', env: 'OPENAI_API_KEY' },
                openrouter: { setting: 'openrouterApiKey', env: 'OPENROUTER_API_KEY' }
            };
            const mapping = keyMappings[provider];
            const source = this.getConfigSource(mapping.setting, mapping.env);
            
            console.log(`  ${provider}: ${hasKey ? '✅' : '❌'} (source: ${source})`);
        });

        const modelConfig = this.getModelConfig();
        console.log(`  Model Provider: ${modelConfig.provider} (source: ${this.getConfigSource('aiModelProvider', 'AI_MODEL_PROVIDER')})`);
        if (modelConfig.model) {
            console.log(`  Model: ${modelConfig.model} (source: ${this.getConfigSource('aiModel', 'AI_MODEL')})`);
        }
    }
}

// Export singleton instance
export const config = ConfigManager.getInstance();
