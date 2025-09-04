import React from 'react';
import Button from './Button.jsx';

const ErrorMessage = ({ message, onRetry, showRetry = true, retryCount = 0 }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* Error Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Oops! Something went wrong
        </h3>

        {/* Error Message */}
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        {/* Retry Count */}
        {retryCount > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700">
              Attempt {retryCount + 1} - The system is working to resolve this issue.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {showRetry && onRetry && (
            <Button 
              onClick={onRetry}
              variant="primary"
              className="w-full"
            >
              Try Again
            </Button>
          )}
          
          <Button 
            onClick={() => window.location.href = '/'}
            variant="secondary"
            className="w-full"
          >
            Go Home
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If the problem persists, please check your internet connection or try again later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;