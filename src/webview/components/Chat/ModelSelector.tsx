import React, { useState, useRef, useEffect } from 'react';
import { BrainIcon } from '../Icons';

interface ModelSelectorProps {
    selectedModel: string;
    onModelChange: (model: string) => void;
    disabled?: boolean;
}

interface ModelOption {
    id: string;
    name: string;
    provider: string;
    category: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const models: ModelOption[] = [
        // Anthropic
        { id: 'claude-4-opus-20250514', name: 'Claude 4 Opus', provider: 'Anthropic', category: 'Premium' },
        { id: 'claude-4-sonnet-20250514', name: 'Claude 4 Sonnet', provider: 'Anthropic', category: 'Balanced' },
        { id: 'claude-3-7-sonnet-20250219', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', category: 'Balanced' },
        { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', category: 'Balanced' },

        // Google (OpenRouter)
        { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'OpenRouter (Google)', category: 'Balanced' },
        { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'OpenRouter (Google)', category: 'Fast' },

        // Meta (OpenRouter) - Llama Models
        { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', name: 'Llama 4 Maverick 17B', provider: 'OpenRouter (Meta)', category: 'Balanced' },
        { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3 70B Instruct', provider: 'OpenRouter (Meta)', category: 'Balanced' },
        { id: 'meta-llama/llama-3.2-90b-vision-instruct', name: 'Llama 3.2 90B Vision', provider: 'OpenRouter (Meta)', category: 'Premium' },

        // DeepSeek (OpenRouter) - Reasoning Models
        { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1', provider: 'OpenRouter (DeepSeek)', category: 'Premium' },
        { id: 'deepseek/deepseek-v3', name: 'DeepSeek V3', provider: 'OpenRouter (DeepSeek)', category: 'Balanced' },
        { id: 'deepseek/deepseek-coder-v2-instruct', name: 'DeepSeek Coder V2', provider: 'OpenRouter (DeepSeek)', category: 'Balanced' },

        // Moonshot AI (OpenRouter) - Kimi Models
        { id: 'moonshot/kimi-k2-0711-preview', name: 'Kimi K2', provider: 'OpenRouter (Moonshot)', category: 'Premium' },
        { id: 'moonshot/moonshot-v1-32k', name: 'Moonshot V1 32K', provider: 'OpenRouter (Moonshot)', category: 'Balanced' },

        // Mistral (OpenRouter)
        { id: 'mistralai/mistral-small-3.2-24b-instruct-2506', name: 'Mistral Small 3.2 24B', provider: 'OpenRouter (Mistral)', category: 'Balanced' },
        { id: 'mistralai/mistral-large-2411', name: 'Mistral Large 2411', provider: 'OpenRouter (Mistral)', category: 'Premium' },
        { id: 'mistralai/codestral-latest', name: 'Codestral Latest', provider: 'OpenRouter (Mistral)', category: 'Balanced' },

        // xAI (OpenRouter)
        { id: 'x-ai/grok-3', name: 'Grok 3', provider: 'OpenRouter (xAI)', category: 'Premium' },
        { id: 'x-ai/grok-2-vision-beta', name: 'Grok 2 Vision Beta', provider: 'OpenRouter (xAI)', category: 'Balanced' },

        // Qwen (OpenRouter) - Alibaba Models
        { id: 'qwen/qwen3-235b-a22b-04-28', name: 'Qwen3 235B', provider: 'OpenRouter (Qwen)', category: 'Premium' },
        { id: 'qwen/qwen2.5-72b-instruct', name: 'Qwen2.5 72B Instruct', provider: 'OpenRouter (Qwen)', category: 'Balanced' },
        { id: 'qwen/qwen2.5-coder-32b-instruct', name: 'Qwen2.5 Coder 32B', provider: 'OpenRouter (Qwen)', category: 'Balanced' },

        // Anthropic via OpenRouter (for comparison)
        { id: 'anthropic/claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (OR)', provider: 'OpenRouter (Anthropic)', category: 'Balanced' },

        // Perplexity (OpenRouter)
        { id: 'perplexity/sonar-reasoning-pro', name: 'Sonar Reasoning Pro', provider: 'OpenRouter (Perplexity)', category: 'Premium' },
        { id: 'perplexity/llama-3.1-sonar-large-128k-online', name: 'Sonar Large 128K Online', provider: 'OpenRouter (Perplexity)', category: 'Balanced' },

        // Microsoft (OpenRouter)
        { id: 'microsoft/phi-4-reasoning-plus-04-30', name: 'Phi-4 Reasoning Plus', provider: 'OpenRouter (Microsoft)', category: 'Balanced' },
        { id: 'microsoft/wizardlm-2-8x22b', name: 'WizardLM 2 8x22B', provider: 'OpenRouter (Microsoft)', category: 'Premium' },

        // NVIDIA (OpenRouter)
        { id: 'nvidia/llama-3.3-nemotron-super-49b-v1', name: 'Llama 3.3 Nemotron Super 49B', provider: 'OpenRouter (NVIDIA)', category: 'Premium' },
        { id: 'nvidia/nemotron-4-340b-instruct', name: 'Nemotron 4 340B Instruct', provider: 'OpenRouter (NVIDIA)', category: 'Premium' },

        // Cohere (OpenRouter)
        { id: 'cohere/command-a-03-2025', name: 'Command A', provider: 'OpenRouter (Cohere)', category: 'Balanced' },
        { id: 'cohere/command-r-plus-08-2024', name: 'Command R+ 08-2024', provider: 'OpenRouter (Cohere)', category: 'Balanced' },

        // Amazon (OpenRouter)
        { id: 'amazon/nova-pro-v1', name: 'Nova Pro', provider: 'OpenRouter (Amazon)', category: 'Premium' },
        { id: 'amazon/nova-lite-v1', name: 'Nova Lite', provider: 'OpenRouter (Amazon)', category: 'Fast' },

        // Inflection (OpenRouter)
        { id: 'inflection/inflection-3-productivity', name: 'Inflection 3 Productivity', provider: 'OpenRouter (Inflection)', category: 'Balanced' },

        // Reka (OpenRouter)
        { id: 'rekaai/reka-flash-3', name: 'Reka Flash 3', provider: 'OpenRouter (Reka)', category: 'Fast' },
        { id: 'rekaai/reka-core-20240904', name: 'Reka Core', provider: 'OpenRouter (Reka)', category: 'Balanced' },

        // 01.AI (OpenRouter) - Yi Models
        { id: '01-ai/yi-lightning', name: 'Yi Lightning', provider: 'OpenRouter (01.AI)', category: 'Fast' },
        { id: '01-ai/yi-large', name: 'Yi Large', provider: 'OpenRouter (01.AI)', category: 'Balanced' },

        // Hugging Face (OpenRouter) - Open Source Models
        { id: 'huggingfaceh4/zephyr-7b-beta', name: 'Zephyr 7B Beta', provider: 'OpenRouter (HuggingFace)', category: 'Fast' },
        { id: 'nousresearch/nous-hermes-2-mixtral-8x7b-dpo', name: 'Nous Hermes 2 Mixtral 8x7B', provider: 'OpenRouter (Nous)', category: 'Balanced' },

        // FREE MODELS (OpenRouter) - No cost to use
        // Requested models
        { id: 'qwen/qwen3-coder:free', name: 'Qwen3 Coder (Free)', provider: 'OpenRouter (Qwen)', category: 'Free' },
        { id: 'qwen/qwen3-235b-a22b-2507:free', name: 'Qwen3 235B A22B (Free)', provider: 'OpenRouter (Qwen)', category: 'Free' },
        { id: 'moonshotai/kimi-k2:free', name: 'Kimi K2 (Free)', provider: 'OpenRouter (Moonshot)', category: 'Free' },
        { id: 'tngtech/deepseek-r1t2-chimera:free', name: 'DeepSeek R1T2 Chimera (Free)', provider: 'OpenRouter (TNG)', category: 'Free' },

        // Additional popular free models
        { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1 (Free)', provider: 'OpenRouter (DeepSeek)', category: 'Free' },
        { id: 'deepseek/deepseek-r1-distill-llama-70b:free', name: 'DeepSeek R1 Distill Llama 70B (Free)', provider: 'OpenRouter (DeepSeek)', category: 'Free' },
        { id: 'deepseek/deepseek-chat-v3-0324:free', name: 'DeepSeek V3 (Free)', provider: 'OpenRouter (DeepSeek)', category: 'Free' },
        { id: 'meta-llama/llama-3.1-405b-instruct:free', name: 'Llama 3.1 405B (Free)', provider: 'OpenRouter (Meta)', category: 'Free' },
        { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B (Free)', provider: 'OpenRouter (Meta)', category: 'Free' },
        { id: 'meta-llama/llama-3.2-11b-vision-instruct:free', name: 'Llama 3.2 11B Vision (Free)', provider: 'OpenRouter (Meta)', category: 'Free' },
        { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'Llama 3.2 3B (Free)', provider: 'OpenRouter (Meta)', category: 'Free' },
        { id: 'qwen/qwen-2.5-72b-instruct:free', name: 'Qwen 2.5 72B (Free)', provider: 'OpenRouter (Qwen)', category: 'Free' },
        { id: 'qwen/qwen-2.5-coder-32b-instruct:free', name: 'Qwen 2.5 Coder 32B (Free)', provider: 'OpenRouter (Qwen)', category: 'Free' },
        { id: 'qwen/qwq-32b:free', name: 'Qwen QwQ 32B (Free)', provider: 'OpenRouter (Qwen)', category: 'Free' },
        { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B (Free)', provider: 'OpenRouter (Mistral)', category: 'Free' },
        { id: 'mistralai/mistral-nemo:free', name: 'Mistral Nemo (Free)', provider: 'OpenRouter (Mistral)', category: 'Free' },
        { id: 'mistralai/mistral-small-24b-instruct-2501:free', name: 'Mistral Small 24B (Free)', provider: 'OpenRouter (Mistral)', category: 'Free' },
        { id: 'google/gemma-2-9b-it:free', name: 'Gemma 2 9B (Free)', provider: 'OpenRouter (Google)', category: 'Free' },
        { id: 'google/gemma-3-27b-it:free', name: 'Gemma 3 27B (Free)', provider: 'OpenRouter (Google)', category: 'Free' },
        { id: 'google/gemma-3-12b-it:free', name: 'Gemma 3 12B (Free)', provider: 'OpenRouter (Google)', category: 'Free' },
        { id: 'rekaai/reka-flash-3:free', name: 'Reka Flash 3 (Free)', provider: 'OpenRouter (Reka)', category: 'Free' },

        // Existing OpenAI (direct)
        { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'OpenAI', category: 'Balanced' },
        { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', provider: 'OpenAI', category: 'Fast' }
    ];

    const filteredModels = models.filter(model =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.provider.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedModelName = models.find(m => m.id === selectedModel)?.name || selectedModel;

    const calculateDropdownPosition = () => {
        if (!triggerRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const modalHeight = 190; // Reduced from 220 since we removed add models section
        const modalWidth = 240;
        const padding = 8;

        // Calculate vertical position (above the trigger)
        let top = triggerRect.top - modalHeight - padding;
        
        // If there's not enough space above, show below
        if (top < padding) {
            top = triggerRect.bottom + padding;
        }

        // Calculate horizontal position (align with trigger)
        let left = triggerRect.left;
        
        // Ensure modal doesn't go off-screen horizontally
        const rightEdge = left + modalWidth;
        if (rightEdge > window.innerWidth - padding) {
            left = window.innerWidth - modalWidth - padding;
        }
        if (left < padding) {
            left = padding;
        }

        setDropdownPosition({ top, left });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node) &&
                triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            if (isOpen) {
                calculateDropdownPosition();
            }
        };

        const handleResize = () => {
            if (isOpen) {
                calculateDropdownPosition();
            }
        };

        if (isOpen) {
            calculateDropdownPosition();
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', handleScroll, true);
            window.addEventListener('resize', handleResize);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    const handleModelSelect = (modelId: string) => {
        onModelChange(modelId);
        setIsOpen(false);
    };

    const handleToggleOpen = () => {
        if (!isOpen) {
            calculateDropdownPosition();
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            <style>
                {`
                    .model-selector-wrapper {
                        position: relative;
                        display: inline-block;
                    }

                    .model-selector-trigger {
                        background: transparent;
                        color: var(--vscode-foreground);
                        border: none;
                        outline: none;
                        font-size: 11px;
                        font-family: inherit;
                        cursor: pointer;
                        padding: 2px 20px 2px 6px;
                        border-radius: 4px;
                        transition: background-color 0.2s ease;
                        min-width: 120px;
                        white-space: nowrap;
                        position: relative;
                        display: flex;
                        align-items: center;
                        gap: 3px;
                    }

                    .model-selector-trigger:hover:not(:disabled) {
                        background: var(--vscode-list-hoverBackground);
                    }

                    .model-selector-trigger:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }

                    .model-selector-arrow {
                        position: absolute;
                        right: 6px;
                        top: 50%;
                        transform: translateY(-50%);
                        transition: transform 0.2s ease;
                        color: var(--vscode-descriptionForeground);
                    }

                    .model-selector-arrow.open {
                        transform: translateY(-50%) rotate(180deg);
                    }

                    .model-selector-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: transparent;
                        z-index: 1000;
                        pointer-events: none;
                    }

                    .model-selector-content {
                        position: absolute;
                        background: var(--vscode-dropdown-background);
                        border: 1px solid var(--vscode-dropdown-border);
                        border-radius: 4px;
                        width: 240px;
                        max-height: 190px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                        overflow: hidden;
                        pointer-events: auto;
                    }

                    .model-selector-header {
                        padding: 6px 8px;
                        border-bottom: 1px solid var(--vscode-dropdown-border);
                    }

                    .model-selector-search {
                        width: 100%;
                        background: var(--vscode-input-background);
                        border: 1px solid var(--vscode-input-border);
                        border-radius: 3px;
                        padding: 6px 8px;
                        color: var(--vscode-input-foreground);
                        font-size: 11px;
                        outline: none;
                        box-sizing: border-box;
                    }

                    .model-selector-search:focus {
                        border-color: var(--vscode-focusBorder);
                    }

                    .model-selector-search::placeholder {
                        color: var(--vscode-input-placeholderForeground);
                    }

                    .model-selector-list {
                        max-height: 150px;
                        overflow-y: auto;
                        overflow-x: hidden;
                    }

                    .model-selector-list::-webkit-scrollbar {
                        width: 6px;
                    }

                    .model-selector-list::-webkit-scrollbar-track {
                        background: transparent;
                    }

                    .model-selector-list::-webkit-scrollbar-thumb {
                        background: var(--vscode-scrollbarSlider-background);
                        border-radius: 3px;
                    }

                    .model-selector-list::-webkit-scrollbar-thumb:hover {
                        background: var(--vscode-scrollbarSlider-hoverBackground);
                    }

                    .model-option {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        padding: 4px 8px 4px 8px;
                        cursor: pointer;
                        transition: background-color 0.2s ease;
                        border: none;
                        background: none;
                        width: 100%;
                        text-align: left;
                        box-sizing: border-box;
                        min-height: 28px;
                        position: relative;
                    }

                    .model-option:hover {
                        background: var(--vscode-list-hoverBackground);
                    }

                    .model-option.selected {
                        background: var(--vscode-list-activeSelectionBackground) !important;
                        color: var(--vscode-list-activeSelectionForeground);
                    }

                    .model-option.selected:hover {
                        background: var(--vscode-list-activeSelectionBackground) !important;
                    }

                    .model-icon {
                        flex-shrink: 0;
                        color: var(--vscode-descriptionForeground);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 12px;
                        height: 12px;
                    }

                    .model-option.selected .model-icon {
                        color: var(--vscode-list-activeSelectionForeground);
                    }

                    .model-info {
                        flex: 1;
                        min-width: 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }

                    .model-name {
                        font-size: 11px;
                        font-weight: 500;
                        color: var(--vscode-foreground);
                        margin: 0;
                        line-height: 1.2;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .model-option.selected .model-name {
                        color: var(--vscode-list-activeSelectionForeground);
                    }

                    .model-provider {
                        font-size: 9px;
                        color: var(--vscode-descriptionForeground);
                        margin: 0;
                        line-height: 1.1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .model-option.selected .model-provider {
                        color: var(--vscode-list-activeSelectionForeground);
                        opacity: 0.8;
                    }

                    .model-check {
                        flex-shrink: 0;
                        color: var(--vscode-list-activeSelectionForeground);
                        font-size: 11px;
                        width: 12px;
                        height: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .model-category-badge {
                        flex-shrink: 0;
                        font-size: 8px;
                        font-weight: 600;
                        padding: 1px 4px;
                        border-radius: 2px;
                        text-transform: uppercase;
                        letter-spacing: 0.3px;
                        margin-left: 4px;
                    }

                    .model-category-badge.free {
                        background: #22c55e;
                        color: white;
                    }

                    .model-category-badge.premium {
                        background: #8b5cf6;
                        color: white;
                    }

                    .model-category-badge.balanced {
                        background: #3b82f6;
                        color: white;
                    }

                    .model-category-badge.fast {
                        background: #f59e0b;
                        color: white;
                    }

                    .model-option.selected .model-category-badge {
                        opacity: 0.9;
                    }
                `}
            </style>

            <div className="model-selector-wrapper">
                <button 
                    ref={triggerRef}
                    className="model-selector-trigger"
                    onClick={handleToggleOpen}
                    disabled={disabled}
                >
                    <div className="selector-icon model-icon">
                        <BrainIcon />
                    </div>
                    <span>{selectedModelName}</span>
                    <svg 
                        className={`model-selector-arrow ${isOpen ? 'open' : ''}`}
                        width="12" 
                        height="12" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="1.5" 
                            d="m6 12 4-4 4 4"
                        />
                    </svg>
                </button>

                {isOpen && (
                    <div className="model-selector-modal">
                        <div 
                            className="model-selector-content" 
                            ref={modalRef}
                            style={{
                                top: dropdownPosition.top,
                                left: dropdownPosition.left
                            }}
                        >
                            <div className="model-selector-header">
                                <input
                                    type="text"
                                    className="model-selector-search"
                                    placeholder="Search models..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            <div className="model-selector-list">
                                {filteredModels.map((model) => (
                                    <button
                                        key={model.id}
                                        className={`model-option ${model.id === selectedModel ? 'selected' : ''}`}
                                        onClick={() => handleModelSelect(model.id)}
                                    >
                                        <div className="model-icon">
                                            <BrainIcon />
                                        </div>
                                        <div className="model-info">
                                            <div className="model-name">{model.name}</div>
                                            <div className="model-provider">{model.provider}</div>
                                        </div>
                                        <div className={`model-category-badge ${model.category.toLowerCase()}`}>
                                            {model.category}
                                        </div>
                                        {model.id === selectedModel && (
                                            <div className="model-check">✓</div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ModelSelector; 