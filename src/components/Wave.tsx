import React from "react";
import waveImg from "@/assets/wave.png";

interface WaveProps {
  title: string;
  subtitle?: string;
  color?: string; // optional color prop
}

const Wave: React.FC<WaveProps> = ({ title, subtitle, color }) => {
  const gradientFrom = color || "#002855"; // default color
  const gradientTo = color || "#00629B"; // fallback for gradient end if needed

  return (
    <section
      className="relative w-full h-90 overflow-hidden mt-[-3px]"
      style={{
        background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {/* Title */}
      <div className="flex flex-col max-w-[1080px] m-auto justify-center gap-4 items-center text-center py-16 md:py-28 relative z-10">
        <h2 className="text-ieee-white font-bold text-[30px] uppercase mb-2 leading-7">
          {title}
        </h2>
        {subtitle && (
          <h2 className="max-w-[1050px] text-ieee-white text-[20px] mx-5">{subtitle}</h2>
        )}
      </div>

      {/* Waves */}
      <div
        className="absolute bottom-0 left-0 w-full h-[90px] opacity-100 z-10 wave wave1"
        style={{
          backgroundImage: `url(${waveImg})`,
          backgroundSize: "1000px 100px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-[100px] opacity-50 z-9 wave wave2"
        style={{
          backgroundImage: `url(${waveImg})`,
          backgroundSize: "1000px 100px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-[100px] opacity-20 z-8 wave wave3"
        style={{
          backgroundImage: `url(${waveImg})`,
          backgroundSize: "1000px 100px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-[100px] opacity-70 z-7 wave wave4"
        style={{
          backgroundImage: `url(${waveImg})`,
          backgroundSize: "1000px 100px",
          backgroundRepeat: "repeat-x",
        }}
      />

      <style>{`
        @keyframes wave1 { 0% { background-position-x: 0; } 100% { background-position-x: 1000px; } }
        @keyframes wave2 { 0% { background-position-x: 0; } 100% { background-position-x: -1000px; } }
        .wave1 { animation: wave1 30s linear infinite; }
        .wave2 { animation: wave2 15s linear infinite; }
        .wave3 { animation: wave1 30s linear infinite; animation-delay: -2s; }
        .wave4 { animation: wave2 15s linear infinite; animation-delay: -5s; }
      `}</style>
    </section>
  );
};

export default Wave;