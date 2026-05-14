import { memo } from 'react';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
}

/**
 * Loading state component with spinner animation
 * Memoized to prevent unnecessary re-renders
 */
export const LoadingState = memo<LoadingStateProps>(({ 
  message = "Loading booking details...",
  subMessage = "Please wait while we fetch your information"
}) => (
  <div className="section-mb80 checkout checkout_stays">
    <div className="checkout__center center">
      <div className="loading-state">
        <div className="loading-state__spinner" />
        <div className="loading-state__text">
          {message}
        </div>
        <div className="loading-state__subtext">
          {subMessage}
        </div>
      </div>
    </div>
  </div>
));

LoadingState.displayName = 'LoadingState';