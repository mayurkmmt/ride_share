import { useEffect, useRef, RefObject } from "react";

// Type for the handler function
type ClickOutsideHandler = () => void;

// Custom hook with type safety
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: ClickOutsideHandler
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    // Attach event listeners with proper types
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handler]);

  return ref;
};
