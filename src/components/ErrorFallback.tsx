// For ErrorFallback.tsx
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center space-y-4 p-8">
        <FaExclamationTriangle className="text-6xl text-neon-blue mx-auto" />
        <h1 className="text-4xl font-orbitron text-neon-blue">System Error</h1>
        <p className="text-gray-400">An unexpected error has occurred:</p>
        <pre className="text-red-400 bg-gray-800 p-4 rounded-lg overflow-auto">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-neon-blue text-gray-900 rounded-lg font-orbitron
                   hover:bg-blue-400 transition-colors"
        >
          REBOOT SYSTEM
        </button>
      </div>
    </div>
  );
} 
