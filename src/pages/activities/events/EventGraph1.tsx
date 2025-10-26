// EventTypeBarChart.tsx
import React, { useState } from "react";

const categories = [
  "Non Technical",
  "Technical",
  "Professional",
  "Humanitarian",
  "Administrative",
];

const colors: { [category: string]: string } = {
  "Non Technical": "#4F46E5",
  Technical: "#EC4899",
  Professional: "#10B981",
  Humanitarian: "#F59E0B",
  Administrative: "#3B82F6",
};

// Dummy event counts
const eventCounts: { [category: string]: number } = {
  "Non Technical": 35,
  Technical: 50,
  Professional: 28,
  Humanitarian: 18,
  Administrative: 22,
};

const EventTypeBarChart: React.FC = () => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const width = 600;
  const height = 300;
  const padding = 60;
  const maxValue = Math.max(...Object.values(eventCounts));

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-2xl mx-auto relative">
      <h2 className="text-2xl font-bold text-gray-700 mb-1">Number of Events by Type</h2>
      <p className="text-gray-500 mb-4 text-sm">
        Based on IEEE NSU SB Portal Data since 2020
      </p>
      <svg width={width} height={height} className="overflow-visible">
        {/* Y-axis lines */}
        {[0, 10, 20, 30, 40, 50, 60].map((tick) => {
          const y = height - padding - (tick / maxValue) * (height - 2 * padding);
          return (
            <g key={tick}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth={1}
              />
              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                className="text-gray-500 text-xs"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {categories.map((cat, i) => {
          const x = padding + (i * (width - 2 * padding)) / categories.length + 10;
          const barWidth = (width - 2 * padding) / categories.length - 20;
          const y =
            height -
            padding -
            (eventCounts[cat] / maxValue) * (height - 2 * padding);
          const barHeight = (eventCounts[cat] / maxValue) * (height - 2 * padding);
          return (
            <g key={cat}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={colors[cat]}
                className="cursor-pointer"
                onMouseEnter={(e) =>
                  setTooltip({
                    x: e.clientX,
                    y: e.clientY - 30,
                    text: `${cat}: ${eventCounts[cat]}`,
                  })
                }
                onMouseLeave={() => setTooltip(null)}
              />
              <text
                x={x + barWidth / 2}
                y={height - padding + 15}
                textAnchor="middle"
                className="text-gray-600 text-sm"
              >
                {cat}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default EventTypeBarChart;
