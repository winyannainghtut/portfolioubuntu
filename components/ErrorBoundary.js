import React, { Component } from 'react';

/**
 * Error Boundary component to catch JavaScript errors in child components
 * Prevents the entire app from crashing due to component errors
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null,
            errorInfo: null 
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console (in production, you'd send to an error tracking service)
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ errorInfo });
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div className="h-full w-full flex flex-col items-center justify-center bg-ub-grey text-white p-8">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
                    <p className="text-gray-400 mb-4 text-center max-w-md">
                        {this.props.fallbackMessage || 'An error occurred while loading this component.'}
                    </p>
                    <button
                        onClick={this.handleRetry}
                        className="px-4 py-2 bg-ub-orange hover:bg-orange-600 rounded text-white font-medium transition-colors"
                    >
                        Try Again
                    </button>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details className="mt-4 text-sm text-gray-500 max-w-lg">
                            <summary className="cursor-pointer hover:text-gray-400">Error Details</summary>
                            <pre className="mt-2 p-2 bg-black rounded overflow-auto text-xs">
                                {this.state.error.toString()}
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
