import { useState } from 'react';
import { CoverView } from './CoverView';
import { InvitationInner } from './InvitationInner';
import type { PublicInvitation } from './invitation';

type Props = {
  invitation: PublicInvitation;
};

export default function App({ invitation }: Props) {
  const [opened, setOpened] = useState(false);

  if (!opened) {
    return <CoverView invitation={invitation} onOpen={() => setOpened(true)} />;
  }

  return <InvitationInner invitation={invitation} />;
}
