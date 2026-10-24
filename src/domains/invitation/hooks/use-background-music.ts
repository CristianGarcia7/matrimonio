'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';

import { INVITATION_OPENED_EVENT } from '../invitation-cover.constants';

const FADE_IN_DURATION_MS = 1500;
const TARGET_VOLUME = 0.7;
// Autoplay policy refusals leave the player usable (paused); any other
// failure (missing file, unsupported codec) hides it.
const AUTOPLAY_BLOCKED_ERROR = 'NotAllowedError';

function fadeInVolume(audio: HTMLAudioElement): () => void {
  let frameId = 0;
  const startTime = performance.now();
  audio.volume = 0;

  const step = (now: number) => {
    // rAF timestamps can precede `startTime`; clamp to the valid volume range.
    const elapsed = Math.max(now - startTime, 0);
    const progress = Math.min(elapsed / FADE_IN_DURATION_MS, 1);
    audio.volume = TARGET_VOLUME * progress;
    if (progress < 1) frameId = requestAnimationFrame(step);
  };

  frameId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frameId);
}

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const cancelFadeRef = useRef<(() => void) | null>(null);
  const shouldResumeRef = useRef(false);
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const startPlayback = (shouldFadeIn: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    cancelFadeRef.current?.();
    cancelFadeRef.current = shouldFadeIn ? fadeInVolume(audio) : null;

    audio.play().catch((error: unknown) => {
      cancelFadeRef.current?.();
      const isAutoplayBlocked =
        error instanceof DOMException && error.name === AUTOPLAY_BLOCKED_ERROR;
      if (!isAutoplayBlocked) setHasFailed(true);
    });
  };

  const handleInvitationOpened = useEffectEvent(() => {
    setIsInvitationOpened(true);
    startPlayback(true);
  });

  const handleVisibilityChange = useEffectEvent(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (document.hidden) {
      shouldResumeRef.current = !audio.paused;
      audio.pause();
      return;
    }

    if (shouldResumeRef.current) {
      shouldResumeRef.current = false;
      startPlayback(false);
    }
  });

  useEffect(() => {
    window.addEventListener(INVITATION_OPENED_EVENT, handleInvitationOpened);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener(
        INVITATION_OPENED_EVENT,
        handleInvitationOpened
      );
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelFadeRef.current?.();
    };
  }, []);

  const handleToggleClick = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      startPlayback(true);
      return;
    }
    audio.pause();
  };

  return {
    audioRef,
    isPlaying,
    shouldShowControl: isInvitationOpened && !hasFailed,
    handleToggleClick,
    handleAudioPlay: () => setIsPlaying(true),
    handleAudioPause: () => setIsPlaying(false),
    handleAudioError: () => setHasFailed(true)
  };
}
