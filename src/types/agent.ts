import * as vscode from 'vscode';
import { CoreMessage } from 'ai';

export interface QueryOptions {
    maxTokens?: number;
    temperature?: number;
    topP?: number;
    maxSteps?: number;
    toolCallStreaming?: boolean;
}

export interface AgentMessage {
    role: 'user' | 'assistant' | 'system' | 'tool';
    content: string;
    toolCallId?: string;
    toolName?: string;
    timestamp?: number;
}

export interface AgentService {
    query(
        prompt?: string,
        messages?: CoreMessage[],
        options?: QueryOptions,
        abortController?: AbortController,
        onMessage?: (message: CoreMessage) => void
    ): Promise<CoreMessage[]>;

    hasApiKey(): boolean;
    isApiKeyAuthError(errorMessage: string): boolean;
}

export interface ExecutionContext {
    workingDirectory: string;
    sessionId: string;
    outputChannel: vscode.OutputChannel;
    abortController?: AbortController;
} 