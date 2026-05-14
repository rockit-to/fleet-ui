import { memo } from "react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  onGoBack?: () => void;
}

/**
 * Error state component with retry functionality
 * Provides consistent error handling UI across the application
 */
export const ErrorState = memo<ErrorStateProps>(
  ({ error, onRetry, onGoBack }) => (
    <div className="section-mb80 checkout checkout_stays">
      <div className="checkout__center center">
        <div className="error-state">
          <div className="error-state__title">
            🚨 Unable to load booking details
          </div>
          <div className="error-state__message">{error}</div>
          <div className="error-state__actions">
            <button
              onClick={onRetry}
              className="error-state__button error-state__button--primary"
            >
              🔄 Try Again
            </button>
            {onGoBack && (
              <button
                onClick={onGoBack}
                className="error-state__button error-state__button--secondary"
              >
                â† Go Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
);

ErrorState.displayName = "ErrorState";
