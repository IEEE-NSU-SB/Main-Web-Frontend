// EventTypeBarChart.tsx
import React, { useState } from "react";

const categories = [
  "Non Technical",
  "Technical",
  "Professional",
  "Humanitarian",
  "Administrative",
];

// IEEE Brand Colors
const colors: { [category: string]: string } = {
  "Non Technical": "#00629B",
  Technical: "#7AB8E1",
  Professional: "#FFC72C",
  Humanitarian: "#EF3E36",
  Administrative: "#53565A",
};

const eventCounts = {
  "Non Technical": 35,
  Technical: 50,
  Professional: 28,
  Humanitarian: 18,
  Administrative: 22,
};

// Yearly totals (example data — edit as needed)
const years = ["2020", "2021", "2022", "2023", "2024"];
const yearlyCounts = [30, 42, 55, 48, 60];

const EventTypeBarChart: React.FC = () => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const width = 600;
  const height = 300;
  const padding = 60;
  const maxValue = Math.max(...Object.values(eventCounts));
  const maxYearValue = Math.max(...yearlyCounts);

  return (
    <div className="flex max-w-[1080px] m-auto overflow-hidden">

      {/* ---------- FIRST (BAR) CHART ---------- */}
      <div className="p-6 bg-white w-full max-w-2xl mx-auto relative transition-all">
        <h2 className="text-2xl font-bold text-[#00629B] mb-1">Number of Events by Type</h2>
        <p className="text-gray-600 mb-4 text-sm">Based on IEEE NSU SB Portal Data since 2020</p>

        <svg width={width} height={height} className="overflow-visible">
          {[0, 10, 20, 30, 40, 50, 60].map((tick) => {
            const y = height - padding - (tick / maxValue) * (height - 2 * padding);
            return (
              <g key={tick}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#D1D5DB" strokeWidth={1} strokeDasharray="3" />
                <text x={padding - 12} y={y + 4} textAnchor="end" className="text-gray-500 text-xs">{tick}</text>
              </g>
            );
          })}

          {categories.map((cat, i) => {
            const x = padding + (i * (width - 2 * padding)) / categories.length + 10;
            const barWidth = (width - 2 * padding) / categories.length - 20;
            const barHeight = (eventCounts[cat] / maxValue) * (height - 2 * padding);
            const y = height - padding - barHeight;

            return (
              <g key={cat}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={colors[cat]}
                  rx={6}
                  className="cursor-pointer transition-all duration-200 hover:opacity-85 hover:scale-105 origin-bottom"
                  onMouseMove={(e) => setTooltip({ x: e.clientX + 10, y: e.clientY - 30, text: `${cat}: ${eventCounts[cat]}` })}
                  onMouseLeave={() => setTooltip(null)}
                  style={{ transformOrigin: "bottom", animation: "grow 0.6s ease-out" }}
                />

                <text x={x + barWidth / 2} y={height - padding + 18} textAnchor="middle" className="text-gray-700 text-sm font-medium">
                  {cat}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ---------- SECOND (LINE) CHART ---------- */}
      <div className="p-6 bg-white w-full max-w-2xl mx-auto relative transition-all">
        <h2 className="text-2xl font-bold text-[#00629B] mb-1">Yearly Event Numbers</h2>
        <p className="text-gray-600 mb-4 text-sm">Based on IEEE NSU SB Portal Data since 2020</p>

        <svg width={width} height={height} className="overflow-visible">

          {/* Grid */}
          {[0, 10, 20, 30, 40, 50, 60].map((tick) => {
            const y = height - padding - (tick / maxYearValue) * (height - 2 * padding);
            return (
              <g key={tick}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#D1D5DB" strokeWidth={1} strokeDasharray="3" />
                <text x={padding - 12} y={y + 4} textAnchor="end" className="text-gray-500 text-xs">{tick}</text>
              </g>
            );
          })}

          {/* Line Path */}
          <polyline
            fill="none"
            stroke="#00629B"
            strokeWidth="3"
            strokeLinecap="round"
            points={years
              .map((_, i) => {
                const x = padding + (i * (width - 2 * padding)) / (years.length - 1);
                const y = height - padding - (yearlyCounts[i] / maxYearValue) * (height - 2 * padding);
                return `${x},${y}`;
              })
              .join(" ")}
            style={{ animation: "draw 1.2s ease-out forwards" }}
          />

          {/* Points */}
          {years.map((year, i) => {
            const x = padding + (i * (width - 2 * padding)) / (years.length - 1);
            const y = height - padding - (yearlyCounts[i] / maxYearValue) * (height - 2 * padding);
            return (
              <g key={year}>
                <circle
                  cx={x}
                  cy={y}
                  r={5}
                  fill="#FFC72C"
                  className="cursor-pointer transition-all hover:scale-125"
                  onMouseMove={(e) => setTooltip({ x: e.clientX + 10, y: e.clientY - 30, text: `${year}: ${yearlyCounts[i]}` })}
                  onMouseLeave={() => setTooltip(null)}
                />
                <text x={x} y={height - padding + 18} textAnchor="middle" className="text-gray-700 text-sm font-medium">
                  {year}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {tooltip && (
        <div
          className="absolute bg-black/80 text-white text-xs px-2 py-1 rounded shadow pointer-events-none transition-all"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.text}
        </div>
      )}

      <style>{`
        @keyframes grow { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
        @keyframes draw { from { stroke-dasharray: 0 1000; } to { stroke-dasharray: 1000 0; } }
      `}</style>
    </div>
  );
};

export default EventTypeBarChart;
