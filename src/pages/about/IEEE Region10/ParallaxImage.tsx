// components/ParallaxSection.tsx
import React, { useEffect, useState } from 'react';

interface ParallaxSectionProps {
  imageUrl: string;
  height?: string; // Optional custom height
  children?: React.ReactNode;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  imageUrl,
  height = '500px',
  children,
}) => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-300"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translateY(${offsetY * 0.5}px)`,
        }}
      />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
