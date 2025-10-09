import React from "react";

const Tag: React.FC = () => {
  return (
    <div className="relative inline-block px-6 py-3 animate-bounce-slow">
      {/* Background gradient */}
      <div className="absolute inset-0  -z-10 rounded-md"></div>

      {/* Sale tag container */}
      <div className="relative bg-red-600 text-white font-bold px-10 py-5 rounded-lg shadow-[6px_6px_0_#ffb300] overflow-hidden">
        {/* Animated shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>

        {/* Upper right yellow tag */}
        <div className="absolute -top-4 right-6 bg-yellow-400 text-black font-semibold px-3 py-1 rounded-md shadow-md text-sm">
          UP TO <span className="text-white">50%</span>
        </div>

        {/* Decorative yellow strips */}
        <div className="absolute -top-3 left-8 flex space-x-1">
          <div className="w-2 h-4 bg-yellow-400 rounded-sm"></div>
          <div className="w-2 h-4 bg-yellow-400 rounded-sm"></div>
        </div>

        {/* Sale text */}
        <h1 className="text-4xl tracking-wide relative z-10">MEGA SALE</h1>
      </div>

      {/* Red corner decorations */}
      <div className="absolute w-0 h-0 border-l-[10px] border-l-transparent border-b-[20px] border-b-red-600"></div>
      <div className="absolute -top-4 left-2 w-0 h-0 border-l-[10px] border-l-transparent border-b-[20px] border-b-red-600 rotate-[20deg]"></div>
    </div>
  );
};

export default Tag;
