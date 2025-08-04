import React from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  showBackground?: boolean;
}

/**
 * LoadingScreen Component
 * 
 * A Quant Basket themed loading component featuring:
 * - Animated shopping basket with handles
 * - Floating currency coins (₹, ₿, $)
 * - Growing chart bars indicating financial growth
 * - Rising arrow showing upward trend
 * - Sparkle effects for premium feel
 * 
 * Usage Examples:
 * 
 * // Dashboard loading
 * <LoadingScreen 
 *   message="Loading your dashboard..."
 *   subMessage="Please wait while we prepare your Quant Basket experience"
 *   size="md"
 *   showBackground={true}
 * />
 * 
 * // Inline loading
 * <LoadingScreen 
 *   message="Loading data..."
 *   size="sm"
 *   showBackground={false}
 * />
 * 
 * // Large loading for page transitions
 * <LoadingScreen 
 *   message="Processing your request..."
 *   subMessage="This may take a few moments"
 *   size="lg"
 * />
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading your Quant Basket...", 
  subMessage,
  size = 'md',
  showBackground = true 
}) => {
  const sizeClasses = {
    sm: styles.loaderSmall,
    md: '',
    lg: styles.loaderLarge
  };

  const containerClasses = showBackground 
    ? "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-600"
    : "flex items-center justify-center";

  return (
    <div className={containerClasses}>
      <div className={`${styles.quantBasketLoader} ${sizeClasses[size]}`}>
        {/* Main Basket Container */}
        <div className={styles.basketContainer}>
          {/* Shopping Basket */}
          <div className={styles.basket}>
            {/* Basket Weaving Pattern */}
            <div className={styles.basketWeaving} />
            
            {/* Basket Slots */}
            <div className={styles.basketSlots}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={styles.basketSlot} />
              ))}
            </div>
            
            {/* Chart Bars */}
            <div className={styles.chartContainer}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className={styles.chartBar} />
              ))}
            </div>
          </div>

          {/* Currency Coins */}
          <div className={styles.coins}>
            <div className={styles.coin}>₹</div>
            <div className={styles.coin}>₿</div>
            <div className={styles.coin}>$</div>
          </div>

          {/* Rising Arrow */}
          <div className={styles.arrow}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M7 14L12 9L17 14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Sparkle Effects */}
          <div className={styles.sparkles}>
            <div className={styles.sparkle} />
            <div className={styles.sparkle} />
            <div className={styles.sparkle} />
            <div className={styles.sparkle} />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className={styles.loadingText}>{message}</p>
          {subMessage && (
            <p className={styles.subText}>{subMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 