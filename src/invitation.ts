export type PublicInvitation = {
  invitationCode: string;
  coupleSlug: string;
  coupleNames: string;
  partnerOne: string;
  partnerTwo: string;
  eventDate: string;
  eventTime: string;
  receptionTime?: string | null;
  churchVenue: string;
  receptionVenue: string;
  contactName: string;
  contactPhone: string;
  guestId: string;
  guestTitle?: string;
  guestName: string;
  partySize: number;
  cardUrlPath: string;
  qrPayload: string;
};

export function guestDisplayName(invitation: PublicInvitation) {
  const title = invitation.guestTitle?.trim();
  return title ? `${title} ${invitation.guestName}` : invitation.guestName;
}

export function partnerFirstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

export function formatEventParts(eventDate: string, eventTime: string) {
  const date = new Date(`${eventDate.slice(0, 10)}T${(eventTime || '00:00:00').slice(0, 8)}`);
  if (Number.isNaN(date.getTime())) {
    return {
      weekday: '',
      day: '',
      month: '',
      year: '',
      time: eventTime?.slice(0, 5) || '',
      longDate: eventDate,
    };
  }

  return {
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
    day: String(date.getDate()).padStart(2, '0'),
    month: date.toLocaleDateString('en-US', { month: 'long' }),
    year: String(date.getFullYear()),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    longDate: date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}

export function formatClock(time?: string | null) {
  if (!time?.trim()) return '';
  const normalized = time.trim().length === 5 ? `${time.trim()}:00` : time.trim().slice(0, 8);
  const date = new Date(`1970-01-01T${normalized}`);
  if (Number.isNaN(date.getTime())) return time.slice(0, 5);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

/** Preview data when opened without /:slug/:code */
export function createDummyInvitation(): PublicInvitation {
  return {
    invitationCode: 'INV-DEMO00001',
    coupleSlug: 'stewart-neema',
    coupleNames: 'Stewart Adam Makuchilo & Neema Amani Moshi',
    partnerOne: 'Stewart Adam Makuchilo',
    partnerTwo: 'Neema Amani Moshi',
    eventDate: '2026-08-01',
    eventTime: '13:00:00',
    receptionTime: '17:00:00',
    churchVenue: "Kingdom Hall of Jehovah's Witnesses, Kunduchi",
    receptionVenue: 'Banora Hall',
    // Two columns when formatted as "left || right" (newlines or ; inside each side)
    contactName: 'Mr. & Mrs.\nMakuchilo Family || Mr. & Mrs.\nMoshi Family',
    contactPhone: '+255 620 360 999',
    guestId: '00000000-0000-0000-0000-000000000000',
    guestTitle: 'Ms.',
    guestName: 'Grace Mushi',
    partySize: 2,
    cardUrlPath: '/',
    qrPayload: 'INV-DEMO00001',
  };
}

export function invitationQrUrl(invitation: PublicInvitation) {
  const cardUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${invitation.cardUrlPath}`
      : invitation.cardUrlPath;
  return {
    cardUrl,
    qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(cardUrl)}&bgcolor=ffffff&color=5f6f47`,
  };
}
