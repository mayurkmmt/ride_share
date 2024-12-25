import { useRef } from "react";

// Custom debounce hook
export const useDebounce = (callback: Function, delay: number) => {
  const debouncedFn = useRef<ReturnType<typeof setTimeout>>();

  const debouncedCallback = (...args: any[]) => {
    if (debouncedFn.current) {
      clearTimeout(debouncedFn.current);
    }

    debouncedFn.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};
