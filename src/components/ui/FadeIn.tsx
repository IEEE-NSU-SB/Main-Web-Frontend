import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  zIndex?: number;
  xIndex?: number;
  yIndex?: number;
  threshold?: number; // how much of element is visible to trigger
  rootMargin?: string; // offset for triggering
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  zIndex = 0,
  xIndex = 0,
  yIndex = 20,
  threshold = 0.2,
  rootMargin = "0px",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold, rootMargin]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xIndex, y: yIndex }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: duration, ease: "backInOut", delay }}
      className={`${className} relative`}
      style={{ zIndex }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
