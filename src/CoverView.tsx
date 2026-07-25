import { CoverAmbient } from './CoverAmbient';
import { formatEventParts, guestDisplayName, partnerFirstName, type PublicInvitation } from './invitation';

type Props = {
  invitation: PublicInvitation;
  onOpen: () => void;
};

export function CoverView({ invitation, onOpen }: Props) {
  const event = formatEventParts(invitation.eventDate, invitation.eventTime);
  const one = partnerFirstName(invitation.partnerOne);
  const two = partnerFirstName(invitation.partnerTwo);
  const guest = guestDisplayName(invitation);

  return (
    <div className="relative min-h-screen overflow-hidden grid place-items-center px-[18px] py-7 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_88%_78%,rgba(255,255,255,0.2),transparent_30%),var(--color-sage)]">
      <CoverAmbient />

      <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center gap-5">
        <p className="animate-cover-in relative z-30 m-0 max-w-[280px] text-center text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-olive/70">
          A note for {guest}
        </p>

        <article className="animate-cover-in relative z-10 flex min-h-[min(560px,78vh)] w-full max-w-[380px] flex-col items-center justify-center overflow-visible bg-white px-8 pb-10 pt-14 text-center shadow-[0_28px_70px_rgba(42,51,36,0.22)]">
          <img
            src="/floral_corner.svg"
            alt=""
            className="pointer-events-none absolute -top-2 -right-[18px] z-[1] w-[150px] rotate-[8deg] opacity-95"
          />
          <img
            src="/floral_corner.svg"
            alt=""
            className="pointer-events-none absolute -bottom-2.5 -left-[22px] z-[1] w-[150px] rotate-[188deg] opacity-95"
          />

          <div
            className="relative z-[2] mb-7 grid size-[42px] place-items-center rounded-full bg-olive text-white"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 21s-6.7-4.35-9.33-7.4C.7 11.3 1.2 7.8 3.9 6.2c2-1.2 4.5-.5 5.8 1.3C11 6 13.1 5.1 15.2 6.2c2.7 1.5 3.2 5.1 1.2 7.4C18.7 16.65 12 21 12 21z" />
            </svg>
          </div>

          <h1 className="relative z-[2] m-0 font-serif text-[clamp(2.4rem,8vw,3.1rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            <span className="block">{one}</span>
            <span className="my-[0.08em] block text-[0.72em] text-olive-soft">&</span>
            <span className="block">{two}</span>
          </h1>

          <div
            className="relative z-[2] my-[22px] flex w-[min(220px,70%)] items-center gap-2.5 text-olive-soft"
            aria-hidden
          >
            <span className="h-px flex-1 bg-olive/35" />
            <svg viewBox="0 0 40 16" width="40" height="16">
              <path
                d="M2 8c6-6 10-6 18 0 8 6 12 6 18 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            <span className="h-px flex-1 bg-olive/35" />
          </div>

          <p className="relative z-[2] m-0 font-serif text-[1.15rem] text-ink">{event.longDate}</p>
          <p className="relative z-[2] mt-2.5 mb-0 font-serif text-[1.05rem] italic text-muted">
            Cordially Invites
          </p>

          <button
            type="button"
            className="relative z-30 mt-9 min-h-[46px] min-w-[148px] cursor-pointer rounded-[10px] border-0 bg-olive font-semibold tracking-[0.04em] text-white transition duration-180 hover:-translate-y-px hover:bg-[#4f5d3b] active:translate-y-0"
            onClick={onOpen}
          >
            Open
          </button>
        </article>

        <p className="animate-cover-in relative z-30 m-0 max-w-[300px] text-center font-serif text-[0.98rem] italic leading-relaxed text-olive/75">
          Open your invitation to see ceremony details, your reserved seats, and entry QR code.
        </p>
      </div>
    </div>
  );
}
