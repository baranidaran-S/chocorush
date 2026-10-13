"use client";

// Hand-drawn SVG stand-ins shown until the real photos are added to public/images.
import { useId } from "react";

type IllustrationProps = { className?: string };

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
