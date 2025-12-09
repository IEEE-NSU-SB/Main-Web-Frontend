"use client";

import * as React from "react";
//hello
interface Props {
  children: React.ReactNode[];
  radius?: number;
  speed?: number;
  iconSize?: number;
  tilt?: number;
}

export function OrbitingCircles({
  children,
  radius = 120,
  speed = 12,
  iconSize = 60,
  tilt = 6,
}: Props) {
  
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check(); 
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const finalRadius = isMobile ? radius * 0.65 : radius;
  const finalIcon = isMobile ? iconSize * 0.7 : iconSize;

  const total = children.length;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      
      {/* Outer ring */}
      <div
        className="absolute rounded-full border border-gray-300/40"
        style={{
          width: finalRadius * 2,
          height: finalRadius * 2,
        }}
      />

      <style>{`
        @keyframes orbitCircle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes stayStraight {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>

      {/* Rotating container */}
      <div
        style={{
          width: finalRadius * 2,
          height: finalRadius * 2,
          position: "absolute",
          animation: `orbitCircle ${speed}s linear infinite`,
        }}
      >
        {children.map((child, i) => {
          const angle = (i / total) * 2 * Math.PI;
          const x = finalRadius + finalRadius * Math.cos(angle) - finalIcon / 2;
          const y = finalRadius + finalRadius * Math.sin(angle) - finalIcon / 2;

          return (
            <div
              key={i}
              style={{
                width: finalIcon,
                height: finalIcon,
                position: "absolute",
                left: x,
                top: y,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: `stayStraight ${speed}s linear infinite`,
                  transform: `rotate(${tilt}deg)`,
                }}
              >
                {child}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
