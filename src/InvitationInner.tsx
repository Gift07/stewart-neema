import { CoverAmbient } from './CoverAmbient';
import {
  formatClock,
  formatEventParts,
  guestDisplayName,
  invitationQrUrl,
  partnerFirstName,
  type PublicInvitation,
} from './invitation';

const PHOTOS = {
  left: '/IMG_9369s.jpg',
  center: '/IMG_9388q.jpg',
  right: '/IMG_9374s.jpg',
} as const;

type Props = {
  invitation: PublicInvitation;
};

function MapPinIcon() {
  return (
    <svg className="mt-0.5 size-3.5 shrink-0 text-ink/70" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

type HostSide = {
  key: string;
  honorific?: string;
  names: string[];
  place?: string;
};

/** Split "Left family || Right family" (lines inside each side) into two parent columns. */
function parseHostColumns(contactName?: string): HostSide[] | null {
  const raw = contactName?.trim();
  if (!raw || !raw.includes('||')) return null;

  const sides = raw.split('||').map((side) => side.trim()).filter(Boolean);
  if (sides.length !== 2) return null;

  return sides.map((side, index) => {
    const lines = side.split(/\n|;/).map((line) => line.trim()).filter(Boolean);
    const honorific = lines[0]?.match(/^(mr\.?\s*&?\s*mrs\.?|mr\.?|mrs\.?|ms\.?)$/i)
      ? lines[0]
      : undefined;
    const rest = honorific ? lines.slice(1) : lines;
    const place = rest.length > 1 ? rest[rest.length - 1] : undefined;
    const names = place ? rest.slice(0, -1) : rest;
    return {
      key: index === 0 ? 'groom-hosts' : 'bride-hosts',
      honorific,
      names: names.length ? names : [side],
      place,
    };
  });
}

export function InvitationInner({ invitation }: Props) {
  const event = formatEventParts(invitation.eventDate, invitation.eventTime);
  const guestName = guestDisplayName(invitation);
  const { cardUrl, qrUrl } = invitationQrUrl(invitation);
  const ceremonyClock = (invitation.eventTime || '').slice(0, 5) || event.time;
  const receptionTime = formatClock(invitation.receptionTime);
  const one = partnerFirstName(invitation.partnerOne);
  const two = partnerFirstName(invitation.partnerTwo);
  const saveTheDate = `${event.day} ${event.month} ${event.year}`.toUpperCase();
  const monthShort = (event.month || '').slice(0, 3).toUpperCase();
  const hostColumns = parseHostColumns(invitation.contactName);

  const scrollToTicket = () => {
    document.getElementById('guest-ticket')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="animate-inner-in relative min-h-screen overflow-x-hidden bg-cream text-ink">
      <CoverAmbient />

      {/* First section — save the date collage */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pb-14 lg:pt-20">
        <header className="mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="m-0 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-ink/80 sm:text-[0.75rem]">
            We are getting married
          </p>
          <h1 className="mt-3 mb-0 font-script text-[clamp(2.75rem,10vw,5.25rem)] leading-none text-ink">
            {one} &amp; {two}
          </h1>
        </header>

        <div className="mx-auto grid max-w-md grid-cols-1 items-start gap-10 sm:max-w-lg md:max-w-none md:grid-cols-3 md:gap-5 lg:gap-8 xl:gap-10">
          {/* Left arch */}
          <div className="order-2 flex flex-col md:order-1 md:pt-10 lg:pt-12">
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-t-full bg-white shadow-[0_12px_30px_rgba(58,47,40,0.08)] md:max-w-none">
              <img
                src={PHOTOS.left}
                alt=""
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <p className="mt-5 mb-0 font-serif text-[0.95rem] italic leading-relaxed text-muted md:text-[0.98rem] lg:text-[1.05rem]">
              Dear {guestName}, with joyful hearts we invite you to share in our celebration of love.
            </p>
            <p className="mt-4 mb-0 flex items-start gap-2 text-[0.82rem] text-ink/75 lg:text-[0.88rem]">
              <MapPinIcon />
              <span>{invitation.churchVenue || 'Ceremony venue'}</span>
            </p>
          </div>

          {/* Center portrait */}
          <div className="order-1 flex flex-col items-center md:order-2">
            <div className="mx-auto w-full max-w-[300px] overflow-hidden bg-white shadow-[0_16px_36px_rgba(58,47,40,0.1)] md:max-w-none">
              <img
                src={PHOTOS.center}
                alt={invitation.coupleNames}
                className="aspect-[3/4.4] w-full object-cover"
              />
            </div>
            <p className="mt-5 mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-ink/70 sm:text-[0.72rem]">
              Save the date
            </p>
            <p className="m-0 font-serif text-[1.05rem] tracking-[0.12em] text-ink sm:text-[1.12rem]">
              {saveTheDate}
            </p>
          </div>

          {/* Right arch */}
          <div className="relative order-3 flex flex-col pb-4 md:pt-10 lg:pt-12 lg:pb-28">
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-t-full bg-white shadow-[0_12px_30px_rgba(58,47,40,0.08)] md:max-w-none">
              <img
                src={PHOTOS.right}
                alt=""
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <div className="relative mt-5">
              <span
                className="pointer-events-none absolute -left-1 -top-6 font-serif text-7xl leading-none text-ink/10"
                aria-hidden
              >
                “
              </span>
              <p className="relative m-0 font-serif text-[0.95rem] italic leading-relaxed text-muted md:text-[0.98rem] lg:text-[1.05rem]">
                {invitation.partySize > 0
                  ? `${invitation.partySize} ${invitation.partySize === 1 ? 'seat is' : 'seats are'} reserved for you. We cannot wait to celebrate together.`
                  : 'We cannot wait to celebrate this day together with you.'}
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToTicket}
              className="relative mx-auto mt-8 flex size-[108px] cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-[#e8e0d4] text-ink shadow-sm transition hover:bg-[#ddd4c6] lg:absolute lg:right-0 lg:bottom-0 lg:mx-0"
              aria-label="View your invitation details"
            >
              <svg
                className="absolute inset-0 size-full -rotate-12 p-1.5 text-[0.52rem] font-semibold uppercase tracking-[0.18em]"
                viewBox="0 0 100 100"
                aria-hidden
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                  />
                </defs>
                <text fill="currentColor">
                  <textPath href="#circlePath" startOffset="0%">
                    Your invite · View details ·
                  </textPath>
                </text>
              </svg>
              <span className="relative grid size-11 place-items-center rounded-full bg-[#d6cbb8] text-ink">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Details — stacks on phone, side-by-side on desktop */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-4 pt-2 sm:px-8 lg:px-10 lg:pt-6">
        <div className="mx-auto flex w-full max-w-[320px] flex-col items-stretch gap-4 sm:max-w-[360px] md:max-w-[400px] lg:max-w-none lg:flex-row lg:items-start lg:justify-center lg:gap-8 xl:gap-12">
          <div className="flex w-full flex-col gap-3 lg:max-w-[400px] lg:flex-1">
            <article className="relative flex flex-col items-center overflow-hidden rounded-t-[999px] bg-[#86a076] px-4 pb-6 pt-9 text-center text-white shadow-[0_14px_32px_rgba(58,47,40,0.14)] sm:px-6 sm:pb-7 sm:pt-10 md:px-7 md:pb-8 md:pt-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                }}
                aria-hidden
              />

              <div className="relative z-[1] flex w-full flex-col items-center">
                <p className="m-0 font-serif text-[0.68rem] font-semibold uppercase tracking-[0.22em] sm:text-[0.75rem]">
                  Ceremony info
                </p>

                {hostColumns ? (
                  <div className="mt-4 grid w-full grid-cols-2 gap-0 sm:mt-5">
                    {hostColumns.map((side, index) => (
                      <div
                        key={side.key}
                        className={
                          index === 0
                            ? 'border-r border-white/35 px-2 py-0.5 sm:px-3'
                            : 'px-2 py-0.5 sm:px-3'
                        }
                      >
                        {side.honorific ? (
                          <p className="m-0 font-serif text-[0.58rem] leading-tight text-white/90 sm:text-[0.65rem]">
                            {side.honorific}
                          </p>
                        ) : null}
                        {side.names.map((name) => (
                          <p
                            key={name}
                            className="m-0 font-serif text-[0.72rem] font-semibold leading-snug sm:text-[0.82rem]"
                          >
                            {name}
                          </p>
                        ))}
                        {side.place ? (
                          <p className="mt-0.5 mb-0 font-serif text-[0.55rem] leading-tight text-white/80 sm:text-[0.62rem]">
                            {side.place}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : invitation.contactName?.trim() ? (
                  <div className="mt-4 w-full px-1 sm:mt-5">
                    <p className="m-0 font-serif text-[0.78rem] leading-snug sm:text-[0.9rem]">
                      {invitation.contactName.trim()}
                    </p>
                    {invitation.contactPhone?.trim() ? (
                      <p className="mt-1 mb-0 text-[0.58rem] text-white/75 sm:text-[0.65rem]">
                        {invitation.contactPhone.trim()}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <p className="mt-4 mb-0 max-w-[240px] text-[0.52rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-white/92 sm:mt-5 sm:max-w-[280px] sm:text-[0.58rem]">
                  We joyfully announce the wedding of our children
                </p>

                <p className="mt-4 mb-0 font-serif text-[1.2rem] font-medium leading-snug tracking-wide sm:mt-5 sm:text-[1.45rem] md:text-[1.55rem]">
                  {invitation.partnerOne}
                </p>
                <p className="mt-1 mb-0 text-[0.48rem] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-[0.52rem]">
                  The groom
                </p>

                <p className="my-2 mb-0 font-serif text-lg leading-none text-white/90 sm:my-2.5 sm:text-xl">&amp;</p>

                <p className="m-0 font-serif text-[1.2rem] font-medium leading-snug tracking-wide sm:text-[1.45rem] md:text-[1.55rem]">
                  {invitation.partnerTwo}
                </p>
                <p className="mt-1 mb-0 text-[0.48rem] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-[0.52rem]">
                  The bride
                </p>

                <p className="mt-4 mb-0 max-w-[260px] text-[0.55rem] font-semibold uppercase leading-relaxed tracking-[0.12em] sm:mt-5 sm:max-w-[300px] sm:text-[0.62rem]">
                  Wedding ceremony at {invitation.churchVenue || 'the ceremony venue'}
                </p>

                <p className="mt-3 mb-0 text-[0.48rem] uppercase tracking-[0.18em] text-white/75 sm:text-[0.52rem]">At</p>
                <p className="mt-0.5 mb-0 font-serif text-[1.05rem] tracking-[0.1em] sm:text-[1.2rem]">
                  {ceremonyClock}
                </p>

                <p className="mt-3.5 mb-0 flex items-center justify-center gap-2 font-serif text-[0.72rem] tracking-[0.04em] sm:mt-4 sm:gap-2.5 sm:text-[0.85rem]">
                  <span>{(event.weekday || 'Day').toUpperCase()}</span>
                  <span className="h-2.5 w-px bg-white/55 sm:h-3" aria-hidden />
                  <span>{event.day || '—'}</span>
                  <span className="h-2.5 w-px bg-white/55 sm:h-3" aria-hidden />
                  <span>{monthShort}</span>
                </p>
                <p className="mt-1.5 mb-0 font-serif text-[0.88rem] tracking-[0.1em] sm:text-[1rem]">{event.year}</p>
              </div>
            </article>

            {invitation.receptionVenue?.trim() ? (
              <div className="rounded-xl border border-ink/8 bg-white/85 px-3.5 py-3 text-center backdrop-blur-sm sm:px-4 sm:py-3.5">
                <p className="mb-1 mt-0 text-[0.52rem] font-bold uppercase tracking-[0.18em] text-olive-soft sm:text-[0.58rem]">
                  Reception · Ukumbini
                </p>
                <p className="m-0 font-serif text-[0.98rem] leading-snug text-ink sm:text-[1.1rem]">
                  {invitation.receptionVenue.trim()}
                </p>
                <p className="mt-1 mb-0 text-[0.75rem] text-muted sm:text-[0.82rem]">
                  {receptionTime || 'Following the ceremony'}
                </p>
              </div>
            ) : null}
          </div>

          <div
            id="guest-ticket"
            className="w-full overflow-hidden rounded-[16px] bg-white shadow-[0_20px_48px_rgba(58,47,40,0.12)] sm:rounded-[18px] lg:max-w-[400px] lg:flex-1 lg:self-stretch"
          >
            <div className="bg-olive px-5 py-7 text-center text-white sm:px-6 sm:py-8">
              <p className="mb-1.5 mt-0 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/75">
                Admit
              </p>
              <h2 className="my-2 font-serif text-[1.55rem] font-medium sm:text-[1.75rem]">{guestName}</h2>
              <p className="m-0 text-[0.85rem] uppercase tracking-[0.06em] opacity-85">
                {invitation.partySize} {invitation.partySize === 1 ? 'seat' : 'seats'} reserved
              </p>
            </div>
            <div className="px-5 pb-8 pt-7 text-center sm:px-6 sm:pb-9 sm:pt-8">
              <img
                src={qrUrl}
                alt={`QR code for ${invitation.invitationCode}`}
                className="mx-auto size-40 rounded-xl border border-olive/20 bg-white p-2 sm:size-44"
              />
              <p className="mb-5 mt-3.5 text-[0.9rem] text-muted">Show this code at the entrance</p>
              <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-olive-soft">
                Entry code
              </p>
              <p className="mt-2 mb-0 break-all font-serif text-[1.4rem] tracking-[0.12em] sm:text-[1.55rem]">
                {invitation.invitationCode}
              </p>
              <p className="mt-2.5 mb-0 break-all text-[0.72rem] text-muted">{cardUrl}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-5 pb-12 pt-10 text-center text-olive sm:pt-12 lg:pb-16">
        <p className="m-0 text-[0.85rem] tracking-[0.28em]">
          {one.charAt(0)}
          <span className="mx-2.5 opacity-50">·</span>
          {two.charAt(0)}
        </p>
        <p className="mt-2.5 mb-0 text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          {one} &amp; {two}
        </p>
      </footer>
    </div>
  );
}
