'use client';

import { cn } from '@/lib/utils';

import { useCountdown } from '../../hooks/use-countdown';
import { invitationMessages } from '../../messages';
import { CountdownUnit } from '../atoms/countdown-unit';

import { COUNTDOWN_STATUS } from '../../types/countdown-status.types';

export function CountdownTimer() {
  const { status, countdownUnits, isPending } = useCountdown();
  const { countdown } = invitationMessages;

  if (status === COUNTDOWN_STATUS.EVENT_DAY) {
    return (
      <div className="countdown-timer__message">
        <p className="countdown-timer__headline">{countdown.eventDay}</p>
        <p className="countdown-timer__detail">{countdown.eventDayDetail}</p>
      </div>
    );
  }

  if (status === COUNTDOWN_STATUS.FINISHED) {
    return (
      <div className="countdown-timer__message">
        <p className="countdown-timer__headline">{countdown.finished}</p>
        <p className="countdown-timer__detail">{countdown.finishedDetail}</p>
      </div>
    );
  }

  return (
    <div
      role="timer"
      aria-label={countdown.ariaLabel}
      aria-busy={isPending}
      className={cn('countdown-timer', isPending && 'countdown-timer--pending')}
    >
      {countdownUnits.map(unit => (
        <CountdownUnit key={unit.key} value={unit.value} label={unit.label} />
      ))}
    </div>
  );
}
