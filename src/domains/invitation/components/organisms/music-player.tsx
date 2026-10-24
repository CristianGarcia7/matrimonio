'use client';

import { cn } from '@/lib/utils';

import { useBackgroundMusic } from '../../hooks/use-background-music';
import { invitationMessages } from '../../messages';
import { BACKGROUND_MUSIC_SRC } from '../../wedding-details';

const EQUALIZER_BAR_CLASSES = [
  'music-player__bar--low',
  'music-player__bar--high',
  'music-player__bar--mid'
] as const;

export function MusicPlayer() {
  const {
    audioRef,
    isPlaying,
    shouldShowControl,
    handleToggleClick,
    handleAudioPlay,
    handleAudioPause,
    handleAudioError
  } = useBackgroundMusic();
  const { music } = invitationMessages;

  return (
    <>
      <audio
        ref={audioRef}
        src={BACKGROUND_MUSIC_SRC}
        preload="none"
        loop
        onPlay={handleAudioPlay}
        onPause={handleAudioPause}
        onError={handleAudioError}
      />
      {shouldShowControl && (
        <button
          type="button"
          className={cn('music-player', isPlaying && 'music-player--playing')}
          aria-label={isPlaying ? music.pauseLabel : music.playLabel}
          aria-pressed={isPlaying}
          title={music.nowPlaying(music.songTitle, music.artist)}
          onClick={handleToggleClick}
        >
          <span className="music-player__bars" aria-hidden="true">
            {EQUALIZER_BAR_CLASSES.map(barClass => (
              <span
                key={barClass}
                className={cn('music-player__bar', barClass)}
              />
            ))}
          </span>
        </button>
      )}
    </>
  );
}
