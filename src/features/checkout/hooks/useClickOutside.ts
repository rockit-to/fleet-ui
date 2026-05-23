import { useEffect, useRef } from 'react';

/**
 * Custom hook for handling click outside functionality
 * This is a common pattern for dropdowns, modals, and overlays in React apps
 */
export const useClickOutside = <T extends HTMLElement>(
  onClickOutside: () => void,
  isActive: boolean = true
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (ref.current && !ref.current.contains(target)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup listener on unmount or when isActive changes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside, isActive]);

  return ref;
};