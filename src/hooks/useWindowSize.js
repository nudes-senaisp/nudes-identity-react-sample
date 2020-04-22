import { useState, useEffect } from 'react';
import { getWindowCurrentBreakpoint } from '@/utils/window';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(() => {
    const { innerWidth: width, innerHeight: height } = window;
    const breakpoint = getWindowCurrentBreakpoint(width);

    return {
      width,
      height,
      breakpoint,
      isMobile: width < 768,
    };
  });

  useEffect(() => {
    const onResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getWindowCurrentBreakpoint(window.innerWidth),
        isMobile: window.innerWidth < 768,
      });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  return windowSize;
};

export default useWindowSize;
