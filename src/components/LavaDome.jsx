import React from "react";

// The half-circle behind the Hero photo, drawn as a dark purple lava lamp.
// Technique adapted from Luke Smetham's "Lava Lamp Animation" (codepen.io/lukesmetham/pen/yJVwVr):
// organic wax shapes with a radial gradient each, fused by a goo filter (blur + alpha threshold),
// clipped inside a dark glass shape, moving only up and down, slowly, with different durations
// so they drift in and out of sync. Motion is plain CSS (the `wax` keyframes in tailwind.config.js),
// so the global prefers-reduced-motion rule leaves a still picture.

// Smooth closed outline through `n` points around (cx, cy), radius varied per point for a hand-drawn look.
function blobPath(cx, cy, rx, ry, wobble) {
  const n = wobble.length;
  const pts = wobble.map((w, i) => {
    const a = (i / n) * Math.PI * 2;
    return [cx + Math.cos(a) * rx * w, cy + Math.sin(a) * ry * w];
  });
  // Catmull-Rom through the points, written as cubic Beziers
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

// base position (bottom of the travel), size, outline wobble, how far it rises, cycle length, start offset
const WAX = [
  // left of the photo
  { cx: 170, cy: 520, rx: 62, ry: 78, w: [1, 0.92, 1.06, 0.95, 1.04, 0.9, 1.08, 0.97], rise: -250, dur: 22, delay: -9 },
  { cx: 300, cy: 530, rx: 78, ry: 92, w: [0.95, 1.07, 0.92, 1.03, 0.97, 1.08, 0.9, 1.02], rise: -330, dur: 17, delay: -3 },
  { cx: 410, cy: 540, rx: 52, ry: 62, w: [1.06, 0.95, 1.02, 0.9, 1.04, 1.08, 0.94, 1.0], rise: -380, dur: 13, delay: -6 },
  // behind the photo (peeks out above the shoulders)
  { cx: 600, cy: 540, rx: 90, ry: 100, w: [1.04, 0.94, 1.0, 1.08, 0.92, 1.0, 1.05, 0.93], rise: -360, dur: 27, delay: -15 },
  // right of the photo
  { cx: 800, cy: 535, rx: 56, ry: 66, w: [0.98, 1.08, 0.93, 1.03, 0.95, 1.05, 1.0, 0.92], rise: -370, dur: 24, delay: -19 },
  { cx: 905, cy: 525, rx: 76, ry: 90, w: [0.93, 1.05, 0.98, 0.92, 1.07, 0.96, 1.02, 1.06], rise: -320, dur: 19, delay: -11 },
  { cx: 1035, cy: 525, rx: 58, ry: 72, w: [1.02, 0.94, 1.07, 0.96, 0.92, 1.05, 0.98, 1.04], rise: -230, dur: 15, delay: -2 },
];

// wide wavy wax resting on the bottom of the lamp
const POOL =
  "M-40,600 L-40,548 C80,520 170,560 290,540 C410,520 480,552 600,538 C720,524 800,556 920,540 C1040,524 1120,552 1240,536 L1240,600 Z";

function WaxShapes({ fill }) {
  return (
    <>
      <path
        d={POOL}
        fill={fill}
        className="animate-wax"
        style={{ "--dx": "40px", "--rise": "-6px", animationDuration: "17s", animationDelay: "-4s" }}
      />
      {WAX.map((b, i) => (
        <path
          key={i}
          d={blobPath(b.cx, b.cy, b.rx, b.ry, b.w)}
          fill={fill}
          className="animate-wax"
          style={{ "--rise": `${b.rise}px`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        />
      ))}
    </>
  );
}

// The wax leans toward the pointer: the parent sets --px and --py (-1 to 1) on a wrapping element.
// With reduced motion the lean is switched off.
const LEAN = {
  transform: "translate(calc(var(--px, 0) * 26px), calc(var(--py, 0) * 12px))",
  transition: "transform 1.6s cubic-bezier(0.2, 0.7, 0.2, 1)",
};

// The glass sheen sits on a nearer plane than the wax, so it shifts the other way.
const SHEEN_SHIFT = {
  transform: "translate(calc(var(--px, 0) * -10px), 0)",
  transition: LEAN.transition,
};

export default function LavaDome({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1200 600"
      aria-hidden="true"
      focusable="false"
      className={`drop-shadow-[0_0_40px_rgba(112,20,56,0.55)] ${className}`}
    >
      <defs>
        <clipPath id="lava-glass">
          <path d="M0,600 A600,600 0 0 1 1200,600 Z" />
        </clipPath>

        <radialGradient id="lava-bg" cx="600" cy="600" r="640" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5a1838" />
          <stop offset="0.45" stopColor="#3a0f27" />
          <stop offset="0.8" stopColor="#1e0614" />
          <stop offset="1" stopColor="#12040c" />
        </radialGradient>

        {/* each wax shape: warm rose core, wine body, dark rim */}
        <radialGradient id="lava-wax" cx="0.42" cy="0.38" r="0.66">
          <stop offset="0" stopColor="#e6a3bd" />
          <stop offset="0.3" stopColor="#b8436f" />
          <stop offset="0.62" stopColor="#8a1a47" />
          <stop offset="0.88" stopColor="#5a0f30" />
          <stop offset="1" stopColor="#3f0a22" />
        </radialGradient>

        <linearGradient id="lava-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* goo: blur the wax, then cut the alpha back to a sharp edge so touching shapes fuse */}
        <filter id="lava-goo" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9" />
        </filter>

        <filter id="lava-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>

      <g clipPath="url(#lava-glass)">
        {/* dark glass with a faint tint of the wax colour */}
        <rect width="1200" height="600" fill="url(#lava-bg)" />
        <rect width="1200" height="600" fill="#701438" opacity="0.10" />

        <g style={LEAN} className="motion-reduce:![transform:none]">
          {/* light the wax gives off into the glass */}
          <g filter="url(#lava-glow)" opacity="0.4">
            <WaxShapes fill="#a3305f" />
          </g>

          {/* the wax itself */}
          <g filter="url(#lava-goo)">
            <WaxShapes fill="url(#lava-wax)" />
          </g>
        </g>

        {/* glass sheen on the left */}
        <g style={SHEEN_SHIFT} className="motion-reduce:![transform:none]">
          <rect x="-20" width="1240" height="600" fill="url(#lava-sheen)" />
        </g>
      </g>

      {/* thin bright rim so it reads as glass */}
      <path d="M8,600 A592,592 0 0 1 1192,600" fill="none" stroke="#d58aa6" strokeOpacity="0.28" strokeWidth="3" />
    </svg>
  );
}
