import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress((scrolled / total) * 100);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
      <div style={{ width: `${progress}%` }} className="h-1 bg-gradient-to-r from-primary to-accent transition-all duration-75" />
    </div>
  );
};

export default ScrollProgress;
