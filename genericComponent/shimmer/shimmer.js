import { useState, useEffect } from "react";

export default function Shimmer({ children, showShimmer, className }) {
  const [isShimmerVisible, setIsShimmerVisible] = useState(showShimmer);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    if (!showShimmer) {
      // Fade out shimmer first, then show content
      const fadeOutTimeout = setTimeout(() => {
        setIsShimmerVisible(false);
        setIsContentVisible(true);
      }, 300); // 1000ms fade-out time for shimmer

      return () => clearTimeout(fadeOutTimeout);
    } else {
      // Show shimmer and hide content immediately when needed
      setIsShimmerVisible(true);
      setIsContentVisible(false);
    }
  }, [showShimmer]);

  return (
    <div className={`relative h-full`}>
      {isShimmerVisible && (
        <div
          className={`absolute inset-0 rounded-lg transition-opacity duration-500 ease-in-out opacity-100  bg-gray-100 h-full w-full ${className} ${
            !showShimmer ? "opacity-0" : "opacity-100"
          }`}
        ></div>
      )}
      <div
        className={`h-full w-full transition-opacity duration-500 ease-in-out ${
          isContentVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
