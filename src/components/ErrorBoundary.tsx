// Remove React import, use Component directly
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-orbitron text-neon-blue">System Error</h1>
            <p className="text-gray-400">An unexpected error has occurred.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-neon-blue text-gray-900 rounded-lg font-orbitron"
            >
              REBOOT SYSTEM
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 
