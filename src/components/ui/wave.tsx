const WAVE = "M0 40Q180 0 360 40T720 40T1080 40T1440 40T1800 40T2160 40T2520 40T2880 40V80H0Z";

/**
 * Two layers of waves flowing along the top edge of a section, rising into the section above.
 * `front` must be the section's own background colour (as a text-* class) so the waves blend in.
 */
export function Wave({ back, front }: { back: string; front: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0.5 h-14 -translate-y-full overflow-hidden sm:h-20">
      <svg
        viewBox="0 0 2880 80"
        preserveAspectRatio="none"
        className={`absolute bottom-0 left-0 h-full w-[200%] ${back} motion-safe:animate-[marquee_22s_linear_infinite_reverse]`}
      >
        <path d={WAVE} fill="currentColor" transform="translate(0 6)" />
      </svg>
      <svg
        viewBox="0 0 2880 80"
        preserveAspectRatio="none"
        className={`absolute bottom-0 left-0 h-full w-[200%] ${front} motion-safe:animate-[marquee_14s_linear_infinite]`}
      >
        <path d={WAVE} fill="currentColor" transform="translate(0 14)" />
      </svg>
    </div>
  );
}
