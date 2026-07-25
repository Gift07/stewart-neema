import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import App from './App';
import { fetchPublicInvitation } from './api';
import { createDummyInvitation, type PublicInvitation } from './invitation';

export default function InvitationPage() {
  const { coupleSlug = '', invitationCode = '' } = useParams();
  const [invitation, setInvitation] = useState<PublicInvitation>(createDummyInvitation());
  const [loading, setLoading] = useState(Boolean(coupleSlug && invitationCode));

  useEffect(() => {
    if (!coupleSlug || !invitationCode) {
      setInvitation(createDummyInvitation());
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchPublicInvitation(coupleSlug, invitationCode);
        if (!cancelled) setInvitation(data);
      } catch {
        if (!cancelled) setInvitation(createDummyInvitation());
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [coupleSlug, invitationCode]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-sage font-serif text-[1.6rem] text-olive">
        <p>Opening your invitation…</p>
      </div>
    );
  }

  return <App invitation={invitation} />;
}
