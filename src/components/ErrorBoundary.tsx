import React from "react";

interface Props {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error: Error }>;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            const FallbackComponent = this.props.fallback || ErrorFallback;
            return <FallbackComponent error={this.state.error!} />;
        }
        return this.props.children;
    }
}

function ErrorFallback({ error }: { error: Error }) {
    return (
        <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-red-400 mb-4">
                Something went working
            </h2>
            <p className="text-neutral-400">
                {error.message}
            </p>
        </div>
    );
}