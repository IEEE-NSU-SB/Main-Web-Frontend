// EventTypeBarChart.tsx
import React, { useState } from "react";

type Category =
  | "Non Technical"
  | "Technical"
  | "Professional"
  | "Humanitarian"
  | "Administrative";

const categories: Category[] = [
  "Non Technical",
  "Technical",
  "Professional",
  "Humanitarian",
  "Administrative",
];

const colors: Record<Category, string> = {
  "Non Technical": "#00629B",
  Technical: "#00629B",
  Professional: "#00629B",
  Humanitarian: "#00629B",
  Administrative: "#00629B",
};

const eventCounts: Record<Category, number> = {
  "Non Technical": 35,
  Technical: 50,
  Professional: 28,
  Humanitarian: 18,
  Administrative: 22,
};

// Yearly totals (example data — edit as needed)
const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
const yearlyCounts = [46, 52, 50, 55, 70, 82];

const EventTypeBarChart: React.FC = () => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const width = 600;
  const height = 300;
  const padding = 60;
  const maxValue = Math.max(...Object.values(eventCounts));
  const maxYearValue = Math.max(...yearlyCounts);

  return (
  <div className="flex flex-col md:flex-row gap-6 max-w-[1080px] mx-auto p-4">

    {/* ---------- FIRST (BAR) CHART ---------- */}
    <div className="p-6 bg-white w-full md:w-1/2 relative">
      <h2 className="text-2xl font-bold text-[#002855] mb-1">Number of Events by Type</h2>
      <p className="text-gray-600 mb-4 text-sm">Based on IEEE NSU SB Portal Data since 2020</p>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto overflow-visible"
      >
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
                className="cursor-pointer hover:opacity-90 transition-all duration-200"
                onMouseMove={(e) => setTooltip({ x: e.clientX + 10, y: e.clientY - 30, text: `${cat}: ${eventCounts[cat]}` })}
                onMouseLeave={() => setTooltip(null)}
              />
              <text x={x + barWidth / 2} y={height - padding + 18} textAnchor="middle" className="text-gray-700 text-xs font-medium">
                {cat}
              </text>
            </g>
          );
        })}
      </svg>
    </div>

    {/* ---------- SECOND (LINE) CHART ---------- */}
    <div className="p-6 bg-white w-full md:w-1/2 relative">
      <h2 className="text-2xl font-bold text-[#002855] mb-1">Yearly Event Numbers</h2>
      <p className="text-gray-600 mb-4 text-sm">Based on IEEE NSU SB Portal Data since 2020</p>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto overflow-visible"
      >
        {[0, 10, 20, 30, 40, 50, 60,70, 80,90].map((tick) => {
          const y = height - padding - (tick / maxYearValue) * (height - 2 * padding);
          return (
            <g key={tick}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#D1D5DB" strokeWidth={1} strokeDasharray="3" />
              <text x={padding - 12} y={y + 4} textAnchor="end" className="text-gray-500 text-xs">{tick}</text>
            </g>
          );
        })}

        <polyline
          fill="none"
          stroke="#00629B"
          strokeWidth="3"
          points={years.map((_, i) => {
            const x = padding + (i * (width - 2 * padding)) / (years.length - 1);
            const y = height - padding - (yearlyCounts[i] / maxYearValue) * (height - 2 * padding);
            return `${x},${y}`;
          }).join(" ")}
        />

        {years.map((year, i) => {
          const x = padding + (i * (width - 2 * padding)) / (years.length - 1);
          const y = height - padding - (yearlyCounts[i] / maxYearValue) * (height - 2 * padding);
          return (
            <circle
              key={year}
              cx={x}
              cy={y}
              r={5}
              fill="#FFC72C"
              className="cursor-pointer hover:scale-125 transition-transform"
              onMouseMove={(e) => setTooltip({ x: e.clientX + 10, y: e.clientY - 30, text: `${year}: ${yearlyCounts[i]}` })}
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}
      </svg>
    </div>

    {tooltip && (
      <div
        className="fixed z-50 bg-black/80 text-white text-xs px-2 py-1 rounded shadow pointer-events-none"
        style={{ top: tooltip.y, left: tooltip.x }}
      >
        {tooltip.text}
      </div>
    )}
  </div>
);

};

export default EventTypeBarChart;
