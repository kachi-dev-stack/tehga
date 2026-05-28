"use client";

import { useEffect } from "react";

const WWA_CSS = `
  @keyframes wwa-draw {
    from { stroke-dashoffset: 300; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes wwa-fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes wwa-pulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }
  .wwa-dr1 { stroke-dasharray: 300; stroke-dashoffset: 300; animation: wwa-draw 1.8s ease-out forwards 0.1s; }
  .wwa-dr2 { stroke-dasharray: 300; stroke-dashoffset: 300; animation: wwa-draw 1.8s ease-out forwards 0.4s; }
  .wwa-dr3 { stroke-dasharray: 300; stroke-dashoffset: 300; animation: wwa-draw 1.8s ease-out forwards 0.7s; }
  .wwa-dr4 { stroke-dasharray: 300; stroke-dashoffset: 300; animation: wwa-draw 1.8s ease-out forwards 1.0s; }
  .wwa-dr5 { stroke-dasharray: 300; stroke-dashoffset: 300; animation: wwa-draw 1.8s ease-out forwards 1.3s; }
  .wwa-fi1 { opacity: 0; animation: wwa-fadein 0.6s ease-out forwards 0.3s; }
  .wwa-fi2 { opacity: 0; animation: wwa-fadein 0.6s ease-out forwards 0.6s; }
  .wwa-fi3 { opacity: 0; animation: wwa-fadein 0.6s ease-out forwards 0.9s; }
  .wwa-fi4 { opacity: 0; animation: wwa-fadein 0.6s ease-out forwards 1.2s; }
  .wwa-fi5 { opacity: 0; animation: wwa-fadein 0.6s ease-out forwards 1.5s; }
  .wwa-fi6 { opacity: 0; animation: wwa-fadein 0.6s ease-out forwards 1.8s; }
  .wwa-cx  { opacity: 0; animation: wwa-fadein 0.6s ease-out forwards 2.0s; }
  .wwa-pulse { animation: wwa-pulse 3s ease-in-out infinite; }
`;

/** Who We Are mark — five discipline pillars radiating from TEHGA centre node. */
export function WhoWeAreMark({ className = "" }: { className?: string }) {
  useEffect(() => {
    const id = "wwa-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = WWA_CSS;
      document.head.appendChild(tag);
    }
    return () => {
      document.getElementById("wwa-styles")?.remove();
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
        <linearGradient id="wwa-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--forest)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--forest-deep)" stopOpacity="1" />
        </linearGradient>
        <pattern
          id="wwa-dots"
          x="0"
          y="0"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="var(--ivory)" opacity="0.15" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="600" height="600" fill="url(#wwa-grad)" />
      <rect width="600" height="600" fill="url(#wwa-dots)" />

      {/* ── Centre node ── */}
      <circle
        className="wwa-pulse"
        cx="300"
        cy="300"
        r="34"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1"
        strokeOpacity="0.25"
      />
      <circle
        cx="300"
        cy="300"
        r="22"
        fill="var(--forest)"
        stroke="var(--gold)"
        strokeWidth="1.2"
        strokeOpacity="0.65"
      />
      <circle cx="300" cy="300" r="5.5" fill="var(--gold)" />

      {/* ── STRATEGY — top ── */}
      <line
        className="wwa-dr1"
        x1="300"
        y1="278"
        x2="300"
        y2="138"
        stroke="var(--gold)"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <g className="wwa-fi1">
        <rect
          x="238"
          y="108"
          width="124"
          height="32"
          rx="2"
          fill="var(--forest)"
          stroke="var(--gold)"
          strokeWidth="0.6"
          strokeOpacity="0.45"
        />
        <text
          x="300"
          y="128"
          textAnchor="middle"
          fontFamily="var(--font-display, Georgia, serif)"
          fontSize="10"
          fill="var(--ivory)"
          letterSpacing="2"
          opacity="0.9"
        >
          STRATEGY
        </text>
      </g>

      {/* ── INTELLIGENCE — top right ── */}
      <line
        className="wwa-dr2"
        x1="318"
        y1="285"
        x2="448"
        y2="172"
        stroke="var(--gold)"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <g className="wwa-fi2">
        <rect
          x="432"
          y="142"
          width="148"
          height="32"
          rx="2"
          fill="var(--forest)"
          stroke="var(--gold)"
          strokeWidth="0.6"
          strokeOpacity="0.45"
        />
        <text
          x="506"
          y="162"
          textAnchor="middle"
          fontFamily="var(--font-display, Georgia, serif)"
          fontSize="10"
          fill="var(--ivory)"
          letterSpacing="2"
          opacity="0.9"
        >
          INTELLIGENCE
        </text>
      </g>

      {/* ── CAPITAL — bottom right ── */}
      <line
        className="wwa-dr3"
        x1="320"
        y1="312"
        x2="456"
        y2="408"
        stroke="var(--gold)"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <g className="wwa-fi3">
        <rect
          x="444"
          y="394"
          width="120"
          height="32"
          rx="2"
          fill="var(--forest)"
          stroke="var(--gold)"
          strokeWidth="0.6"
          strokeOpacity="0.45"
        />
        <text
          x="504"
          y="414"
          textAnchor="middle"
          fontFamily="var(--font-display, Georgia, serif)"
          fontSize="10"
          fill="var(--ivory)"
          letterSpacing="2"
          opacity="0.9"
        >
          CAPITAL
        </text>
      </g>

      {/* ── INFRASTRUCTURE — bottom left ── */}
      <line
        className="wwa-dr4"
        x1="280"
        y1="312"
        x2="148"
        y2="412"
        stroke="var(--gold)"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <g className="wwa-fi4">
        <rect
          x="18"
          y="398"
          width="162"
          height="32"
          rx="2"
          fill="var(--forest)"
          stroke="var(--gold)"
          strokeWidth="0.6"
          strokeOpacity="0.45"
        />
        <text
          x="99"
          y="418"
          textAnchor="middle"
          fontFamily="var(--font-display, Georgia, serif)"
          fontSize="10"
          fill="var(--ivory)"
          letterSpacing="2"
          opacity="0.9"
        >
          INFRASTRUCTURE
        </text>
      </g>

      {/* ── DIGITAL — top left ── */}
      <line
        className="wwa-dr5"
        x1="282"
        y1="285"
        x2="150"
        y2="172"
        stroke="var(--gold)"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <g className="wwa-fi5">
        <rect
          x="20"
          y="142"
          width="120"
          height="32"
          rx="2"
          fill="var(--forest)"
          stroke="var(--gold)"
          strokeWidth="0.6"
          strokeOpacity="0.45"
        />
        <text
          x="80"
          y="162"
          textAnchor="middle"
          fontFamily="var(--font-display, Georgia, serif)"
          fontSize="10"
          fill="var(--ivory)"
          letterSpacing="2"
          opacity="0.9"
        >
          DIGITAL
        </text>
      </g>

      {/* ── Interconnect dashes (shows disciplines work together) ── */}
      <g className="wwa-cx">
        <line
          x1="300"
          y1="138"
          x2="448"
          y2="172"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          strokeDasharray="4 5"
        />
        <line
          x1="448"
          y1="172"
          x2="456"
          y2="408"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          strokeDasharray="4 5"
        />
        <line
          x1="456"
          y1="408"
          x2="148"
          y2="412"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          strokeDasharray="4 5"
        />
        <line
          x1="148"
          y1="412"
          x2="150"
          y2="172"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          strokeDasharray="4 5"
        />
        <line
          x1="150"
          y1="172"
          x2="300"
          y2="138"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          strokeDasharray="4 5"
        />
      </g>

      {/* ── Centre label ── */}
      <g className="wwa-fi6">
        <text
          x="300"
          y="350"
          textAnchor="middle"
          fontFamily="var(--font-display, Georgia, serif)"
          fontSize="9"
          fill="var(--gold)"
          letterSpacing="2"
          opacity="0.55"
        >
          TEHGA
        </text>
      </g>

      {/* Bottom rule */}
      <line
        x1="100"
        y1="560"
        x2="500"
        y2="560"
        stroke="var(--ivory)"
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />
      <text
        x="300"
        y="578"
        textAnchor="middle"
        fontFamily="var(--font-display, Georgia, serif)"
        fontSize="9"
        fill="var(--ivory)"
        letterSpacing="3"
        opacity="0.4"
      >
        RESEARCH · ANALYSIS · FRAMEWORKS
      </text>
    </svg>
  );
}
