import React from 'react';

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  showBackground?: boolean;
}

/**
 * LoadingScreen Component
 * 
 * A reusable loading component that displays the anime.gif animation.
 * 
 * Usage Examples:
 * 
 * // Full screen loading (like Dashboard)
 * <LoadingScreen 
 *   message="Loading your dashboard..."
 *   subMessage="Please wait while we prepare your experience"
 *   size="md"
 *   showBackground={true}
 * />
 * 
 * // Inline loading (for components)
 * <LoadingScreen 
 *   message="Loading data..."
 *   size="sm"
 *   showBackground={false}
 * />
 * 
 * // Large loading (for page transitions)
 * <LoadingScreen 
 *   message="Processing your request..."
 *   subMessage="This may take a few moments"
 *   size="lg"
 * />
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading...", 
  subMessage,
  size = 'md',
  showBackground = true 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  const containerClasses = showBackground 
    ? "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-600"
    : "flex items-center justify-center";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className={`${sizeClasses[size]} mx-auto mb-6`}>
          <img 
            src="/anime.gif" 
            alt="Loading Animation" 
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <p className="text-white text-lg font-medium">{message}</p>
        {subMessage && (
          <p className="text-blue-200 text-sm mt-2">{subMessage}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen; 