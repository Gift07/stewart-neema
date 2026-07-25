import { useEffect, useState } from 'react';

type Props = {
  eventDate: string;
  eventTime: string;
};

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getTargetMs(eventDate: string, eventTime: string) {
  const datePart = eventDate.slice(0, 10);
  const timePart = (eventTime || '00:00:00').slice(0, 8);
  const target = new Date(`${datePart}T${timePart}`);
  return Number.isNaN(target.getTime()) ? null : target.getTime();
}

function calcRemaining(targetMs: number): Remaining {
  const diff = Math.max(0, targetMs - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff <= 0,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[3.25rem] flex-col items-center sm:min-w-[4rem] md:min-w-[4.75rem]">
      <span className="font-serif text-[1.65rem] font-semibold leading-none tracking-wide text-[#4a3728] tabular-nums sm:text-[2.15rem] md:text-[2.6rem]">
        {value}
      </span>
      <span className="mt-1.5 font-serif text-[0.72rem] tracking-wide text-[#4a3728]/sm:text-[0.85rem] sm:mt-2">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span
      className="mb-5 self-center font-serif text-[1.35rem] font-semibold leading-none text-[#4a3728] sm:mb-6 sm:text-[1.75rem] md:text-[2rem]"
      aria-hidden
    >
      :
    </span>
  );
}

/** Soft watercolor-style floral cluster for countdown corners. */
function FloralCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="48" cy="118" rx="28" ry="14" fill="#9aaf88" opacity="0.45" transform="rotate(-28 48 118)" />
      <ellipse cx="78" cy="128" rx="32" ry="15" fill="#8fa47a" opacity="0.4" transform="rotate(18 78 128)" />
      <ellipse cx="108" cy="110" rx="24" ry="12" fill="#a9ba9d" opacity="0.5" transform="rotate(-12 108 110)" />
      <path
        d="M36 96c18-22 38-38 52-46"
        stroke="#6b7e51"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="92" cy="58" r="22" fill="#e8b4a2" opacity="0.75" />
      <circle cx="92" cy="58" r="11" fill="#d4896a" opacity="0.55" />
      <circle cx="92" cy="58" r="4.5" fill="#c56a4a" opacity="0.7" />
      <circle cx="58" cy="78" r="16" fill="#f0cfc0" opacity="0.8" />
      <circle cx="58" cy="78" r="7" fill="#e0a08a" opacity="0.55" />
      <circle cx="118" cy="82" r="14" fill="#f3d6c8" opacity="0.85" />
      <circle cx="118" cy="82" r="6" fill="#e2ad96" opacity="0.5" />
      <circle cx="74" cy="48" r="5" fill="#f7e8df" opacity="0.9" />
      <circle cx="108" cy="46" r="4" fill="#f7e8df" opacity="0.85" />
      <circle cx="42" cy="68" r="3.5" fill="#f5ddd2" opacity="0.8" />
      <circle cx="128" cy="62" r="3" fill="#f5ddd2" opacity="0.75" />
    </svg>
  );
}

export function WeddingCountdown({ eventDate, eventTime }: Props) {
  const targetMs = getTargetMs(eventDate, eventTime);
  const [remaining, setRemaining] = useState<Remaining>(() =>
    targetMs == null ? { days: 0, hours: 0, minutes: 0, seconds: 0, done: true } : calcRemaining(targetMs),
  );

  useEffect(() => {
    if (targetMs == null) return;
    setRemaining(calcRemaining(targetMs));
    const id = window.setInterval(() => setRemaining(calcRemaining(targetMs)), 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  const units = [
    { value: remaining.days, label: 'Days' },
    { value: remaining.hours, label: 'Hours' },
    { value: remaining.minutes, label: 'Minutes' },
    { value: remaining.seconds, label: 'Seconds' },
  ] as const;

  return (
    <section
      className="relative z-10 w-full overflow-hidden bg-[#e8d5c0] px-4 py-10 sm:px-8 sm:py-12 md:py-14"
      aria-label={remaining.done ? 'The wedding day is here' : 'Countdown until the wedding'}
    >
      <FloralCorner className="pointer-events-none absolute -bottom-2 -left-2 w-[7.5rem] sm:w-[9.5rem] md:w-[11rem]" />
      <FloralCorner className="pointer-events-none absolute -right-2 -top-2 w-[7.5rem] rotate-180 sm:w-[9.5rem] md:w-[11rem]" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-[#4a3728]">
        <div className="flex w-full max-w-md items-center gap-3 sm:max-w-lg sm:gap-4">
          <span className="h-px flex-1 bg-[#4a3728]/40" aria-hidden />
          <p className="m-0 shrink-0 font-script text-[1.85rem] leading-none sm:text-[2.35rem] md:text-[2.6rem]">
            Just
          </p>
          <span className="h-px flex-1 bg-[#4a3728]/40" aria-hidden />
        </div>

        <div className="mt-6 flex items-end justify-center gap-1.5 sm:mt-8 sm:gap-3 md:gap-4">
          {units.map((unit, index) => (
            <div key={unit.label} className="flex items-end gap-1.5 sm:gap-3 md:gap-4">
              {index > 0 ? <Colon /> : null}
              <Unit value={unit.value} label={unit.label} />
            </div>
          ))}
        </div>

        <p className="mt-6 mb-0 font-script text-[1.55rem] leading-none sm:mt-8 sm:text-[2rem] md:text-[2.25rem]">
          {remaining.done ? 'We Are Married' : 'Until We Get Married'}
        </p>
      </div>
    </section>
  );
}
