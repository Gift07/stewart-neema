import type { PublicInvitation } from './invitation';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL as string | undefined
)?.replace(/\/$/, '') || 'https://wedding.jackumeme.co.tz/api';

export async function fetchPublicInvitation(
  coupleSlug: string,
  invitationCode: string,
): Promise<PublicInvitation> {
  const response = await fetch(
    `${API_BASE_URL}/public/invitations/${encodeURIComponent(coupleSlug)}/${encodeURIComponent(invitationCode)}`,
  );

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message || 'Invitation not found.');
  }

  return (await response.json()) as PublicInvitation;
}
