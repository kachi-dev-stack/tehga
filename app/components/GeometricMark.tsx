"use client";

import { useEffect } from "react";

const GM_CSS = `
  @keyframes gm-extend {
    0%   { stroke-dashoffset: 500; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes gm-fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes gm-glow {
    0%, 100% { opacity: 0.7; }
    50%       { opacity: 1;   }
  }
  .gm-l1 { stroke-dasharray: 500; stroke-dashoffset: 500; animation: gm-extend 2.2s ease-out forwards 0.2s; }
  .gm-l2 { stroke-dasharray: 500; stroke-dashoffset: 500; animation: gm-extend 2.2s ease-out forwards 0.5s; }
  .gm-l3 { stroke-dasharray: 500; stroke-dashoffset: 500; animation: gm-extend 2.2s ease-out forwards 0.7s; }
  .gm-l4 { stroke-dasharray: 500; stroke-dashoffset: 500; animation: gm-extend 2.2s ease-out forwards 0.9s; }
  .gm-l5 { stroke-dasharray: 500; stroke-dashoffset: 500; animation: gm-extend 2.2s ease-out forwards 1.1s; }
  .gm-d  { opacity: 0; animation: gm-fadein 0.5s ease-out forwards; }
  .gm-d1 { animation-delay: 2.2s; }
  .gm-d2 { animation-delay: 2.5s; }
  .gm-d3 { animation-delay: 2.7s; }
  .gm-d4 { animation-delay: 2.9s; }
  .gm-d5 { animation-delay: 3.1s; }
  .gm-pulse { animation: gm-glow 2.8s ease-in-out infinite; }
`;

/** Africa-to-world reach visual — animated lines radiating from Africa to global markets. */
export function GeometricMark({ className = "" }: { className?: string }) {
  useEffect(() => {
    const id = "gm-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = GM_CSS;
      document.head.appendChild(tag);
    }
    return () => {
      document.getElementById("gm-styles")?.remove();
    };
  }, []);

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="gm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--forest)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--forest-deep)" stopOpacity="1" />
        </linearGradient>
        <pattern
          id="gm-dots"
          x="0"
          y="0"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="var(--ivory)" opacity="0.18" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="600" height="600" fill="url(#gm-grad)" />
      <rect width="600" height="600" fill="url(#gm-dots)" />

      {/* Cross lines */}
      <line
        x1="0"
        y1="300"
        x2="600"
        y2="300"
        stroke="var(--ivory)"
        strokeOpacity="0.10"
        strokeWidth="1"
      />
      <line
        x1="300"
        y1="0"
        x2="300"
        y2="600"
        stroke="var(--ivory)"
        strokeOpacity="0.10"
        strokeWidth="1"
      />

      {/* Concentric circles */}
      {[70, 120, 175, 230, 280].map((r, i) => (
        <circle
          key={r}
          cx="300"
          cy="300"
          r={r}
          fill="none"
          stroke="var(--ivory)"
          strokeOpacity={0.06 - i * 0.008}
          strokeWidth="1"
        />
      ))}

      {/* Africa silhouette centred at 300,300 */}
      <path
        d="
          M300,195 L318,198 L334,208 L344,224 L348,244
          L346,264 L352,282 L356,304 L350,328 L338,350
          L326,370 L316,388 L308,402 L300,415
          L292,402 L284,388 L274,370 L262,350
          L250,328 L244,304 L248,282 L254,264
          L252,244 L256,224 L266,208 L282,198 Z
        "
        fill="var(--forest)"
        stroke="var(--ivory)"
        strokeWidth="0.8"
        strokeOpacity="0.25"
      />

      {/* Origin dot — pulsing gold */}
      <circle
        className="gm-pulse"
        cx="300"
        cy="300"
        r="7"
        fill="var(--gold)"
        opacity="0.9"
      />
      <circle cx="300" cy="300" r="3.5" fill="var(--ivory)" />

      {/* Reach lines */}
      <path
        className="gm-l1"
        d="M300,300 Q240,210 152,108"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.2"
        strokeOpacity="0.55"
      />
      <path
        className="gm-l2"
        d="M300,300 Q200,270 108,228"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.0"
        strokeOpacity="0.45"
      />
      <path
        className="gm-l3"
        d="M300,300 Q380,210 468,112"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.2"
        strokeOpacity="0.55"
      />
      <path
        className="gm-l4"
        d="M300,300 Q420,290 510,268"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.0"
        strokeOpacity="0.45"
      />
      <path
        className="gm-l5"
        d="M300,300 Q220,400 148,490"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="0.8"
        strokeOpacity="0.30"
      />

      {/* Europe — top left */}
      <g className="gm-d gm-d1">
        <circle cx="152" cy="108" r="5" fill="var(--gold)" opacity="0.9" />
        <circle
          cx="152"
          cy="108"
          r="11"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
        <text
          x="152"
          y="88"
          textAnchor="middle"
          fontFamily="var(--font-display, Georgia, serif)"
          fontSize="10"
          fill="var(--ivory)"
          letterSpacing="2"
          opacity="0.85"
        >
          EUROPE
        </text>
      </g>

      {/* Americas — left */}
      <g className="gm-d gm-d2">
        <circle cx="108" cy="228" r="5" fill="var(--gold)" opacity="0.9" />
        <circle
          cx="108"
          cy="228"
          r="11"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
        <text
          x="108"
          y="208"
          textAnchor="middle"
          fontFamily="var(--font-display, Georgia, serif)"
          fontSize="10"
          fill="var(--ivory)"
          letterSpacing="2"
          opacity="0.85"
        >
          AMERICAS
        </text>
      </g>

      {/* Middle East — top right */}
      <g className="gm-d gm-d3">
        <circle cx="468" cy="112" r="5" fill="var(--gold)" opacity="0.9" />
        <circle
          cx="468"
          cy="112"
          r="11"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
        <text
          x="468"
          y="92"
          textAnchor="middle"
          fontFamily="var(--font-display, Georgia, serif)"
          fontSize="10"
          fill="var(--ivory)"
          letterSpacing="2"
          opacity="0.85"
        >
          MIDDLE EAST
        </text>
      </g>

      {/* Asia — right */}
      <g className="gm-d gm-d4">
        <circle cx="510" cy="268" r="5" fill="var(--gold)" opacity="0.9" />
        <circle
          cx="510"
          cy="268"
          r="11"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
        <text
          x="510"
          y="248"
          textAnchor="middle"
          fontFamily="var(--font-display, Georgia, serif)"
          fontSize="10"
          fill="var(--ivory)"
          letterSpacing="2"
          opacity="0.85"
        >
          ASIA
        </text>
      </g>

      {/* LatAm — bottom left */}
      <g className="gm-d gm-d5">
        <circle cx="148" cy="490" r="4" fill="var(--gold)" opacity="0.7" />
        <circle
          cx="148"
          cy="490"
          r="9"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
        <text
          x="148"
          y="516"
          textAnchor="middle"
          fontFamily="var(--font-display, Georgia, serif)"
          fontSize="10"
          fill="var(--ivory)"
          letterSpacing="2"
          opacity="0.75"
        >
          LATAM
        </text>
      </g>
    </svg>
  );
}
