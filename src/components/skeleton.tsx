// components/Skeleton.tsx
import React from "react";

interface SkeletonProps {
  width?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width }) => {
  return <div className={`animate-pulse bg-gray-300 rounded ${width}`} />;
};

export default Skeleton;
