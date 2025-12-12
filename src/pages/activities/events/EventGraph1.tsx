// EventTypeBarChart.tsx
import React, { useMemo, useState } from "react";
import { useFetchDataAPI } from "@/hooks/fetchdata"; // adjust import path if needed

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

// API response shape
type EventCountItem = { name: string; value: number };
type YearlyEvents = { years: number[]; count: number[] };
type EventsApiResponse = {
  eventCounts: EventCountItem[];
  yearlyEvents: YearlyEvents;
};

const EventTypeBarChart: React.FC = () => {
  // If your hook expects a relative apiUrl (it concatenates with api_domain),
  // pass "main_website/get_events_stats/". If you want to call full URL,
  // change the hook or pass the appropriate path.
  const { loading, data, error, refetch } = useFetchDataAPI<EventsApiResponse>({
    apiUrl: "main_website/get_events_stats/",
    method: "GET",
    autoFetch: true,
  });

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  // Map API data to the shapes used by the charts (with safe fallbacks)
  const eventCounts = useMemo(() => {
    const map: Record<Category, number> = {
      "Non Technical": 0,
      Technical: 0,
      Professional: 0,
      Humanitarian: 0,
      Administrative: 0,
    };

    if (!data?.eventCounts) return map;

    for (const item of data.eventCounts) {
      // match ignoring case and whitespace differences
      const normalized = item.name.trim().toLowerCase();
      const found = categories.find(
        (c) => c.toLowerCase() === normalized
      ) as Category | undefined;
      if (found) map[found] = item.value;
    }

    return map;
  }, [data]);

  const years = useMemo(() => {
    if (data?.yearlyEvents?.years && data.yearlyEvents.count) {
      return data.yearlyEvents.years.map((y) => String(y));
    }
    // fallback sample years if API not ready
    return ["2021", "2022", "2023", "2024", "2025"];
  }, [data]);

  const yearlyCounts = useMemo(() => {
    if (data?.yearlyEvents?.years && data.yearlyEvents.count) {
      return data.yearlyEvents.count.slice(0, data.yearlyEvents.years.length);
    }
    return [30, 29, 58, 53, 72];
  }, [data]);

  const width = 600;
  const height = 300;
  const padding = 60;
  const maxValue = Math.max(...Object.values(eventCounts), 1);
  const maxYearValue = Math.max(...yearlyCounts, 1);

  // Loading / error UI
  if (loading)
    return (
      <div className="p-6 bg-white w-full max-w-[1080px] mx-auto text-center">
        <p className="text-gray-600">Loading event statistics...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-white w-full max-w-[1080px] mx-auto text-center">
        <p className="text-red-600 mb-2">Failed to load stats: {error}</p>
        <button
          onClick={() => refetch()}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[1080px] mx-auto p-4">
      {/* ---------- FIRST (BAR) CHART ---------- */}
      <div className="p-6 bg-white w-full md:w-1/2 relative">
        <h2 className="text-2xl font-bold text-[#002855] mb-1">
          Number of Events by Type
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          Based on IEEE NSU SB Portal Data since 2020
        </p>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto overflow-visible"
        >
          {/* horizontal grid & ticks */}
          {Array.from(
            { length: Math.ceil(maxValue / 20) + 1 },
            (_, idx) => idx * 20
          ).map((tick) => {
            const y =
              height - padding - (tick / maxValue) * (height - 2 * padding);
            return (
              <g key={tick}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#D1D5DB"
                  strokeWidth={1}
                  strokeDasharray="3"
                />
                <text
                  x={padding - 12}
                  y={y + 4}
                  textAnchor="end"
                  className="text-gray-500 text-xs"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {categories.map((cat, i) => {
            const x =
              padding + (i * (width - 2 * padding)) / categories.length + 10;
            const barWidth = (width - 2 * padding) / categories.length - 20;
            const barHeight =
              (eventCounts[cat] / maxValue) * (height - 2 * padding);
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
                  onMouseMove={(e: React.MouseEvent<SVGRectElement>) =>
                    setTooltip({
                      x: e.clientX + 10,
                      y: e.clientY - 30,
                      text: `${cat}: ${eventCounts[cat]}`,
                    })
                  }
                  onMouseLeave={() => setTooltip(null)}
                />
                <text
                  x={x + barWidth / 2}
                  y={height - padding + 18}
                  textAnchor="middle"
                  className="text-gray-700 text-xs font-medium"
                >
                  {cat}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ---------- SECOND (LINE) CHART ---------- */}
      <div className="p-6 bg-white w-full md:w-1/2 relative">
        <h2 className="text-2xl font-bold text-[#002855] mb-1">
          Yearly Event Numbers
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          Based on IEEE NSU SB Portal Data since 2020
        </p>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto overflow-visible"
        >
          {Array.from(
            { length: Math.ceil(maxYearValue / 10) + 1 },
            (_, idx) => idx * 10
          ).map((tick) => {
            const y =
              height - padding - (tick / maxYearValue) * (height - 2 * padding);
            return (
              <g key={tick}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#D1D5DB"
                  strokeWidth={1}
                  strokeDasharray="3"
                />
                <text
                  x={padding - 12}
                  y={y + 4}
                  textAnchor="end"
                  className="text-gray-500 text-xs"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <polyline
            fill="none"
            stroke="#00629B"
            strokeWidth="3"
            points={years
              .map((_, i) => {
                const x =
                  padding + (i * (width - 2 * padding)) / (years.length - 1);
                const y =
                  height -
                  padding -
                  (yearlyCounts[i] / maxYearValue) * (height - 2 * padding);
                return `${x},${y}`;
              })
              .join(" ")}
          />

          {years.map((year, i) => {
            const x =
              padding + (i * (width - 2 * padding)) / (years.length - 1);
            const y =
              height -
              padding -
              (yearlyCounts[i] / maxYearValue) * (height - 2 * padding);
            return (
              <g key={year}>
                <circle
                  cx={x}
                  cy={y}
                  r={5}
                  fill="#FFC72C"
                  onMouseMove={(e: React.MouseEvent<SVGCircleElement>) =>
                    setTooltip({
                      x: e.clientX + 10,
                      y: e.clientY - 30,
                      text: `${year}: ${yearlyCounts[i]}`,
                    })
                  }
                  onMouseLeave={() => setTooltip(null)}
                />
                <text
                  x={x}
                  y={height - padding + 20}
                  textAnchor="middle"
                  className="text-gray-700 text-xs font-medium"
                >
                  {year}
                </text>
              </g>
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
