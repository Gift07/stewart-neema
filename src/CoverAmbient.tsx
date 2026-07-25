/** Soft ambient butterflies + falling leaves across the full cover (including over the white card). */

const LEAVES = [
  { left: '6%', delay: '0s', duration: '13s', size: 14, drift: '-18px' },
  { left: '14%', delay: '1.8s', duration: '15s', size: 11, drift: '22px' },
  { left: '22%', delay: '4.5s', duration: '12s', size: 16, drift: '-28px' },
  { left: '30%', delay: '0.6s', duration: '16s', size: 12, drift: '16px' },
  { left: '38%', delay: '3s', duration: '14s', size: 15, drift: '-12px' },
  { left: '46%', delay: '5.8s', duration: '17s', size: 10, drift: '24px' },
  { left: '54%', delay: '2.1s', duration: '13.5s', size: 13, drift: '-20px' },
  { left: '62%', delay: '4s', duration: '15.5s', size: 12, drift: '14px' },
  { left: '70%', delay: '7.2s', duration: '14s', size: 11, drift: '10px' },
  { left: '78%', delay: '1.2s', duration: '18s', size: 14, drift: '-26px' },
  { left: '86%', delay: '6s', duration: '12.5s', size: 10, drift: '18px' },
  { left: '94%', delay: '9s', duration: '16s', size: 12, drift: '-14px' },
  { left: '34%', delay: '8.5s', duration: '15s', size: 9, drift: '8px' },
  { left: '58%', delay: '10s', duration: '13s', size: 13, drift: '-22px' },
  { left: '48%', delay: '11.5s', duration: '19s', size: 11, drift: '20px' },
] as const;

const BUTTERFLIES = [
  { top: '12%', left: '18%', delay: '0s', duration: '16s', scale: 1, path: 'a' },
  { top: '18%', left: '62%', delay: '2.5s', duration: '19s', scale: 0.9, path: 'b' },
  { top: '36%', left: '28%', delay: '5s', duration: '18s', scale: 1.05, path: 'c' },
  { top: '48%', left: '55%', delay: '1s', duration: '17s', scale: 0.85, path: 'a' },
  { top: '64%', left: '22%', delay: '3.5s', duration: '20s', scale: 0.95, path: 'b' },
  { top: '72%', left: '68%', delay: '6.5s', duration: '18s', scale: 1, path: 'c' },
  { top: '28%', left: '42%', delay: '8s', duration: '22s', scale: 0.8, path: 'a' },
  { top: '80%', left: '40%', delay: '4s', duration: '21s', scale: 0.9, path: 'b' },
] as const;

function LeafIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 20 28" fill="none" aria-hidden>
      <path
        d="M10 2C14 8 18 14 16 24C12 26 8 26 4 24C2 14 6 8 10 2Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path d="M10 4v18" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function ButterflyIcon({ scale = 1 }: { scale?: number }) {
  const size = 24 * scale;
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 40 34" fill="none" aria-hidden>
      <g className="butterfly-wings origin-center">
        <path
          d="M20 17C12 4 2 6 4 16c2 8 10 10 16 5"
          fill="currentColor"
          opacity="0.55"
        />
        <path
          d="M20 17C28 4 38 6 36 16c-2 8-10 10-16 5"
          fill="currentColor"
          opacity="0.55"
        />
        <path
          d="M20 18C14 24 8 28 10 22c2-4 6-6 10-4"
          fill="currentColor"
          opacity="0.4"
        />
        <path
          d="M20 18C26 24 32 28 30 22c-2-4-6-6-10-4"
          fill="currentColor"
          opacity="0.4"
        />
      </g>
      <ellipse cx="20" cy="17" rx="1.4" ry="5" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

export function CoverAmbient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden
    >
      {LEAVES.map((leaf, index) => (
        <span
          key={`leaf-${index}`}
          className="absolute top-[-8%] text-olive-soft/80 animate-leaf-fall drop-shadow-sm"
          style={{
            left: leaf.left,
            width: leaf.size,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
            ['--leaf-drift' as string]: leaf.drift,
          }}
        >
          <LeafIcon size={leaf.size} />
        </span>
      ))}

      {BUTTERFLIES.map((bug, index) => (
        <span
          key={`butterfly-${index}`}
          className={`absolute text-olive-soft/90 animate-butterfly-${bug.path} drop-shadow-sm`}
          style={{
            top: bug.top,
            left: bug.left,
            animationDelay: bug.delay,
            animationDuration: bug.duration,
          }}
        >
          <ButterflyIcon scale={bug.scale} />
        </span>
      ))}
    </div>
  );
}
