import React, { useState, useEffect } from 'react';

interface WelcomeProps {
    onGetStarted: () => void;
    vscode: any;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted, vscode }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Listen for messages from the extension
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const message = event.data;
            if (message.command === 'emailSubmitSuccess') {
                console.log('✅ Email submitted successfully via extension:', message.email);
                setIsLoading(false);
                onGetStarted();
            } else if (message.command === 'emailSubmitError') {
                console.error('❌ Email submission failed via extension:', message.error);
                setError(message.error);
                setIsLoading(false);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onGetStarted]);

    const submitEmail = async (emailToSubmit: string): Promise<void> => {
        // Send message to extension to handle the API call
        vscode.postMessage({
            command: 'submitEmail',
            email: emailToSubmit
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate email
        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        if (!validateEmail(email.trim())) {
            setError('Invalid email');
            return;
        }

        setIsLoading(true);

        // Submit email via extension (response will be handled by useEffect)
        await submitEmail(email.trim());
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) {
            setError(''); // Clear error when user starts typing
        }
    };

    return (
        <div className="welcome-section">
            <div className="welcome-header">
                <div className="welcome-logo">
                    <div className="logo-icon">✨</div>
                    <h1>Welcome to Super Design - Open</h1>
                </div>
                <p className="welcome-subtitle">Your AI-powered canvas for rapid UI exploration</p>
            </div>

            <form className="welcome-form" onSubmit={handleSubmit}>
                <div className="email-input-group">
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email address"
                        className={`email-input ${error ? 'error' : ''}`}
                        disabled={isLoading}
                        autoComplete="email"
                    />
                    {error && <span className="error-message">{error}</span>}
                </div>

                <div className="welcome-actions">
                    <button 
                        type="submit" 
                        className="btn-primary" 
                        disabled={isLoading || !email.trim()}
                    >
                        {isLoading ? 'Getting Started...' : 'Get Started'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Welcome; 