import React from 'react';
import { IoAlertCircle } from "react-icons/io5";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
      <IoAlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
      <p className="text-red-700 font-medium mb-2">Error</p>
      <p className="text-red-600 text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;