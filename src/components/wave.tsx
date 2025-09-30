import React from "react";
import waveImg from "@/assets/wave.png"; // put wave.png in your assets

interface WaveProps {
  title: string;
  subtitle?: string;
}

const Wave: React.FC<WaveProps> = ({ title, subtitle }) => {
  // dynamic font size adjustments
  // con() => {
  //   if (title.length > 80) return "text-[23px]";
  //   if (title.length > 55) return "text-[25px]";
  //   return "text-[35px]";
  // };

  // const getSubtitleClass = () => {
  //   if (!subtitle) return "";
  //   if (subtitle.length > 80) return "text-[17px]";
  //   if (subtitle.length > 55) return "text-[18px]";
  //   return "text-[20px]";
  // };

  return (
    <section className="relative w-full h-90 overflow-hidden bg-gradient-to-b from-ieee-darkblue to-[#519fff] mt-[-3px]">
      {/* Title */}
      <div className="flex flex-col text-center py-16 md:py-28 relative z-10">
        <h2
          className={`text-ieee-white font-bold text-[25px] uppercase mb-2`}
        >
          {title}
        </h2>
        {subtitle && (
          <h2
            className={`text-ieee-white text-[20px] mx-5 `}
          >
            {subtitle}
          </h2>
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

      {/* Local Styles */}
      <style>{`
        @keyframes wave1 {
          0% { background-position-x: 0; }
          100% { background-position-x: 1000px; }
        }
        @keyframes wave2 {
          0% { background-position-x: 0; }
          100% { background-position-x: -1000px; }
        }
        .wave1 { animation: wave1 30s linear infinite; }
        .wave2 { animation: wave2 15s linear infinite; }
        .wave3 { animation: wave1 30s linear infinite; animation-delay: -2s; }
        .wave4 { animation: wave2 15s linear infinite; animation-delay: -5s; }
      `}</style>
    </section>
  );
};

export default Wave;
