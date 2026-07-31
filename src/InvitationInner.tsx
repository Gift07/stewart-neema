import { useState } from 'react';
import { CoverAmbient } from './CoverAmbient';
import { CoupleTrivia } from './CoupleTrivia';
import { DayTimeline } from './DayTimeline';
import { DressColours } from './DressColours';
import {
  formatClock,
  formatEventParts,
  guestDisplayName,
  invitationQrUrl,
  partnerFirstName,
  type PublicInvitation,
} from './invitation';
import { MusicToggle } from './MusicToggle';
import { WeddingCountdown } from './WeddingCountdown';
import { WellWishes } from './WellWishes';

const PHOTOS = {
  left: '/pic1.jpg',
  center: '/pic2.jpg',
  right: '/IMG_9374s.jpg',
} as const;

type Props = {
  invitation: PublicInvitation;
};

function MapPinIcon({ className = 'mt-0.5 size-4 shrink-0 text-ink/70' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const CEREMONY_MAP_URL = 'https://maps.app.goo.gl/91Zr8uQ1SnUAUssE7';
const RECEPTION_MAP_URL = 'https://maps.app.goo.gl/mBpkfdR2hTHCjbAu9';
const CONTACT_PHONE = '+255 620 360 999';

function phoneTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
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
  const receptionClock =
    (invitation.receptionTime || '').slice(0, 5) || formatClock(invitation.receptionTime);
  const receptionTime = formatClock(invitation.receptionTime);
  const one = partnerFirstName(invitation.partnerOne);
  const two = partnerFirstName(invitation.partnerTwo);
  const saveTheDate = `${event.day} ${event.month} ${event.year}`.toUpperCase();
  const monthShort = (event.month || '').slice(0, 3).toUpperCase();
  const hostColumns = parseHostColumns(invitation.contactName);
  const contactPhone = invitation.contactPhone?.trim() || CONTACT_PHONE;
  const contactTelHref = phoneTelHref(contactPhone);
  const [rsvpChoice, setRsvpChoice] = useState<'accept' | 'love' | null>(null);
  const [rsvpSent, setRsvpSent] = useState(false);

  const scrollToTicket = () => {
    document.getElementById('guest-ticket')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const timelineItems = [
    {
      time: ceremonyClock || '13:00',
      title: 'Wedding Ceremony',
      detail: invitation.churchVenue || 'Ceremony venue',
    },
    {
      time: receptionClock || 'Later',
      title: 'Reception · Ukumbini',
      detail: invitation.receptionVenue || 'Reception venue',
    },
    {
      time: '18:00',
      title: 'Dinner',
      detail: 'Reception service begins',
    },
    {
      time: '20:00',
      title: 'Celebration',
      detail: 'Music, dancing and memories',
    },
  ];

  return (
    <div className="animate-inner-in relative min-h-screen overflow-x-hidden bg-cream text-ink">
      <CoverAmbient />
      <MusicToggle />

      {/* First section — save the date collage */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pb-14 lg:pt-20">
        <header className="mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="m-0 text-[0.9rem] font-semibold uppercase tracking-[0.35em] text-ink/80 sm:text-[0.95rem]">
            We are getting married
          </p>
          <h1 className="mt-3 mb-0 font-script text-[clamp(3.1rem,11vw,5.75rem)] leading-none text-ink">
            {one} &amp; {two}
          </h1>
        </header>

        <div className="mx-auto grid max-w-md grid-cols-1 items-start gap-10 sm:max-w-lg md:max-w-none md:grid-cols-3 md:gap-5 lg:gap-8 xl:gap-10">
          <div className="order-2 flex flex-col md:order-1 md:pt-10 lg:pt-12">
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-t-full bg-white shadow-[0_12px_30px_rgba(58,47,40,0.08)] md:max-w-none">
              <img src={PHOTOS.left} alt="" className="aspect-[3/4] w-full object-cover" />
            </div>
            <p className="mt-5 mb-0 font-serif text-[1.05rem] italic leading-relaxed text-muted md:text-[1.12rem] lg:text-[1.2rem]">
              Dear {guestName}, with joyful hearts we invite you to share in our celebration of love.
            </p>
            <p className="mt-4 mb-0 flex items-start gap-2 text-[0.92rem] text-ink/75 lg:text-[1rem]">
              <MapPinIcon />
              <a
                href={CEREMONY_MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="text-ink/75 underline decoration-ink/20 underline-offset-2 transition hover:text-olive"
              >
                {invitation.churchVenue || 'Ceremony venue'}
              </a>
            </p>
          </div>

          <div className="order-1 flex flex-col items-center md:order-2">
            <div className="mx-auto w-full max-w-[300px] overflow-hidden bg-white shadow-[0_16px_36px_rgba(58,47,40,0.1)] md:max-w-none">
              <img
                src={PHOTOS.center}
                alt={invitation.coupleNames}
                className="aspect-[3/4.4] w-full object-cover"
              />
            </div>
            <p className="mt-5 mb-1 text-[0.88rem] font-semibold uppercase tracking-[0.28em] text-ink/70 sm:text-[0.92rem]">
              Save the date
            </p>
            <p className="m-0 font-serif text-[1.15rem] tracking-[0.12em] text-ink sm:text-[1.25rem]">
              {saveTheDate}
            </p>
          </div>

          <div className="relative order-3 flex flex-col pb-4 md:pt-10 lg:pt-12 lg:pb-28">
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-t-full bg-white shadow-[0_12px_30px_rgba(58,47,40,0.08)] md:max-w-none">
              <img src={PHOTOS.right} alt="" className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="relative mt-5">
              <span
                className="pointer-events-none absolute -left-1 -top-6 font-serif text-7xl leading-none text-ink/10"
                aria-hidden
              >
                “
              </span>
              <p className="relative m-0 font-serif text-[1.05rem] italic leading-relaxed text-muted md:text-[1.12rem] lg:text-[1.2rem]">
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
                className="absolute inset-0 size-full -rotate-12 p-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em]"
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

      <WeddingCountdown eventDate={invitation.eventDate} eventTime={invitation.eventTime} />

      {/* Ceremony + reception details */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-4 pt-10 sm:px-8 lg:px-10 lg:pt-12">
        <header className="mb-8 text-center sm:mb-10">
          <p className="m-0 text-[0.85rem] font-bold uppercase tracking-[0.28em] text-olive-soft sm:text-[0.9rem]">
            The details
          </p>
          <h2 className="mt-3 mb-0 font-serif text-[1.85rem] font-medium leading-tight text-ink sm:text-[2.35rem]">
            Ceremony and reception
          </h2>
        </header>

        <div className="mx-auto flex w-full max-w-[340px] flex-col items-stretch gap-4 sm:max-w-[380px] md:max-w-[420px] lg:max-w-none lg:flex-row lg:items-start lg:justify-center lg:gap-8 xl:gap-12">
          <div className="flex w-full flex-col gap-3 lg:max-w-[420px] lg:flex-1">
            <article className="relative flex flex-col items-center overflow-hidden rounded-t-[999px] bg-[#86a076] px-5 pb-7 pt-10 text-center text-white shadow-[0_14px_32px_rgba(58,47,40,0.14)] sm:px-7 sm:pb-8 sm:pt-11 md:px-8 md:pb-9 md:pt-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                }}
                aria-hidden
              />

              <div className="relative z-[1] flex w-full flex-col items-center">
                <p className="m-0 font-serif text-[0.9rem] font-semibold uppercase tracking-[0.22em] sm:text-[0.95rem]">
                  Ceremony info
                </p>

                {hostColumns ? (
                  <div className="mt-5 grid w-full grid-cols-2 gap-0">
                    {hostColumns.map((side, index) => (
                      <div
                        key={side.key}
                        className={
                          index === 0
                            ? 'border-r border-white/35 px-2.5 py-0.5 sm:px-3'
                            : 'px-2.5 py-0.5 sm:px-3'
                        }
                      >
                        {side.honorific ? (
                          <p className="m-0 font-serif text-[0.8rem] leading-tight text-white/90 sm:text-[0.88rem]">
                            {side.honorific}
                          </p>
                        ) : null}
                        {side.names.map((name) => (
                          <p
                            key={name}
                            className="m-0 font-serif text-[0.85rem] font-semibold leading-snug sm:text-[0.95rem]"
                          >
                            {name}
                          </p>
                        ))}
                        {side.place ? (
                          <p className="mt-0.5 mb-0 font-serif text-[0.9rem] leading-tight text-white/80 sm:text-[0.95rem]">
                            {side.place}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : invitation.contactName?.trim() ? (
                  <div className="mt-5 w-full px-1">
                    <p className="m-0 font-serif text-[0.92rem] leading-snug sm:text-[1.05rem]">
                      {invitation.contactName.trim()}
                    </p>
                  </div>
                ) : null}

                <a
                  href={contactTelHref}
                  className="mt-3 mb-0 inline-flex items-center justify-center text-[0.88rem] font-semibold tracking-[0.04em] text-white underline decoration-white/50 underline-offset-4 sm:text-[0.95rem]"
                >
                  {contactPhone}
                </a>

                <p className="mt-5 mb-0 max-w-[260px] text-[0.88rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-white/92 sm:max-w-[300px] sm:text-[0.92rem]">
                  We joyfully announce the wedding of our children
                </p>

                <p className="mt-5 mb-0 font-serif text-[1.35rem] font-medium leading-snug tracking-wide sm:text-[1.6rem] md:text-[1.75rem]">
                  {invitation.partnerOne}
                </p>
                <p className="mt-1.5 mb-0 text-[0.82rem] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-[0.88rem]">
                  The groom
                </p>

                <p className="my-2.5 mb-0 font-serif text-xl leading-none text-white/90 sm:text-2xl">&amp;</p>

                <p className="m-0 font-serif text-[1.35rem] font-medium leading-snug tracking-wide sm:text-[1.6rem] md:text-[1.75rem]">
                  {invitation.partnerTwo}
                </p>
                <p className="mt-1.5 mb-0 text-[0.82rem] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-[0.88rem]">
                  The bride
                </p>

                <p className="mt-5 mb-0 max-w-[280px] text-[0.9rem] font-semibold uppercase leading-relaxed tracking-[0.12em] sm:max-w-[320px] sm:text-[0.95rem]">
                  Wedding ceremony at {invitation.churchVenue || 'the ceremony venue'}
                </p>

                <p className="mt-4 mb-0 text-[0.82rem] uppercase tracking-[0.18em] text-white/75 sm:text-[0.88rem]">
                  At
                </p>
                <p className="mt-1 mb-0 font-serif text-[1.2rem] tracking-[0.1em] sm:text-[1.35rem]">
                  {ceremonyClock}
                </p>

                <p className="mt-4 mb-0 flex items-center justify-center gap-2.5 font-serif text-[0.85rem] tracking-[0.04em] sm:text-[0.95rem]">
                  <span>{(event.weekday || 'Day').toUpperCase()}</span>
                  <span className="h-3 w-px bg-white/55" aria-hidden />
                  <span>{event.day || '—'}</span>
                  <span className="h-3 w-px bg-white/55" aria-hidden />
                  <span>{monthShort}</span>
                </p>
                <p className="mt-2 mb-0 font-serif text-[1rem] tracking-[0.1em] sm:text-[1.1rem]">
                  {event.year}
                </p>

                {invitation.churchVenue?.trim() ? (
                  <a
                    href={CEREMONY_MAP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2.5 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/20"
                  >
                    <MapPinIcon className="size-3.5 text-white" />
                    Open ceremony map
                  </a>
                ) : null}
              </div>
            </article>

            {invitation.receptionVenue?.trim() ? (
              <div className="rounded-xl border border-ink/8 bg-white/85 px-4 py-5 text-center backdrop-blur-sm sm:px-5 sm:py-6">
                <p className="mb-1.5 mt-0 text-[0.88rem] font-bold uppercase tracking-[0.18em] text-olive-soft sm:text-[0.92rem]">
                  Reception · Ukumbini
                </p>
                <p className="m-0 font-serif text-[1.25rem] leading-snug text-ink sm:text-[1.4rem]">
                  {invitation.receptionVenue.trim()}
                </p>
                <p className="mt-1.5 mb-0 text-[0.88rem] text-muted sm:text-[0.95rem]">
                  {receptionTime || 'Following the ceremony'}
                </p>
                <a
                  href={RECEPTION_MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-olive/25 bg-olive/10 px-4 py-2.5 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-olive transition hover:bg-olive/15"
                >
                  <MapPinIcon className="size-3.5 text-olive" />
                  Open reception map
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <DressColours />
      <DayTimeline items={timelineItems} />
      <WellWishes storageKey={invitation.invitationCode} coupleLabel={`${one} & ${two}`} />
      <CoupleTrivia />

      {/* RSVP + admit ticket */}
      <section
        id="guest-ticket"
        className="relative z-10 w-full bg-[#3f4a32] px-5 py-14 sm:px-8 sm:py-16 lg:py-20"
      >
        <div className="mx-auto flex w-full max-w-[900px] flex-col overflow-hidden rounded-[18px] bg-[#fcfdfb] shadow-[0_28px_60px_rgba(0,0,0,0.28)] md:flex-row">
          <div className="flex w-full flex-col justify-center p-7 sm:p-10 md:w-[55%] md:p-12">
            <p className="m-0 text-[0.85rem] font-bold uppercase tracking-[0.28em] text-muted">RSVP</p>
            <h2 className="mt-3 mb-0 font-serif text-[2rem] font-medium leading-tight text-ink sm:text-[2.4rem]">
              Will you join us?
            </h2>
            <p className="mt-3 mb-0 max-w-sm text-[0.95rem] leading-relaxed text-muted sm:text-[1.05rem]">
              Your place is reserved. Let {one} &amp; {two} know with one graceful tap.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setRsvpChoice('accept');
                  setRsvpSent(false);
                }}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border px-5 py-3.5 transition ${
                  rsvpChoice === 'accept'
                    ? 'border-olive bg-sage/50 text-ink'
                    : 'border-ink/15 bg-transparent text-ink hover:bg-cream'
                }`}
              >
                <span className="text-[0.8rem] font-bold uppercase tracking-[0.14em]">
                  Joyfully accepts
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRsvpChoice('love');
                  setRsvpSent(false);
                }}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border px-5 py-3.5 transition ${
                  rsvpChoice === 'love'
                    ? 'border-olive bg-sage/50 text-ink'
                    : 'border-ink/15 bg-transparent text-ink hover:bg-cream'
                }`}
              >
                <span className="text-[0.8rem] font-bold uppercase tracking-[0.14em]">
                  Sends love
                </span>
              </button>
            </div>

            <button
              type="button"
              disabled={!rsvpChoice}
              onClick={() => {
                if (!rsvpChoice) return;
                localStorage.setItem(
                  `rsvp:${invitation.invitationCode}`,
                  JSON.stringify({ choice: rsvpChoice, at: Date.now() }),
                );
                setRsvpSent(true);
              }}
              className="mt-5 w-full cursor-pointer rounded-full bg-olive px-6 py-4 text-[0.88rem] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#4f5d3b] disabled:cursor-not-allowed disabled:opacity-45 md:w-4/5"
            >
              Send reply
            </button>
            {rsvpSent ? (
              <p className="mt-3 mb-0 font-serif text-[1.05rem] italic text-olive-soft">
                Reply noted — thank you.
              </p>
            ) : null}
          </div>

          <div className="relative hidden w-px bg-transparent md:block" aria-hidden>
            <div className="absolute inset-y-0 -left-px border-l-2 border-dotted border-ink/15" />
            <div className="absolute -top-4 -left-[14px] size-7 rounded-full bg-[#3f4a32]" />
            <div className="absolute -bottom-4 -left-[14px] size-7 rounded-full bg-[#3f4a32]" />
          </div>

          <div className="flex w-full flex-col border-t border-dashed border-ink/15 bg-white text-center md:w-[45%] md:border-t-0">
            <div className="bg-olive px-5 py-8 text-white sm:px-6 sm:py-9">
              <p className="mb-2 mt-0 text-[0.85rem] font-bold uppercase tracking-[0.22em] text-white/75">
                Admit
              </p>
              <h3 className="my-2 font-serif text-[1.7rem] font-medium sm:text-[1.9rem]">{guestName}</h3>
              <p className="m-0 text-[0.85rem] uppercase tracking-[0.08em] opacity-85">
                {invitation.partySize} {invitation.partySize === 1 ? 'seat' : 'seats'} reserved
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center px-5 py-8 sm:px-6 sm:py-9">
              <img
                src={qrUrl}
                alt={`QR code for ${invitation.invitationCode}`}
                className="size-40 rounded-xl border border-olive/20 bg-white p-2 sm:size-44"
              />
              <div className="mt-5 w-full rounded-xl bg-[#f1f3eb] px-4 py-3 text-left">
                <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-olive-soft">
                  Named guests only
                </p>
                <p className="mt-1 mb-0 text-[0.85rem] leading-relaxed text-muted">
                  Admits only the seats reserved above.
                </p>
              </div>
              <p className="mb-2 mt-6 text-[0.85rem] font-bold uppercase tracking-[0.22em] text-olive-soft">
                Entry code
              </p>
              <p className="m-0 break-all font-serif text-[1.45rem] tracking-[0.1em] sm:text-[1.6rem]">
                {invitation.invitationCode}
              </p>
              <p className="mt-2 mb-0 break-all text-[0.88rem] text-muted">{cardUrl}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-cream px-5 pb-14 pt-10 text-center text-olive sm:pt-12 lg:pb-16">
        <p className="m-0 text-[0.95rem] tracking-[0.28em]">
          {one.charAt(0)}
          <span className="mx-2.5 opacity-50">·</span>
          {two.charAt(0)}
        </p>
        <p className="mt-2.5 mb-0 text-[0.85rem] uppercase tracking-[0.18em] text-muted">
          {one} &amp; {two}
        </p>
      </footer>
    </div>
  );
}
