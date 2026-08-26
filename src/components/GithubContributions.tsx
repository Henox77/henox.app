"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ContributionDay {
  date: string;
  level: number;
  count: number;
  tooltip: string;
  dayOfWeek: number;
}

interface ContributionWeek {
  days: (ContributionDay | null)[];
}

interface MonthLabel {
  name: string;
  weekIndex: number;
}

interface ContributionData {
  username: string;
  total: number;
  totalText: string;
  weeks: ContributionWeek[];
  months: MonthLabel[];
  updatedAt: string;
}

export function GithubContributions() {
  const { t } = useLanguage();
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchContributions() {
      try {
        const res = await fetch("/api/github-contributions?username=Henox77");
        if (!res.ok) throw new Error("Failed to fetch contributions");
        const json = await res.json();
        if (isMounted) {
          if (json.success && json.data) {
            setData(json.data);
          } else {
            setError(true);
          }
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchContributions();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return (
      <div className="w-full mt-4 pt-1 font-mono text-[11px] text-purple-300/70 flex items-center justify-between">
        <a
          href="https://github.com/Henox77"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-100 transition-colors"
        >
          View real contributions on @Henox77 ↗
        </a>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="w-full mt-5 pt-1 space-y-2 select-none animate-pulse">
        <div className="h-3 w-48 bg-purple-500/10 rounded" />
        <div className="h-20 w-full max-w-[690px] bg-purple-950/30 rounded border border-purple-500/20" />
        <div className="h-3 w-64 bg-purple-500/10 rounded" />
      </div>
    );
  }

  const columnCount = data.weeks.length;

  return (
    <div className="w-full mt-5 pt-1 select-none">
      <div className="overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
        <div className="inline-block min-w-max">
          {/* Month Labels Header */}
          <div className="relative h-4 mb-1.5 font-mono text-[10px] text-purple-300/70">
            {data.months.map((m) => {
              const leftPos = m.weekIndex * 13;
              return (
                <span
                  key={`${m.name}-${m.weekIndex}`}
                  className="absolute top-0 transform -translate-x-0"
                  style={{ left: `${leftPos}px` }}
                >
                  {m.name}
                </span>
              );
            })}
          </div>

          {/* 7-Row Contribution Grid */}
          <div
            className="grid grid-flow-col grid-rows-7 gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
            }}
          >
            {data.weeks.map((week, weekIdx) =>
              week.days.map((day, dayIdx) => {
                if (!day) {
                  return (
                    <div
                      key={`empty-${weekIdx}-${dayIdx}`}
                      className="w-[10px] h-[10px] rounded-[2px] opacity-0"
                    />
                  );
                }

                // Electric purple level styles
                let cellColor = "rgba(168, 85, 247, 0.08)";
                if (day.level === 1) cellColor = "#3b0764";
                else if (day.level === 2) cellColor = "#6b21a8";
                else if (day.level === 3) cellColor = "#9333ea";
                else if (day.level === 4) cellColor = "#c084fc";

                return (
                  <div
                    key={day.date}
                    className="w-[10px] h-[10px] rounded-[2px] transition-transform duration-100 hover:scale-125 cursor-pointer relative group"
                    style={{ backgroundColor: cellColor }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredCell({
                        text: day.tooltip,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                  />
                );
              }),
            )}
          </div>
        </div>
      </div>

      {/* Total Contributions Subtitle */}
      <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] sm:text-xs text-purple-300/80">
        <div className="flex items-center gap-1.5">
          <span className="text-purple-400 font-medium">{t("total_contributions")}</span>
          <span className="text-purple-100 font-bold">{data.total.toLocaleString()}</span>
          <span className="text-purple-300/70">{t("in_last_year")}</span>
        </div>

        <a
          href="https://github.com/Henox77"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-300/70 hover:text-purple-100 transition-colors duration-150 text-[10px] sm:text-[11px]"
        >
          @Henox77 ↗
        </a>
      </div>

      {/* Floating Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-50 pointer-events-none px-2.5 py-1 bg-purple-950 text-purple-100 border border-purple-500/40 text-[11px] font-mono rounded-md shadow-xl backdrop-blur-md transform -translate-x-1/2 -translate-y-full -mt-2 whitespace-nowrap"
          style={{ left: `${hoveredCell.x}px`, top: `${hoveredCell.y}px` }}
        >
          {hoveredCell.text}
        </div>
      )}
    </div>
  );
}

export default GithubContributions;
