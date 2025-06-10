import React from 'react';

/**
 * Circular progress ring
 *
 * @param {number} percent   0–100
 * @param {number} size      outer diameter in px
 * @param {number} stroke    ring thickness in px
 * @param {string} label     optional text under the ring
 */
export default function ProgressRing({ percent = 0, size = 100, stroke = 8, label }) {
  const pct   = Math.min(Math.max(percent, 0), 100);
  const radius        = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset        = circumference - (pct / 100) * circumference;

  return (
    <figure className="flex flex-col items-center mx-4">
      <svg width={size} height={size}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <text
          x="50%"
          y="50%"
          dy="0.35em"
          textAnchor="middle"
          fontSize="0.9rem"
          fill="#1f2937"
        >
          {Math.round(pct)}%
        </text>
      </svg>
      {label && (
        <figcaption className="text-sm text-gray-700 mt-1">{label}</figcaption>
      )}
    </figure>
  );
}
