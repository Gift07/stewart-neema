import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import InvitationPage from './InvitationPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvitationPage />} />
        <Route path="/:coupleSlug/:invitationCode" element={<InvitationPage />} />
        <Route path="*" element={<InvitationPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
