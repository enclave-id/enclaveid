import { useRef, useState, useEffect } from 'react';

// Dynamically get the width of an element
export function useElementWidth(): [React.RefObject<HTMLElement>, number] {
  const elementRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Function to update the width
    const updateWidth = () => {
      const currentWidth = elementRef.current
        ? (elementRef.current as HTMLElement).offsetWidth
        : 0;
      setWidth(currentWidth);
    };

    // Update width initially
    updateWidth();

    // Add event listener for window resize
    window.addEventListener('resize', updateWidth);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return [elementRef, width];
}
