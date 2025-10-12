import React from "react";
import { motion } from "framer-motion";

interface FadeInRightProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  zIndex?: number;
  xIndex?: number;
  yIndex?: number;
}

const FadeInRight: React.FC<FadeInRightProps> = ({
  children,
  className = "",
  delay = 0,
  zIndex = 0,
  xIndex = 0,
  yIndex = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: xIndex, y: yIndex }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}  // animate only when in viewport
      viewport={{ once: true, amount: 0.4 }} // triggers once, when 30% visible
      transition={{ duration: 0.6, ease: "backInOut", delay: delay }}
      className={`${className} relative`}
      style={{ zIndex }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInRight;
