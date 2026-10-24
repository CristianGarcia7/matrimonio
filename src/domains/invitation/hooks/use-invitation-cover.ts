'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';

import {
  INVITATION_CONTENT_ID,
  INVITATION_MAIN_ID,
  INVITATION_OPENED_EVENT
} from '../invitation-cover.constants';
import { INVITATION_COVER_STATE } from '../types/invitation-cover-state.types';
import type { InvitationCoverState } from '../types/invitation-cover-state.types';

// Must match the envelope + dissolve timeline in envelope.css and
// invitation-cover.css (cover visibility flips at 2500ms).
const OPENING_DURATION_MS = 2550;
// Reduced motion skips the choreography and only fades the cover.
const REDUCED_OPENING_DURATION_MS = 450;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

interface UseInvitationCoverOptions {
  onOpen?: () => void;
}

export function useInvitationCover({ onOpen }: UseInvitationCoverOptions = {}) {
  const [coverState, setCoverState] = useState<InvitationCoverState>(
    INVITATION_COVER_STATE.CLOSED
  );
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const openingDurationRef = useRef(OPENING_DURATION_MS);
  const isClosed = coverState === INVITATION_COVER_STATE.CLOSED;
  const isOpened = coverState === INVITATION_COVER_STATE.OPENED;

  const openInvitation = () => {
    if (coverState !== INVITATION_COVER_STATE.CLOSED) return;

    // Synchronous dispatch keeps listeners inside the user gesture.
    window.dispatchEvent(new CustomEvent(INVITATION_OPENED_EVENT));
    onOpen?.();

    openingDurationRef.current = prefersReducedMotion()
      ? REDUCED_OPENING_DURATION_MS
      : OPENING_DURATION_MS;
    setCoverState(INVITATION_COVER_STATE.OPENING);
  };

  const handleEscapeKey = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'Escape') openInvitation();
  });

  useEffect(() => {
    openButtonRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!isClosed) return;
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isClosed]);

  // The page behind the cover stays out of the tab order and the
  // accessibility tree until the envelope is opened.
  useEffect(() => {
    const content = document.getElementById(INVITATION_CONTENT_ID);
    if (!content) return;
    content.inert = !isOpened;
    return () => {
      content.inert = false;
    };
  }, [isOpened]);

  useEffect(() => {
    if (coverState !== INVITATION_COVER_STATE.OPENING) return;
    const timeoutId = window.setTimeout(
      () => setCoverState(INVITATION_COVER_STATE.OPENED),
      openingDurationRef.current
    );
    return () => window.clearTimeout(timeoutId);
  }, [coverState]);

  useEffect(() => {
    if (!isOpened) return;
    document.getElementById(INVITATION_MAIN_ID)?.focus({ preventScroll: true });
  }, [isOpened]);

  return {
    coverState,
    isOpened,
    isEnvelopeOpen: !isClosed,
    openButtonRef,
    handleOpenClick: openInvitation
  };
}
