import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5 flex items-start gap-4 text-red-600 dark:text-red-400">
                    <AlertTriangle className="shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Something went wrong</h3>
                        <p className="text-sm opacity-90">
                            {this.state.error?.message || "An unexpected error occurred."}
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
