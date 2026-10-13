"use client";

// Hand-drawn SVG stand-ins shown until the real photos are added to public/images.
import { useId } from "react";

type IllustrationProps = { className?: string };

const CAKE = { cx: 200, top: 176, rx: 132, ry: 30, band: 10 };

const CAKE_DRIPS = [
  { x: 84, r: 8, len: 34 },
  { x: 106, r: 9, len: 62 },
  { x: 132, r: 8, len: 38 },
  { x: 156, r: 10, len: 78 },
  { x: 182, r: 8, len: 44 },
  { x: 206, r: 10, len: 92 },
  { x: 232, r: 8, len: 52 },
  { x: 256, r: 9, len: 70 },
  { x: 280, r: 8, len: 40 },
  { x: 302, r: 9, len: 60 },
  { x: 322, r: 7, len: 30 },
];

function frontEdge(x: number) {
  const t = (x - CAKE.cx) / CAKE.rx;
  return CAKE.top + CAKE.ry * Math.sqrt(Math.max(0, 1 - t * t));
}

function dripDepth(x: number) {
  let depth = CAKE.band;
  for (const d of CAKE_DRIPS) {
    const dx = Math.abs(x - d.x);
    if (dx <= d.r) depth = Math.max(depth, d.len + Math.sqrt(d.r * d.r - dx * dx));
    else if (dx < d.r + 5) depth = Math.max(depth, CAKE.band + 6 * (1 - (dx - d.r) / 5) ** 2);
  }
  return depth;
}

// Ganache band hugging the front rim of the cake top, with drips running down the side.
const CAKE_DRIP_PATH = (() => {
  const left = CAKE.cx - CAKE.rx;
  const right = CAKE.cx + CAKE.rx;
  const pts: string[] = [];
  for (let x = left; x <= right; x += 2) pts.push(`${x} ${(frontEdge(x) - 1).toFixed(1)}`);
  for (let x = right; x >= left; x -= 1) pts.push(`${x} ${(frontEdge(x) + dripDepth(x)).toFixed(1)}`);
  return `M${pts.join(" L")} Z`;
})();

function Berry({ x, y, s, r, fill }: { x: number; y: number; s: number; r: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 -14C11 -15 17 -6 15 4C13 13 5 19 0 20C-5 19 -13 13 -15 4C-17 -6 -11 -15 0 -14Z" fill={fill} />
      {[
        [-6, -4],
        [5, -5],
        [-1, 4],
        [7, 4],
        [-8, 6],
        [1, 12],
      ].map(([sx, sy]) => (
        <ellipse key={`${sx}${sy}`} cx={sx} cy={sy} rx={0.9} ry={1.4} fill="#ffe3a3" opacity={0.9} />
      ))}
      <path d="M0 -12L-9 -19L-3 -12L-12 -9L-1 -10L0 -18L1 -10L12 -9L3 -12L9 -19Z" fill="#4c9a4a" />
    </g>
  );
}

export function CakeIllustration({ className }: IllustrationProps) {
  const id = useId();
  const g = (name: string) => `${id}-${name}`;

  return (
    <svg viewBox="0 0 400 440" className={className} role="img" aria-label="Chocolate drip cake">
      <defs>
        <linearGradient id={g("body")} x1="0" x2="1">
          <stop offset="0" stopColor="#3b2116" />
          <stop offset="0.3" stopColor="#6e412b" />
          <stop offset="0.5" stopColor="#7a4a31" />
          <stop offset="0.8" stopColor="#4a2a1b" />
          <stop offset="1" stopColor="#2a170f" />
        </linearGradient>
        <radialGradient id={g("top")} cx="0.4" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#4a2a1b" />
          <stop offset="1" stopColor="#24130c" />
        </radialGradient>
        <linearGradient id={g("drip")} x1="0" x2="1">
          <stop offset="0" stopColor="#1f110b" />
          <stop offset="0.35" stopColor="#3b2116" />
          <stop offset="1" stopColor="#1a0e09" />
        </linearGradient>
        <linearGradient id={g("stand")} x1="0" x2="1">
          <stop offset="0" stopColor="#e3cba8" />
          <stop offset="0.4" stopColor="#fdf5e9" />
          <stop offset="1" stopColor="#d9bf98" />
        </linearGradient>
        <radialGradient id={g("truffle")} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#7a4a31" />
          <stop offset="1" stopColor="#24130c" />
        </radialGradient>
        <radialGradient id={g("berry")} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#ff6b81" />
          <stop offset="1" stopColor="#c81e3a" />
        </radialGradient>
      </defs>

      {/* stand */}
      <ellipse cx="200" cy="428" rx="64" ry="12" fill="#e3cba8" />
      <ellipse cx="200" cy="424" rx="64" ry="12" fill="#fbefdc" />
      <path d="M176 378C180 398 180 410 166 424H234C220 410 220 398 224 378Z" fill={`url(#${g("stand")})`} />
      <ellipse cx="200" cy="352" rx="168" ry="30" fill="#e3cba8" />
      <ellipse cx="200" cy="344" rx="168" ry="30" fill="#fdf5e9" />

      {/* cake */}
      <path d="M68 176V336A132 30 0 0 0 332 336V176Z" fill={`url(#${g("body")})`} />
      <rect x="92" y="214" width="10" height="110" rx="5" fill="#fff" opacity="0.07" />
      <ellipse cx={CAKE.cx} cy={CAKE.top} rx={CAKE.rx} ry={CAKE.ry} fill={`url(#${g("top")})`} />
      <ellipse cx="170" cy="168" rx="56" ry="9" fill="#fff" opacity="0.06" />
      <path d={CAKE_DRIP_PATH} fill={`url(#${g("drip")})`} />
      {CAKE_DRIPS.filter((_, i) => i % 2 === 1).map((d) => (
        <circle key={d.x} cx={d.x - d.r * 0.35} cy={frontEdge(d.x) + d.len + d.r * 0.2} r={2} fill="#fff" opacity={0.3} />
      ))}

      {/* toppings */}
      <polygon points="138,172 150,100 170,170" fill="#1f110b" />
      <polygon points="150,100 156,104 170,170 164,171" fill="#6e412b" opacity="0.6" />
      <polygon points="182,168 204,92 222,170" fill="#2a170f" />
      <polygon points="204,92 210,96 222,170 216,171" fill="#7a4a31" opacity="0.55" />
      <polygon points="232,174 258,118 268,178" fill="#fdf5e9" />
      <polygon points="258,118 268,178 262,178" fill="#e3cba8" />
      <polygon points="112,178 118,138 132,178" fill="#2a170f" />
      {[
        [122, 184, 14],
        [286, 186, 13],
        [196, 182, 13],
      ].map(([x, y, r]) => (
        <g key={x}>
          <circle cx={x} cy={y} r={r} fill={`url(#${g("truffle")})`} />
          <circle cx={x - r * 0.3} cy={y - r * 0.35} r={r * 0.22} fill="#fff" opacity={0.18} />
        </g>
      ))}
      <Berry x={158} y={190} s={1.15} r={-12} fill={`url(#${g("berry")})`} />
      <Berry x={246} y={192} s={1.05} r={10} fill={`url(#${g("berry")})`} />
      <Berry x={205} y={198} s={0.95} r={0} fill={`url(#${g("berry")})`} />
      {[
        [140, 196],
        [176, 202],
        [232, 203],
        [268, 198],
        [104, 190],
        [298, 194],
        [222, 178],
        [170, 176],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={1.8} fill="#e0a96d" />
      ))}
    </svg>
  );
}

export function StrawberryIllustration({ className }: IllustrationProps) {
  const id = useId();
  const berry = `${id}-berry`;
  const clip = `${id}-clip`;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <radialGradient id={berry} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#ff6b81" />
          <stop offset="1" stopColor="#c81e3a" />
        </radialGradient>
        <clipPath id={clip}>
          <path d="M50 18C72 16 86 32 82 52C78 72 62 88 50 92C38 88 22 72 18 52C14 32 28 16 50 18Z" />
        </clipPath>
      </defs>
      <path d="M50 18C72 16 86 32 82 52C78 72 62 88 50 92C38 88 22 72 18 52C14 32 28 16 50 18Z" fill={`url(#${berry})`} />
      {[
        [38, 34],
        [50, 30],
        [62, 34],
        [32, 46],
        [44, 44],
        [56, 44],
        [68, 46],
      ].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={1.3} ry={2.1} fill="#ffe3a3" opacity={0.9} />
      ))}
      <g clipPath={`url(#${clip})`}>
        <path d="M0 58Q12 51 25 58T50 58T75 58T100 58V100H0Z" fill="#2a170f" />
        <path d="M24 64Q30 61 36 64" stroke="#7a4a31" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
      <ellipse cx="37" cy="30" rx="5" ry="9" fill="#fff" opacity="0.22" transform="rotate(-30 37 30)" />
      <path d="M50 22L36 10L44 22L28 20L46 26L50 12L54 26L72 20L56 22L64 10Z" fill="#3f8f45" />
    </svg>
  );
}

export function ChocoChunkIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon points="18,38 58,22 86,40 48,58" fill="#6e412b" />
      <polygon points="18,38 48,58 46,82 16,62" fill="#3b2116" />
      <polygon points="48,58 86,40 84,46 87,52 83,58 84,64 46,82" fill="#2a170f" />
      <path d="M38 30L67 49M33 48L72 31" stroke="#54301f" strokeWidth="2" />
      <polygon points="24,40 52,28 56,30 28,42" fill="#fff" opacity="0.12" />
    </svg>
  );
}
