import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [screenWidth, setWidth] = useState(window.innerWidth);
  const [screenHeight, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    let timeoutId: any = null;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }, 10);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    screenWidth,
    screenHeight,
    isMobile: screenWidth < 425,
    isTablet: screenWidth < 1024,
    isDesktop: screenWidth >= 1024,
  };
};

export default useScreenSize;
