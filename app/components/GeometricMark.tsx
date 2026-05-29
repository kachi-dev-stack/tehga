"use client";

import { useEffect } from "react";

const GM_CSS = `
  @keyframes gm-extend {
    0%   { stroke-dashoffset: 700; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes gm-fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes gm-glow {
    0%, 100% { opacity: 0.6; }
    50%       { opacity: 1; }
  }
  .gm-l1 { stroke-dasharray: 700; stroke-dashoffset: 700; animation: gm-extend 2.2s ease-out forwards 0.2s; }
  .gm-l2 { stroke-dasharray: 700; stroke-dashoffset: 700; animation: gm-extend 2.2s ease-out forwards 0.5s; }
  .gm-l3 { stroke-dasharray: 700; stroke-dashoffset: 700; animation: gm-extend 2.2s ease-out forwards 0.8s; }
  .gm-l4 { stroke-dasharray: 700; stroke-dashoffset: 700; animation: gm-extend 2.2s ease-out forwards 1.0s; }
  .gm-l5 { stroke-dasharray: 700; stroke-dashoffset: 700; animation: gm-extend 2.2s ease-out forwards 1.2s; }
  .gm-d  { opacity: 0; animation: gm-fadein 0.5s ease-out forwards; }
  .gm-d1 { animation-delay: 2.2s; }
  .gm-d2 { animation-delay: 2.5s; }
  .gm-d3 { animation-delay: 2.8s; }
  .gm-d4 { animation-delay: 3.0s; }
  .gm-d5 { animation-delay: 3.2s; }
  .gm-pulse { animation: gm-glow 2.8s ease-in-out infinite; }
`;

/** Kente-inspired geometric mark — West Africa origin, lines to global markets. */
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
        <linearGradient id="gm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--forest, #1a3a2a)" />
          <stop offset="100%" stopColor="var(--forest-deep, #0e2016)" />
        </linearGradient>

        {/* Kente diamond tile */}
        <pattern
          id="gm-kente"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="40,4 76,40 40,76 4,40"
            fill="#162e1e"
            stroke="var(--gold,#c9b882)"
            strokeWidth="1.2"
            opacity="0.9"
          />
          <polygon
            points="40,14 66,40 40,66 14,40"
            fill="#1e4a2c"
            stroke="var(--gold,#c9b882)"
            strokeWidth="0.8"
            opacity="0.85"
          />
          <polygon
            points="40,24 56,40 40,56 24,40"
            fill="#1a3a2a"
            stroke="var(--gold,#c9b882)"
            strokeWidth="1"
            opacity="0.9"
          />
          <polygon
            points="40,32 48,40 40,48 32,40"
            fill="var(--gold,#c9b882)"
            opacity="0.22"
          />
          <polygon
            points="40,32 48,40 40,48 32,40"
            fill="none"
            stroke="var(--gold,#c9b882)"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <circle
            cx="40"
            cy="40"
            r="3"
            fill="var(--gold,#c9b882)"
            opacity="0.35"
          />
          <line
            x1="0"
            y1="40"
            x2="80"
            y2="40"
            stroke="var(--gold,#c9b882)"
            strokeWidth="0.4"
            opacity="0.12"
          />
          <line
            x1="40"
            y1="0"
            x2="40"
            y2="80"
            stroke="var(--gold,#c9b882)"
            strokeWidth="0.4"
            opacity="0.12"
          />
          <polyline
            points="0,20 10,28 20,20 30,28 40,20 50,28 60,20 70,28 80,20"
            fill="none"
            stroke="var(--gold,#c9b882)"
            strokeWidth="0.5"
            opacity="0.1"
          />
          <polyline
            points="0,60 10,52 20,60 30,52 40,60 50,52 60,60 70,52 80,60"
            fill="none"
            stroke="var(--gold,#c9b882)"
            strokeWidth="0.5"
            opacity="0.1"
          />
        </pattern>
      </defs>

      {/* 1 — Base + Kente pattern */}
      <rect width="600" height="600" fill="url(#gm-bg)" rx="4" />
      <rect width="600" height="600" fill="url(#gm-kente)" rx="4" />

      {/* 2 — Lighter dark overlay — pattern visible but elements readable */}
      <rect width="600" height="600" fill="#0a1a0f" opacity="0.52" rx="4" />

      {/* 3 — Rings from origin */}
      <circle
        cx="148"
        cy="300"
        r="75"
        fill="none"
        stroke="var(--gold,#c9b882)"
        strokeWidth="0.6"
        strokeOpacity="0.14"
      />
      <circle
        cx="148"
        cy="300"
        r="150"
        fill="none"
        stroke="var(--gold,#c9b882)"
        strokeWidth="0.6"
        strokeOpacity="0.08"
      />
      <circle
        cx="148"
        cy="300"
        r="230"
        fill="none"
        stroke="var(--gold,#c9b882)"
        strokeWidth="0.6"
        strokeOpacity="0.05"
      />

      {/* 4 — Reach lines */}
      <path
        className="gm-l1"
        d="M148,300 Q230,185 330,65"
        fill="none"
        stroke="var(--gold,#c9b882)"
        strokeWidth="1.8"
        strokeOpacity="1"
      />
      <path
        className="gm-l2"
        d="M148,300 Q320,180 505,88"
        fill="none"
        stroke="var(--gold,#c9b882)"
        strokeWidth="1.6"
        strokeOpacity="0.95"
      />
      <path
        className="gm-l3"
        d="M148,300 Q380,272 572,210"
        fill="none"
        stroke="var(--gold,#c9b882)"
        strokeWidth="1.5"
        strokeOpacity="0.9"
      />
      <path
        className="gm-l4"
        d="M148,300 Q88,208 28,112"
        fill="none"
        stroke="var(--gold,#c9b882)"
        strokeWidth="1.6"
        strokeOpacity="0.95"
      />
      <path
        className="gm-l5"
        d="M148,300 Q88,420 52,490"
        fill="none"
        stroke="var(--gold,#c9b882)"
        strokeWidth="1.4"
        strokeOpacity="0.85"
      />

      {/* 5 — Origin dot */}
      <circle
        className="gm-pulse"
        cx="148"
        cy="300"
        r="20"
        fill="none"
        stroke="var(--gold,#c9b882)"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <circle
        cx="148"
        cy="300"
        r="11"
        fill="#0a1a0f"
        stroke="var(--gold,#c9b882)"
        strokeWidth="2.2"
        strokeOpacity="1"
      />
      <circle cx="148" cy="300" r="5" fill="var(--gold,#c9b882)" />

      {/* 6 — Destination labels */}

      {/* Europe */}
      <g className="gm-d gm-d1">
        <circle cx="330" cy="65" r="7" fill="var(--gold,#c9b882)" />
        <circle
          cx="330"
          cy="65"
          r="15"
          fill="none"
          stroke="var(--gold,#c9b882)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <text
          x="330"
          y="46"
          textAnchor="middle"
          fontFamily="var(--font-display,Georgia,serif)"
          fontSize="12"
          fill="var(--ivory,#e8dfc8)"
          letterSpacing="2"
        >
          EUROPE
        </text>
      </g>

      {/* Middle East */}
      <g className="gm-d gm-d2">
        <circle cx="505" cy="88" r="7" fill="var(--gold,#c9b882)" />
        <circle
          cx="505"
          cy="88"
          r="15"
          fill="none"
          stroke="var(--gold,#c9b882)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <text
          x="505"
          y="69"
          textAnchor="middle"
          fontFamily="var(--font-display,Georgia,serif)"
          fontSize="12"
          fill="var(--ivory,#e8dfc8)"
          letterSpacing="2"
        >
          MIDDLE EAST
        </text>
      </g>

      {/* Asia-Pacific */}
      <g className="gm-d gm-d3">
        <circle cx="572" cy="210" r="7" fill="var(--gold,#c9b882)" />
        <circle
          cx="572"
          cy="210"
          r="15"
          fill="none"
          stroke="var(--gold,#c9b882)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <text
          x="572"
          y="191"
          textAnchor="middle"
          fontFamily="var(--font-display,Georgia,serif)"
          fontSize="12"
          fill="var(--ivory,#e8dfc8)"
          letterSpacing="2"
        >
          ASIA
        </text>
      </g>

      {/* North America */}
      <g className="gm-d gm-d4">
        <circle cx="28" cy="112" r="7" fill="var(--gold,#c9b882)" />
        <circle
          cx="28"
          cy="112"
          r="15"
          fill="none"
          stroke="var(--gold,#c9b882)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <text
          x="28"
          y="93"
          textAnchor="middle"
          fontFamily="var(--font-display,Georgia,serif)"
          fontSize="12"
          fill="var(--ivory,#e8dfc8)"
          letterSpacing="2"
        >
          N. AMERICA
        </text>
      </g>

      {/* Latin America — label above dot, dot moved up from edge */}
      <g className="gm-d gm-d5">
        <circle cx="52" cy="490" r="6" fill="var(--gold,#c9b882)" />
        <circle
          cx="52"
          cy="490"
          r="13"
          fill="none"
          stroke="var(--gold,#c9b882)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        {/* Label above the dot */}
        <text
          x="52"
          y="468"
          textAnchor="middle"
          fontFamily="var(--font-display,Georgia,serif)"
          fontSize="12"
          fill="var(--ivory,#e8dfc8)"
          letterSpacing="2"
        >
          LATAM
        </text>
      </g>
    </svg>
  );
}
