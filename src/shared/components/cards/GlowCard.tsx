import React from "react";

interface GlowCardProps {
  title: string;
  value: string | number;
  badge?: string;
  className?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  title,
  value,
  badge,
  className = "",
}) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="p-1 bg-white/10 backdrop-blur-lg rounded-4xl border border-white/0 shadow-md transition duration-1000 group-hover:duration-200">
        <div className="relative bg-gradient-to-br from-purple-500 to-blue-600 rounded-4xl p-8 shadow-md">
          <div className="relative z-10">
            <div className="text-white/90 text-sm font-medium mb-4 flex items-center gap-2">
              {title}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="text-white text-6xl font-bold mb-3">{value}</div>

            {badge && (
              <span className="inline-block bg-cyan-400/90 text-cyan-900 text-xs font-semibold px-3 py-1.5 rounded-lg">
                {badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
